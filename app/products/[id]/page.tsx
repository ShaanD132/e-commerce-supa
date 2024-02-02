"use client"
import {Button, Box, Image, Badge, Center, useToast, Text, Flex, Container, Card, CardBody, SimpleGrid} from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { ProductType } from "@/api/types"
import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/api/database.types"

function ProductPage() {
  const types = ["Podcast", "Book", "Tech"]
  const colors = ["green", "badgePurple", "badgeBlue"]
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const toast = useToast({
    position: 'top',
    isClosable: true,
  })
  const prodId = usePathname().replace("/products/", "")
  const [prod, setProd] = useState<ProductType>({id: 0, image: "png", name: "Fetching", price: 100, quantity: 0, type: "Loading", description: ""})
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
  /*
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
  */

  return(
    <Container maxW="container.xl" mt={10}>
      <SimpleGrid columns={{base: 1, lg: 2}} px={30}>
        {/*Image + Card*/}
          <Center>
            <Box as="span">
              <Card maxW={{base: "lg", lg: "xl"}} backgroundColor="#1b202b" color="#FFFAFA" borderColor="1b202b">
                <Image src={imageUrl} />
                <CardBody>
                <Center>
                <Button leftIcon={<PlusSquareIcon />} colorScheme="badgePurple" color="white" variant="solid" fontSize={{base:"11px", lg:"14px"}} px={2}
                mt = {3}
                onClick={async () => {
                  const { data: {session}} = await supabase.auth.getSession();
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
                }}>Add to Cart</Button>
                </Center>
                </CardBody>
              </Card>
            </Box>
          </Center>

          <Center>
            <Box as="span" py={{base: 3, lg: 0}}>
              <Badge borderRadius="md" colorScheme={getTypeColor(prod.type)} fontSize={{base: 12, lg: 16}}>
                {prod.type}
              </Badge>
              <Box pt={3} fontWeight="bold" fontSize={{base: "xl", lg:"3xl"}} w={{base: 300, md: 300, xl: 500}}>
                {prod.name}
              </Box>

              <Box fontSize={{base: "xl", lg:"3xl"}} mt={2}>
                <Text>
                Price: ${prod.price} USD
                </Text>

                {(qty < 5) ?
                (
                  <Text color="red" ml={1} mt={2} fontWeight="bold">
                  Low Stock: {qty} left!
                  </Text>
                ) :
                ("")}
              </Box>
              {/*Needs responsive fix*/}
              <Box fontSize={{base: "sm", lg: "lg"}} mt={2} w={{base: 300, md: 300, xl: 500}}>
                Description: {prod.description}
              </Box>
            </Box>
          </Center>

      </SimpleGrid>
    </Container>
  )
}

export default ProductPage