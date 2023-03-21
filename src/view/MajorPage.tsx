import { Center, Heading, VStack } from '@chakra-ui/layout'
import { Text, Box, Image, useRadio } from '@chakra-ui/react'
import Section from './components/Section'

export default function MajorPage() {
  const MajorRadio = (props: any) => {
    const {image, ...radioProps} = props
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
      <Box as='label'>
        <VStack {...htmlProps} cursor='pointer'>
          <input {...getInputProps({})} hidden/>
          <Box
            {...getCheckboxProps()}
            boxSize='8rem'
          >
            <Image src='https://www.svgrepo.com/show/12668/computer.svg' {...getLabelProps()} />
          </Box>

          <Text as='b' color={state.isChecked ? 'green.500' : ''}>Computer Science</Text>
        </VStack>
      </Box>
    )
  }

  return (
    <Section title='Major' description='Choose your major.'>
      <MajorRadio />
    </Section>
  )
}
