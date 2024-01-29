import { Database } from "@/api/database.types";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Center, Link, Container, Flex, Spacer, Image, Button, useToast,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function Navbar() {
  const supabase = createClientComponentClient<Database>()
  const [logText, setLogText] = useState("")
  const toast = useToast({position: "top"})
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setLogText("Log Out")
      }
      else {
        setLogText("Log In")
      }
    }

    getData()
  }, [])

  const buttonF = async () => {
    console.log('hi')
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      await supabase.auth.signOut()

      const signOutPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 700)
      })
      toast.promise(signOutPromise, {
        success: { title: 'Signed Out', colorScheme: 'green', duration: 500},
        error: { title: 'Failed to Sign Out', colorScheme: 'red'},
        loading: { title: 'Signing Out', colorScheme: 'cyan'},
        })
    }
    setTimeout(() => router.push("/about"), 500)
  }


  return(
    <Container maxW="container.xl" overflow="hidden">
    <Flex pt={5} fontSize={{base: "15px", md: "18px", lg:"22px"}} position="fixed" backdropFilter='blur(10px)' borderBottom={3} maxW="container.xl" zIndex={20} width="100%" direction="row">
      <Flex fontFamily="Geist" >
        <Center>
        <Link href="/" mr={8} pb={5}>Home</Link>
        </Center>

        <Center>
        <Link href="/products" mr={8} pb={5}>Products</Link>
        </Center>

        <Center>
        <Link href="/about" mr={8} pb={5}>About</Link>
        </Center>

        <Center>
        <Link href="/contact" mr={8} pb={5}>Contact</Link>
        </Center>
      </Flex>

      <Spacer/>

      <Flex>
      <Center>
        <Link href="#" mr={4} pb={5}>
          <Image src="images/cart.png" alt="cart" maxW={{base: "17px", md: "20px", lg:"28px"}}/>
        </Link>
      </Center>
      <Center>
      <Button mr={5} mb={5} colorScheme="myPink" color="white" textAlign="center" onClick={buttonF}>
        {logText}
      </Button>
      </Center>
      </Flex>
    </Flex>
  </Container>

  )
}