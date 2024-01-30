'use client'
import { Button, Center, Container, GridItem, SimpleGrid} from '@chakra-ui/react'
import Product from '@/components/product'
import { useCallback, useEffect, useState } from 'react'
import { ProductType, supabase } from '@/api/types'

export default  function Products() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(true)

  const fetcher = useCallback(async () => {
    const {data, error} = await supabase.from('products').select("*").order('id')
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
    <Container maxW="100%" overflow="hidden">
      <Center>
      <SimpleGrid columns={{sm:1, md:2, lg:3}} gap={10}>
      {products.map((prod) =>
      <GridItem pt={5} key = {prod.id}>
        <Product
        Product = {prod}
        />
      </GridItem>
      )}
      </SimpleGrid>
      </Center>

      <Center>
      <Button mt={2} isLoading={isLoading} colorScheme='myPink' variant='ghost' fontSize={{base: "20px", lg: "30px"}}/>
      </Center>
    </Container>
  )
}