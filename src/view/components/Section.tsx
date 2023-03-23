import { Center, Heading, VStack, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SectionProps {
  title: string
  description?: string
  alignContent?: string
  hidden?: boolean
  children?: ReactNode
}

export default function Section(props: SectionProps) {
  return (
    <Center height='80vh' width='100vw' hidden={props.hidden}>
      <VStack width='100%' spacing='2rem'>
        <VStack width='80%' align='start' spacing='2rem'>
          <Heading size='4xl'>{props.title}</Heading>

          {
            props.description &&
              <Text>{props.description}</Text>
          }
        </VStack>

        <VStack width='80%' align={props.alignContent ?? 'center'}>
          {props.children}
        </VStack>
      </VStack>
    </Center>
  )
}
