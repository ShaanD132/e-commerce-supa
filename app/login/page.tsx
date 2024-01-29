'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/api/database.types'
import { Box, Button, ButtonGroup, Container, Flex, Input, useToast } from '@chakra-ui/react'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
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
    router.refresh()
  }

  const handleSignIn = async () => {
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
        success: { title: 'Signed In', colorScheme: 'green'},
        error: { title: 'Failed to Sign In', colorScheme: 'red'},
        loading: { title: 'Signing In', colorScheme: 'cyan'},
      })
    }
    else {
      const signInPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 700)
      })

      toast.promise(signInPromise, {
        success: { title: 'Signed In', colorScheme: 'green', duration: 500},
        error: { title: 'Failed to Sign In', colorScheme: 'red'},
        loading: { title: 'Signing In', colorScheme: 'cyan'},
      })

    }
    setTimeout(() => router.refresh(), 1000)
  }

  return (
    <Container mt={20}>
      <Input name="email"
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
          <Button onClick={handleSignIn} colorScheme="blue" mx={3}>Sign in</Button>
          <Button onClick={handleSignUp} colorScheme="badgeDeepGreen" color="white" mx={3}>Sign up</Button>
        </Flex>
      </Box>
    </Container>
  )
}

