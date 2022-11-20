import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LandingLayout from '../components/LandingLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    </ChakraProvider>
  )
}
