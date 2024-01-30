'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/api/database.types'
import { Box, Button, ButtonGroup, Container, Flex, Heading, Input, useToast } from '@chakra-ui/react'

export default function Login() {
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
    if (data.session === null) {
      const signUpPromise = new Promise((resolve, reject) => {
        if (!error) {
          setTimeout(() => resolve(200), 700)
        }
        else {
          setTimeout(() => reject(200), 700)
        }
      })

      toast.promise(signUpPromise, {
        success: { title: 'Confirm Email', description: "Check your email", colorScheme: 'orange'},
        error: { title: 'Failed to Sign Up', description: "Try again later", colorScheme: 'red'},
        loading: { title: 'Signing Up', colorScheme: 'blue'},
      })
    }

    setTimeout(() => router.push("/"), 1000)
  }

  const handleLogIn = async () => {
    let success = false

    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      success = true
    }

    if (success === false) {
      const signInPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(200), 700)
      })

      toast.promise(signInPromise, {
        success: { title: 'Logged In', colorScheme: 'green'},
        error: { title: 'Failed to Log In', colorScheme: 'red'},
        loading: { title: 'Logging In', colorScheme: 'cyan'},
      })
    }
    else {
      const signInPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 700)
      })

      toast.promise(signInPromise, {
        success: { title: 'Logged In', colorScheme: 'green', duration: 500},
        error: { title: 'Failed to Log In', colorScheme: 'red'},
        loading: { title: 'Logging In', colorScheme: 'cyan'},
      })

    }
    setTimeout(() => router.push("/"), 1000)
  }

  return (
    <Container mt={5}>
      <Heading as="h1" fontFamily="Helvetica">Log In / Sign Up</Heading>
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
        <Flex>
          <Button onClick={handleLogIn} colorScheme="blue" mx={3} color="black">Log in</Button>
          <Button onClick={handleSignUp} colorScheme="badgeDeepGreen" color="white" mx={3}>Sign up</Button>
        </Flex>
      </Box>
    </Container>
  )
}

