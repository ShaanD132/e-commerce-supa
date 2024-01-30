"use client"
import {Button, Box, Image, Badge, ButtonGroup, defineStyleConfig, defineStyle, Center, useToast, Text, Flex} from "@chakra-ui/react"
import { InfoOutlineIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons"
import { ProductType, supabase } from "@/api/types"
import { useCallback, useEffect, useState } from "react"

interface ProductProps {
  Product: ProductType
}

function Product(props: ProductProps) {
  const types = ["Podcast", "Book", "Tech"]
  const colors = ["badgeDeepGreen", "badgePurple", "badgeBlue"]
  const toast = useToast({
    position: 'top',
  })
  const qty = (props.Product.quantity != null) ? props.Product.quantity : 0
  const [imageUrl, setImageUrl] = useState("")

  function getTypeColor(type: string | null) {
    for (let i = 0; i < 3; i++) {
      if (type == types[i]) {
        return colors[i]
      }
    }
    return "gray"
  }

  const getImageUrl = useCallback(async () => {
    const {data} = await supabase.storage.from("prod_images").getPublicUrl("prod_" + props.Product.id + "." + props.Product.image)
    setImageUrl(data.publicUrl)

  }, [])

  useEffect(() => {
    getImageUrl()
  }, [getImageUrl])

  return(
    <Box boxShadow="lg" maxW={{base:"15em", lg:"sm"}} borderRadius="md">
      <Box pb={3}>
        <Image src={imageUrl} borderRadius="md" alt={props.Product.name}/>
      </Box>

      <Box pt={2} pb={4} px={5}>
        <Badge borderRadius="md" colorScheme={getTypeColor(props.Product.type)}>
          {props.Product.type}
        </Badge>
        <Box pt={3} fontWeight="bold" fontSize="lg">
          {props.Product.name}
        </Box>

        <Box fontSize="md">
          <Flex>
            <Text>
            ${props.Product.price} USD
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
          onClick={async () => {
            const { data: { session } } = await supabase.auth.getSession();
            let addToCartPromise = new Promise((resolve, reject) => {})
            if (session?.user) {
              addToCartPromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve(200), 1000)
              })
            }
            else {
              addToCartPromise = new Promise((resolve, reject) => {
                setTimeout(() => reject(200), 1000)
              })
            }

            toast.promise(addToCartPromise, {
              success: { title: 'Added to Cart', colorScheme: 'green'},
              error: { title: 'Please Log In', colorScheme: 'orange'},
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

export default Product