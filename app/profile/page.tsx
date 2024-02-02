"use client"
import {Button, Box, Center, useToast, Container, Card, CardBody, Divider, Avatar} from "@chakra-ui/react"
import {  UserType } from "@/api/types"
import { useCallback, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/api/database.types"
import { useRouter } from "next/navigation"

function ProfilePage() {
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const toast = useToast({
    position: 'top',
    isClosable: true,
  })
  const [imageUrl, setImageUrl] = useState("")
  const router = useRouter()
  const [user, setUser] = useState<UserType>({id: 0, name: "", email: ""})

  const getUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    let userEmail = ""
    if (session?.user.email) {
      const {data: userData, error} = await supabase.from("users").select("*").eq("email", session?.user.email)
      if (userData) {
        setUser(userData[0])
      }
    }
  }, [])

  const buttonF = async () => {
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

  useEffect(() => {
    getUser()
  }, [getUser])

  return(
    <Container maxW="container.xl" mt={10}>
      <Center>
        <Card w={{base: "md", lg: "lg"}} backgroundColor="#191716">
          <Center my={24}>
          <Avatar size="2xl" name={user.name} />
          </Center>
          <Divider/>

          <CardBody color="white" fontSize={20} mt={6}>
          <Center>
            <Box as="span">
              <b>Name:</b> {user.name}
            </Box>
          </Center>

          <Center mt={2}>
            <Box as="span">
              <b>Email:</b> {user.email}
            </Box>
          </Center>

          <Center mt={2}>
            <Box as="span">
              <Button my={3} colorScheme="yellow" color="white" textAlign="center" fontWeight="bold" onClick={buttonF} px={4} variant="ghost">
              Log out
              </Button>
            </Box>
          </Center>
          </CardBody>
        </Card>
      </Center>
    </Container>
  )
}

export default ProfilePage