import ImageRadio from '@/view/components/ImageRadio'
import Plan from '@/view/components/Plan'
import Section from '@/view/components/Section'

import { Button, Center, ChakraProvider, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
           
export default function Generate() {
  const { control } = useForm()
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
                value='computerScience'
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
                <Text>Computer Science</Text>
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
            isDisabled={currentSectionIndex === 2}
          >
            {
              currentSectionIndex < 1 ? 'Next' : 'Done'
            }
          </Button>
        </Center>
      </form>
    </main>
  </ChakraProvider>
  )
}
