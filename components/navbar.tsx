import { Database } from "@/api/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Center, Link, Container, Flex, Spacer, Image, Button, useToast, Avatar,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const [logText, setLogText] = useState("")
  const [userName, setUserName] = useState("")
  const toast = useToast({position: "top"})
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      const {data: userData} = await supabase.from("users").select("*").eq("email", session?.user.email as string)
      if (session?.user) {
        setLogText("Log Out")
      }
      else {
        setLogText("Log In")
      }
      if (userData != null && userData[0] != null) {
        setUserName(userData[0].name)
      }
      else {
        setUserName("")
      }
    }

    getData()
  }, [])

  const buttonF = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      await supabase.auth.signOut()

      const LogOutPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 700)
      })
      toast.promise(LogOutPromise, {
        success: { title: 'Logged Out', colorScheme: 'green', duration: 500},
        error: { title: 'Failed to Log Out', colorScheme: 'red'},
        loading: { title: 'Log Out', colorScheme: 'cyan'},
        })
      setTimeout(() => router.push("/"), 500)
    }
    else {
      setTimeout(() => router.push("/login"), 500)
    }
  }


  return(
    <Container maxW="container.xl" overflow="hidden">
    <Flex pt={5} fontSize={{base: "15px", md: "18px", lg:"22px"}} position="fixed" backdropFilter='blur(10px)' borderBottom={3} maxW="container.xl" zIndex={20} width="100%" direction="row">
      <Flex fontFamily="Overused-Grotesk" >
        <Center>
        <Link href="/" mr={{base: 3, lg:8}} pb={5}>Home</Link>
        </Center>

        <Center>
        <Link href="/products" mr={{base: 3, lg:8}} pb={5}>Products</Link>
        </Center>

        <Center>
        <Link href="/about" mr={{base: 3, lg:8}} pb={5}>About</Link>
        </Center>

        <Center>
        <Link href="/contact" mr={{base: 3, lg:8}} pb={5}>Contact</Link>
        </Center>
      </Flex>

      <Spacer/>

      <Flex>
      <Center>
        <Link href="#" mr={{base: 1, lg:4}} pb={5}>
          <Center>
          <Button colorScheme="badgeBlue" color="black" textAlign="center" fontSize={{base:"11px", lg:"14px"}} px={2} variant="ghost">
              <Image src= {"/images/cart.png"} alt="cart" maxW={{base: "17px", md: "20px", lg:"28px"}}/>
          </Button>
          </Center>
        </Link>
      </Center>

      <Center>
      <Link mr={{base: 8, lg: 10}} mb={5} color="black" textAlign="center" px={2} variant="link" href="/profile">
        <Center>
          <Avatar name = {userName} src="" bg={(userName !== "") ? ("#4D9DE0") : ("gray")} color="white" size={{base: "xs", lg:"sm"}}/>
        </Center>
      </Link>
      </Center>

      </Flex>
    </Flex>
  </Container>

  )
}