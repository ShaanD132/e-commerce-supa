"use client"
import {Button, Box, Image, Badge, ButtonGroup, defineStyleConfig, defineStyle, Center, useToast, Text, Flex, Container, Card, CardBody} from "@chakra-ui/react"
import { InfoOutlineIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons"
import { ProductType } from "@/api/types"
import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/api/database.types"



function ProductPage() {
  const types = ["Podcast", "Book", "Tech"]
  const colors = ["green", "purple", "blue"]
  const supabase = createClientComponentClient<Database>({isSingleton: true})
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
    <Container maxW="container.xl">
      <Flex px={30}>
        {/*Image + Card*/}
        <Box w="100%">
          <Center>
            <Card maxW="xl" backgroundColor="#171A21">
              <Image src={imageUrl} />
              <CardBody>
              <Center>
              <Button leftIcon={<PlusSquareIcon />} colorScheme="myPink" color="white" variant="solid" fontSize={{base:"11px", lg:"14px"}} px={2}
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
          </Center>
        </Box>

        <Box w="100%">
          <Center>
            <Box>
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
            </Box>
          </Center>
        </Box>

      </Flex>
    </Container>
  )
}

export default ProductPage