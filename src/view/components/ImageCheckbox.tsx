import { Box, VStack, Text, Image, UseCheckboxProps, useCheckbox, Center } from "@chakra-ui/react";

interface ImageCheckboxProps extends UseCheckboxProps {
  image: string
  label: string
}

export default function ImageCheckbox(props: ImageCheckboxProps) {
  // Destructure props to get checkboxProps without image and label.
  // This is to pass only checkboxProps to the useCheckbox hook.
  const {image, label, ...checkboxProps} = props
  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps
  } = useCheckbox(checkboxProps)

  return (
    <Box as='label' width='8rem'>
      <VStack cursor='pointer'>
        <input hidden {...getInputProps()} />
        
        <Center boxSize='8rem' {...getCheckboxProps()}>
          <Image src={image} {...getLabelProps()}/>
        </Center>

        <Text as='b' color={state.isChecked ? 'green.500' : ''} align='center'>{label}</Text>
      </VStack>
    </Box>
  )
}
