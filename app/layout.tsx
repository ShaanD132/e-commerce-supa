// app/layout.tsx
import { Container } from '@chakra-ui/react'
import { Providers } from './util/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Container pt={20} maxW="container.xl">
          {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}