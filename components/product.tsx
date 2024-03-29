"use client"
import {Button, Box, Image, Badge, ButtonGroup, defineStyleConfig, defineStyle, Center, useToast, Text, Flex, Card} from "@chakra-ui/react"
import { InfoOutlineIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons"
import { ProductType} from "@/api/types"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/api/database.types"

interface ProductProps {
  Product: ProductType,
}

function Product(props: ProductProps) {
  const types = ["Vegetable", "Berries", "Fruit"]
  const colors = ["badgeDeepGreen", "badgePurple", "badgeBlue"]
  const router = useRouter()
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const toast = useToast({
    position: 'top',
    isClosable: true,
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
    <Card variant="outline" overflow="hidden" maxW={{base:"15em", lg:"sm"}} borderRadius="md" backgroundColor="#F9F4F5" color="myBlack.900" boxShadow="md">
      <Box pb={3} >
        <Image src={imageUrl} alt={props.Product.name}/>
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
              Price: ${props.Product.price} HKD
            </Text>

            {(qty < 10) ?
            (
              <Text color="red" ml={1} fontWeight="bold">
               | only {qty} left
              </Text>
            ) :
            (
              <Text fontSize="sm" ml={1}mt={0.5}>
                per kg
              </Text>
            )}
          </Flex>
        </Box>

        <Center>
        <ButtonGroup spacing={{base: 3, lg: 6}} pt={3} zIndex={0}>
          <Button leftIcon={<PlusSquareIcon />} colorScheme="myGreen" color="white" variant="solid" fontSize={{base:"11px", lg:"14px"}} px={2}
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
          }}
          fontWeight="bold"
          >Add to Cart</Button>
          <Button leftIcon={<InfoOutlineIcon />}  colorScheme="myPink" color="white" fontSize={{base:"11px", lg:"14px"}} px={2} fontWeight="bold"
          onClick = {() => {
            router.push("/products/" + props.Product.id)
          }}
          >View Details</Button>
        </ButtonGroup>
        </Center>
      </Box>
    </Card>
  )
}

export default Product