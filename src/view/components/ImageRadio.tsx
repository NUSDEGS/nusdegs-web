import { Box, VStack, Text, Image, useRadio, UseRadioProps } from "@chakra-ui/react";

interface ImageRadioProps extends UseRadioProps {
  image: string
  label: string
}

export default function ImageRadio(props: ImageRadioProps) {
  // Destructure props to get radioProps without image and label.
  // This is to pass only radioProps to the useRadio hook.
  const {image, label, ...radioProps} = props
  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps
  } = useRadio(radioProps)

  return (
    <Box as='label'>
      <VStack cursor='pointer'>
        <input hidden {...getInputProps()} />
        
        <Box boxSize='8rem' {...getCheckboxProps()}>
          <Image src={image} {...getLabelProps()}/>
        </Box>

        <Text as='b' color={state.isChecked ? 'green.500' : ''}>{label}</Text>
      </VStack>
    </Box>
  )
}