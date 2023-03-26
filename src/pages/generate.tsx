import ImageRadio from '@/view/components/ImageRadio'
import Plan from '@/view/components/Plan'
import Section from '@/view/components/Section'

import { Button, Center, ChakraProvider, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'

const FAS = [
  {
    label: 'Algorithms and Theory',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Artificial Intelligence',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Computer Graphics and Games',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Computer Security',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Database Systems',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Multimedia Information Retrieval',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Networking and Distributed Systems',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Parallel Computing',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Programming Languages',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  },
  {
    label: 'Software Engineering',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg'
  }
]

export default function Generate() {
  const { control } = useForm()
  const majorWatch = useWatch({ control, name: 'major' })
  const [ currentSectionIndex, setCurrentSectionIndex ] = useState(0)

  return (
    <ChakraProvider>
      <Head>
        <title>NUSDegs</title>
      </Head>

      <main>
        <form>
          <Section
            title='Major'
            description='Choose your major.'
            hidden={currentSectionIndex !== 0}
          >
            <Controller
              name='major'
              control={control}
              render={({field}) => (
                <ImageRadio
                  {...field}
                  image='https://www.svgrepo.com/show/12668/computer.svg'
                  label='Computer Science'
                  value='Computer Science'
                />
              )}
            />
          </Section>

          <Section
            title='All Good?'
            description='Check your choices.'
            hidden={currentSectionIndex !== 1}
          >
            <HStack>
                <VStack align='end'>
                  <Text as='b'>Major</Text>
                  <Text as='b'>Focus Areas</Text>
                </VStack>

                <Divider orientation='vertical' />

                <VStack align='start'>
                  <Text>{majorWatch}</Text>
                  <Text>Networking, and Databases</Text>
                </VStack>
              </HStack>
          </Section>

          <Section
            title='Plans'
            description='Here are your recommended plans.'
            hidden={currentSectionIndex !== 2}
          >
            <Plan sems={[]} />
          </Section>

          <Center>
            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              hidden={currentSectionIndex > 0}
            >
              Next
            </Button>

            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              isDisabled={currentSectionIndex > 1}
              hidden={currentSectionIndex < 1}
            >
              Done
            </Button>
          </Center>
        </form>
      </main>
    </ChakraProvider>
  )
}
