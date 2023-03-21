import { VStack, Text, HStack, Divider, Button } from "@chakra-ui/react";
import Section from "./components/Section";

export default function SummaryPage() {
    return (
      <Section title='All Good?' description='Check your choices.'>
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
      </Section>
    )
}
