import { Center, Heading, VStack, Text, HStack, Divider, Button } from "@chakra-ui/react";

export default function SummaryPage() {
    return (
        <Center height='100vh' width='100vw'>
        <VStack width='80%' spacing='2rem'>
          <VStack width='100%' align='start' spacing='2rem'>
            <Heading size='4xl'>All Good?</Heading>
            <Text>Check your choices.</Text>
          </VStack>

          <HStack>
            <VStack align='end'>
              <Text as='b'>Major</Text>
              <Text as='b'>Focus Areas</Text>
            </VStack>

            <Divider orientation='vertical' />

            <VStack align='start'>
              <Text>Computer Science</Text>
              <Text>Networking, and Databases</Text>
            </VStack>
          </HStack>

          <VStack width='100%' align='end'>
            <Button colorScheme='green'>Looks good! Generate the plan</Button>
          </VStack>
        </VStack>
      </Center>
    )
}
