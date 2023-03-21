import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Heading, HStack, Spacer, Table, Tag, TagLabel, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ModuleList, { Module } from "./ModuleList";

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
              <ModuleList modules={sem.modules} />
            </AccordionPanel>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
