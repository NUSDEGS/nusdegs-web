import HomePage from '@/view/HomePage'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

export default function Index() {
  return (
  <ChakraProvider>
    <Head>
      <title>NUSDegs</title>
    </Head>

    <main>
      <HomePage/>
    </main>
  </ChakraProvider>
  )
}
