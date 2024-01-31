'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/api/database.types'
import { Box, Button, ButtonGroup, Container, Flex, Heading, Input, useToast } from '@chakra-ui/react'

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient<Database>({isSingleton: true})
  const toast = useToast({
    position: 'top',
  })

  const handleSignUp = async () => {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    const { error: dbError } = await supabase
    .from('users')
    .insert({ name: name, email: email })

    let signUpPromise = new Promise((resolve, reject) => {})
    if (!error) {
      signUpPromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(200), 700)
      })
    }
    else {
      signUpPromise = new Promise((resolve, reject) => {
          setTimeout(() => reject(404), 700)
      })
    }
    toast.promise(signUpPromise, {
      success: { title: 'Confirm Email', description: "Check your email", colorScheme: 'orange'},
      error: { title: 'Failed to Sign Up', description: "Try again later", colorScheme: 'red'},
      loading: { title: 'Signing Up', colorScheme: 'blue'},
    })

    console.log(error)
    console.log(dbError)
    if (!error && !dbError) {
      setTimeout(() => router.push("/"), 1000)
    }
  }


  return (
    <Container mt={10}>
      <Heading as="h1" fontFamily="Helvetica">Sign Up</Heading>

      <Input name="name"
      mt={4}
      onChange={(e) => setName(e.target.value)}
      value={name}
      variant="flushed"
      placeholder="Name"
      _placeholder={{ color: 'gray', fontSize: '17px' }}
      borderColor="myBlack"/>

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
      <Box mt={7}>
        <Button onClick={handleSignUp} colorScheme="badgeDeepGreen" color="white">Sign up</Button>
      </Box>
    </Container>
  )
}

