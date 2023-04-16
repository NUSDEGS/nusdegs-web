import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Heading, HStack, Spacer, Table, Tag, TagLabel, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ModuleList, { Module } from "./ModuleList";

export interface Semester {
  seq_num: number
  modules: Module[]
}

interface PlanProps {
  sems: Semester[]
}

function getSemesterName(seq_num: number) {
  const year = Math.floor((seq_num - 1) / 4) + 1
  const sem = seq_num % 4;
  if (sem === 1 || sem === 2) return `Year ${year} Semester ${sem}`
  else return `Year ${year} Special term ${2 - sem % 2}`
}

export default function Plan(props: PlanProps) {
  return (
    <Accordion width='100%' borderWidth='1px' allowToggle>
      {
        props.sems.map(sem => {
          return (
          <AccordionItem key={""}>
            <AccordionButton>
              <Flex width='100%'>
                <Heading size='md'>
                  {
                    getSemesterName(sem.seq_num)
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
        )})
      }
    </Accordion>
  )
}
