'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/api/database.types'
import { Box, Button, ButtonGroup, Container, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const toast = useToast({
    position: 'top',
  })

  const handleLogIn = async () => {
    let success = false

    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    let signInPromise = new Promise((resolve, reject) => {})
    if (!error) {
      success = true
    }

    if (success === false) {
      signInPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(200), 700)
      })
    }
    else {
      signInPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 700)
      })
    }
    toast.promise(signInPromise, {
      success: { title: 'Logged In', colorScheme: 'green', duration: 500},
      error: { title: 'Failed to Log In', colorScheme: 'red'},
      loading: { title: 'Logging In', colorScheme: 'cyan'},
    })
    console.log(data.user)
    console.log(error)
    setTimeout(() => router.push("/"), 1000)
  }

  return (
    <Container mt={10}>
      <Heading as="h1" fontFamily="Helvetica">Log In</Heading>

      <Input name="email"
      mt={4}
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      variant="flushed"
      placeholder="Email"
      _placeholder={{ color: 'gray', fontSize: '17px' }}
      borderColor="myBlack"/>

      <Input
        type="password"
        name="password"
        variant = "flushed"
        placeholder="Password"
        _placeholder={{ color: 'gray', fontSize: '17px' }}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        borderColor="myBlack"
        mt={5}
      />
      <Flex mt={7}>
        <Button onClick={handleLogIn} colorScheme="blue" mx={3} color="black">Log in</Button>
        <Button leftIcon = {<ChevronRightIcon/>} onClick={() => {router.push("/sign-up")}} mx={3} variant = "link" color="myBlack">Sign Up</Button>
      </Flex>
    </Container>
  )
}

