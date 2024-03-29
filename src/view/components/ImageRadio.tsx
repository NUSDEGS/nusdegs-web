import { Box, VStack, Text, Image, useRadio, UseRadioProps, Center } from "@chakra-ui/react";

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
      <VStack cursor={props.isDisabled ? '' : 'pointer'}>
        <input hidden {...getInputProps()} />
        
        <Center boxSize='8rem' {...getCheckboxProps()}>
          <Image src={image} width='6rem' {...getLabelProps()}/>
        </Center>

        <Text
          as='b'
          color={state.isChecked ? 'green.500' : ''}
          align='center'
          width='8rem'
        >
          {label}
        </Text>
      </VStack>
    </Box>
  )
}
