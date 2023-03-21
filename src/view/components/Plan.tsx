import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Heading, HStack, Spacer, Table, Tag, TagLabel, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export interface Module {
  code: string
  title: string
  mcs: number
  tags: string[]
}

export interface Semester {
  seqNum: number
  modules: Module[]
}

export interface PlanProps {
  sems: Semester[]
}

export default function Plan(props: PlanProps) {
  return (
    <Accordion width='100%' borderWidth='1px' allowToggle allowMultiple>
      {
        props.sems.map(sem => (
          <AccordionItem>
            <AccordionButton>
              <Flex width='100%'>
                <Heading size='md'>
                  {
                    `Year ${Math.floor(sem.seqNum / 2) + 1} ` +
                    `Semester ${Math.floor(sem.seqNum % 2) + 1}`
                  }
                </Heading>
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
                  {
                    sem.modules.map(module => (
                      <Tr>
                        <Td width='60%'>{`${module.code} ${module.title}`}</Td>
                        <Td width='10%'>{module.mcs}</Td>
                        <Td>
                          <HStack>
                            {
                              module.tags.map(tag => (
                                <Tag>
                                  <TagLabel>{tag.toUpperCase()}</TagLabel>
                                </Tag>
                              ))
                            }
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
