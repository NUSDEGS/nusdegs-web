import { Button } from '@chakra-ui/button'
import { Center, Heading, VStack } from '@chakra-ui/layout'

export default function HomePage() {
  return (
    <Center height='100vh' width='100vw'>
      <VStack width='80%' align='start' spacing='2rem'>
        <Heading size='4xl'>NUSDegs</Heading>
        <Button>Start</Button>
      </VStack>
    </Center>
  )
}
