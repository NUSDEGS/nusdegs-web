import { HStack, Table, Tag, TagLabel, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

export interface Module {
  code: string
  title: string
  mcs: number
  tags: string[]
}

interface ModuleListProps {
  modules: Module[]
}

export default function ModuleList(props: ModuleListProps) {
  return (
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
        props.modules.map(module => (
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
  )
}
