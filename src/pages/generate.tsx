import ImageCheckbox from '@/view/components/ImageCheckbox'
import ImageRadio from '@/view/components/ImageRadio'
import Plan from '@/view/components/Plan'
import Section from '@/view/components/Section'

import { Button, Center, ChakraProvider, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'

const FAS = [
  {
    label: 'Algorithms and Theory',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/function/default/48px.svg'
  },
  {
    label: 'Artificial Intelligence',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/neurology/default/48px.svg'
  },
  {
    label: 'Computer Graphics and Games',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/sports_esports/default/48px.svg'
  },
  {
    label: 'Computer Security',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/shield_lock/default/48px.svg'
  },
  {
    label: 'Database Systems',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/database/default/48px.svg'
  },
  {
    label: 'Multimedia Information Retrieval',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/video_camera_back/default/48px.svg'
  },
  {
    label: 'Networking and Distributed Systems',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/router/default/48px.svg'
  },
  {
    label: 'Parallel Computing',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/memory/default/48px.svg'
  },
  {
    label: 'Programming Languages',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/regular_expression/default/48px.svg'
  },
  {
    label: 'Software Engineering',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/app_shortcut/default/48px.svg'
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
                  image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/computer/default/48px.svg'
                  label='Computer Science'
                  value='Computer Science'
                />
              )}
            />
          </Section>

          <Section
            title='Focus Areas'
            description='Choose your focus areas.'
            hidden={currentSectionIndex !== 1}
          >
            <Flex wrap='wrap' justify='center'>
              {
                FAS.map(fa => (
                  <Controller
                    name={`fas.${fa.label}`}
                    control={control}
                    render={({field}) => (
                      <ImageCheckbox
                        {...field}
                        image={fa.image}
                        label={fa.label}
                        value={fa.label}
                      />
                    )}
                  />
                ))
              }
            </Flex>
          </Section>

          <Section
            title='All Good?'
            description='Check your choices.'
            hidden={currentSectionIndex !== 2}
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
            hidden={currentSectionIndex !== 3}
          >
            <Plan sems={[]} />
          </Section>

          <Center>
            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              hidden={currentSectionIndex > 1}
            >
              Next
            </Button>

            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              isDisabled={currentSectionIndex > 2}
              hidden={currentSectionIndex < 2}
            >
              Done
            </Button>
          </Center>
        </form>
      </main>
    </ChakraProvider>
  )
}
