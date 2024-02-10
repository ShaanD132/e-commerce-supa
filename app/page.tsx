"use client"
import { ProductType, supabase } from '@/api/types'
import Product from '@/components/product'
import { Box, Button, Card, CardBody, Center, Container, GridItem, Heading, Image, SimpleGrid} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(true)

  const fetcher = useCallback(async () => {
    const {data, error} = await supabase.from('products').select("*").order('qty_sold')
    if (error) {
      console.log("failed", error)
    } else {
      setProducts(data)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetcher()
  }, [fetcher])


  return (
    <Container maxW="container.xl" overflow="hidden">
      <Center>
        <Card maxW="container.xl" backgroundColor="myGreen.900">
          <CardBody p={1}>
          <Center>
            <Image borderRadius="sm" src="/images/banner-1.png" w="100%"/>
          </Center>
          </CardBody>
        </Card>
      </Center>

      <Box mt={20}>
        <Heading as="h1" fontFamily="Helvetica">Best-Selling Products</Heading>
        <Container maxW="100%" overflow="hidden" mt={10}>
        <Center>
          <SimpleGrid columns={{sm:1, md:2, lg:3}} gap={10}>
          {products.slice(0,3).map((prod) =>
            <GridItem key = {prod.id}>
              <Product
              Product = {prod}
              />
            </GridItem>
          )}
          </SimpleGrid>
        </Center>

        <Center>
          <Button my={{base: 5, md: 10}} isLoading={isLoading} colorScheme='teal' variant='ghost' fontSize={{base: "40px", lg: "60px"}}/>
        </Center>

      </Container>
      </Box>
    </Container>
  )
}