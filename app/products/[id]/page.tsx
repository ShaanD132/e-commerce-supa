"use client"
import {Button, Box, Image, Badge, ButtonGroup, defineStyleConfig, defineStyle, Center, useToast, Text, Flex} from "@chakra-ui/react"
import { InfoOutlineIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons"
import { ProductType, supabase } from "@/api/types"
import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"



function ProductPage() {
  const types = ["Podcast", "Book", "Tech"]
  const colors = ["badgeDeepGreen", "badgePurple", "badgeBlue"]
  const toast = useToast({
    position: 'top',
  })
  const prodId = usePathname().replace("/products/", "")
  const [prod, setProd] = useState<ProductType>({id: 0, image: "png", name: "Fetching", price: 100, quantity: 0, type: "Loading"})
  const [imageUrl, setImageUrl] = useState("")

  const getProduct = useCallback(async () => {
    const {data, error} = await supabase.from("products").select("*").eq("id", prodId)
    if (data != null) {
      const {data: imageData} = await supabase.storage.from("prod_images").getPublicUrl("prod_" + data[0].id + "." + data[0].image)
      setImageUrl(imageData.publicUrl)
    }
    if (error) {
      console.log("failed", error)
    } else {
      setProd(data[0])
    }
  }, [])

  const qty = (prod.quantity != null) ? prod.quantity : 0


  useEffect(() => {
    getProduct()
  }, [getProduct])


  function getTypeColor(type: string | null) {
    for (let i = 0; i < 3; i++) {
      if (type == types[i]) {
        return colors[i]
      }
    }
    return "gray"
  }

  return(
    <Box boxShadow="lg" maxW={{base:"15em", lg:"sm"}} borderRadius="md">
      <Box pb={3}>
        <Image src={imageUrl} borderRadius="md" alt={prod.name}/>
      </Box>

      <Box pt={2} pb={4} px={5}>
        <Badge borderRadius="md" colorScheme={getTypeColor(prod.type)}>
          {prod.type}
        </Badge>
        <Box pt={3} fontWeight="bold" fontSize="lg">
          {prod.name}
        </Box>

        <Box fontSize="md">
          <Flex>
            <Text>
            ${prod.price} USD
            </Text>
            {(qty < 5) ?
            (
              <Text color="red" ml={1} fontWeight="bold">
               | only {qty} left
              </Text>
            ) :
            ("")}
          </Flex>
        </Box>

        <Center>
        <ButtonGroup spacing={{base: 3, lg: 6}} pt={3} zIndex={0}>
          <Button leftIcon={<PlusSquareIcon />} colorScheme="myBlack" color="white" variant="solid" fontSize={{base:"11px", lg:"14px"}} px={2}
          onClick={() => {
            const addToCartPromise = new Promise((resolve, reject) => {
              setTimeout(() => resolve(200), 1000)
            })

            toast.promise(addToCartPromise, {
              success: { title: 'Added to Cart', colorScheme: 'green'},
              error: { title: 'Promise rejected', colorScheme: 'red'},
              loading: { title: 'Adding to Cart', colorScheme: 'cyan'},
            })
          }}
          >Add to Cart</Button>
          <Button leftIcon={<InfoOutlineIcon />}  colorScheme="myPink" color="white" fontSize={{base:"11px", lg:"14px"}} px={2}>View Details</Button>
        </ButtonGroup>
        </Center>
      </Box>
    </Box>
  )
}

export default ProductPage