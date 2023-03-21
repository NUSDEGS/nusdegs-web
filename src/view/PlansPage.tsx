import { Center, Heading, VStack, Text, HStack, Table, Thead, Th, Tbody, Tr, Td, Tag, TagLabel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Spacer } from "@chakra-ui/react";
import Section from "./components/Section";

export default function PlansPage() {
  return (
    <Section title='Plans' description='Here are your recommended plans.'>
      <Accordion width='100%' borderWidth='1px' allowToggle allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Flex width='100%'>
                <Heading size='md'>Year 1 Semester 1</Heading>
                <Spacer />
                <AccordionIcon />
              </Flex>
            </AccordionButton>

            <AccordionPanel padding='0'>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Module</Th>
                    <Th>Credits</Th>
                    <Th>Tags</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td width='60%'>CS2103T Software Engineering</Td>
                    <Td width='10%'>4</Td>
                    <Td>
                      <HStack>
                        <Tag colorScheme='blue'>
                          <TagLabel>SWE</TagLabel>
                        </Tag>

                        <Tag>
                          <TagLabel>CORE</TagLabel>
                        </Tag>
                      </HStack>
                    </Td>
                  </Tr>

                  <Tr>
                    <Td width='60%'>CS5224 Cloud Computing</Td>
                    <Td width='10%'>4</Td>
                    <Td>
                      <HStack>
                        <Tag colorScheme='red'>
                          <TagLabel>NETWORKING</TagLabel>
                        </Tag>
                      </HStack>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Flex width='100%'>
                <Heading size='md'>Year 1 Semester 2</Heading>
                <Spacer />
                <AccordionIcon />
              </Flex>
            </AccordionButton>

            <AccordionPanel padding='0'>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Module</Th>
                    <Th>Credits</Th>
                    <Th>Tags</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td width='60%'>CS4225 Big Data Systems for Data Science</Td>
                    <Td width='10%'>4</Td>
                    <Td>
                      <HStack>
                        <Tag colorScheme='green'>
                          <TagLabel>DATABASES</TagLabel>
                        </Tag>
                      </HStack>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
    </Section>
  )
}
