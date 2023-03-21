import { Center, Heading, VStack, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SectionProps {
  title: string
  description?: string
  children?: ReactNode
}

export default function Section(props: SectionProps) {
  return (
    <Center height='100vh' width='100vw'>
    <VStack width='80%' align='start' spacing='2rem'>
      <Heading size='4xl'>{props.title}</Heading>

      {
        props.description &&
          <Text>{props.description}</Text>
      }


      {props.children}
    </VStack>
  </Center>
  )
}
