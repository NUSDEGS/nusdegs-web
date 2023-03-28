import ImageCheckbox from '@/view/components/ImageCheckbox'
import ImageRadio from '@/view/components/ImageRadio'
import Plan from '@/view/components/Plan'
import Section from '@/view/components/Section'

import { Button, Card, CardBody, Center, ChakraProvider, Checkbox, CheckboxGroup, Divider, Flex, Heading, HStack, Radio, RadioGroup, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'

const FAS = [
  {
    label: 'Algorithms and Theory',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/function/default/48px.svg',
    modules: [
      { code: 'CS3231', title: 'Theory of Computation' },
      { code: 'CS3236', title: 'Introduction to Information Theory' },
      { code: 'CS4231', title: 'Parallel and Distributed Algorithms' },
      { code: 'CS4234', title: 'Optimisation Algorithms' }
    ]
  },
  {
    label: 'Artificial Intelligence',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/neurology/default/48px.svg',
    modules: [
      { code: 'CS3243', title: 'Introduction to Artificial Intelligence' },
      { code: 'CS3244', title: 'Machine Learning' },
      { code: 'CS3263', title: 'Foundations of Artificial Intelligence' },
      { code: 'CS3264', title: 'Foundations of Machine Learning' },
      { code: 'CS4243', title: 'Computer Vision and Pattern Recognition' },
      { code: 'CS4244', title: 'Knowledge Representation and Reasoning' },
      { code: 'CS4246', title: 'AI Planning and Decision Making' },
      { code: 'CS4248', title: 'Natural Language Processing' }
    ]
  },
  {
    label: 'Computer Graphics and Games',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/sports_esports/default/48px.svg',
    modules: [
      { code: 'CS3241', title: 'Computer Graphics' },
      { code: 'CS3242', title: '3D Modelling and Animation' },
      { code: 'CS3247', title: 'Game Development' },
      { code: 'CS4247', title: 'Graphics Rendering Techniques' },
      { code: 'CS4350', title: 'Game Development Project' }
    ]
  },
  {
    label: 'Computer Security',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/shield_lock/default/48px.svg',
    modules: [
      { code: 'CS2107', title: 'Introduction to Information Security' },
      { code: 'CS3235', title: 'Computer Security' },
      { code: 'CS4236', title: 'Cryptography Theory and Practice' },
      { code: 'CS4230', title: 'Foundations of Modern Cryptography' },
      { code: 'CS4238', title: 'Computer Security Practice' },
      { code: 'CS4239', title: 'Software Security' }
    ]
  },
  {
    label: 'Database Systems',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/database/default/48px.svg',
    modules: [
      { code: 'CS2102', title: 'Database Systems' },
      { code: 'CS3223', title: 'Database Systems Implementation' },
      { code: 'CS4221', title: 'Database Applications Design and Tuning' },
      { code: 'CS4224', title: 'Distributed Databases' },
      { code: 'CS4225', title: 'Big Data Systems for Data Science' },
    ]
  },
  {
    label: 'Multimedia Information Retrieval',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/video_camera_back/default/48px.svg',
    modules: [
      { code: 'CS2108', title: 'Introduction to Media Computing' },
      { code: 'CS3245', title: 'Information Retrieval' },
      { code: 'CS4242', title: 'Social Media Computing' },
      { code: 'CS4248', title: 'Natural Language Processing' },
      { code: 'CS4347', title: 'Sound and Music Computing' }
    ]
  },
  {
    label: 'Networking and Distributed Systems',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/router/default/48px.svg',
    modules: [
      { code: 'CS3103', title: 'Computer Networks Practice' },
      { code: 'CS4222', title: 'Wireless Networking' },
      { code: 'CS4226', title: 'Internet Architecture' },
      { code: 'CS4231', title: 'Parallel and Distributed Algorithms' },
    ]
  },
  {
    label: 'Parallel Computing',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/memory/default/48px.svg',
    modules: [
      { code: 'CS3210', title: 'Parallel Computing' },
      { code: 'CS3211', title: 'Parallel and Concurrent Programming' },
      { code: 'CS4231', title: 'Parallel and Distributed Algorithms' },
      { code: 'CS4223', title: 'Multi-core Architecture' }
    ]
  },
  {
    label: 'Programming Languages',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/regular_expression/default/48px.svg',
    modules: [
      { code: 'CS2104', title: 'Programming Language Concepts' },
      { code: 'CS3211', title: 'Parallel and Concurrent Programming' },
      { code: 'CS4212', title: 'Compiler Design' },
      { code: 'CS4215', title: 'Programming Language Implementation' }
    ]
  },
  {
    label: 'Software Engineering',
    image: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/app_shortcut/default/48px.svg',
    modules: [
      { code: 'CS3213', title: 'Foundations of Software Engineering' },
      { code: 'CS3219', title: 'Software Engineering Principles and Patterns' },
      { code: 'CS4211', title: 'Formal Methods for Software Engineering' },
      { code: 'CS4218', title: 'Software Testing' },
      { code: 'CS4239', title: 'Software Security' }
    ]
  }
]

function getChosenFaLabels(fasWatch: any) {
  return Object.entries(fasWatch ?? {})
    .filter(([_, isFaChosen]) => isFaChosen)
    .map(([faLabel, _]) => faLabel)
}

export default function Generate() {
  const { control } = useForm()
  const [ currentSectionIndex, setCurrentSectionIndex ] = useState(0)
  const { getRadioProps, getRootProps } = useRadioGroup()
  const majorWatch = useWatch({ control, name: 'major' })
  const fasWatch = useWatch({ control, name: 'fas' })
  const modulesWatch = useWatch({ control, name: 'modules' })
  const internshipFypWatch = useWatch({ control, name: 'internshipFyp'})

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
            title='Focus Area Modules'
            description='Choose your preferred modules for your focus areas.'
            hidden={currentSectionIndex !== 2}
          >
            <Flex width='100%' align='start' justify='space-around'>
            {
              getChosenFaLabels(fasWatch)
                .map(faLabel => FAS.find(fa => fa.label === faLabel))
                .map(fa => (
                  <VStack align='start'>
                    <Heading size='sm'>{fa?.label}</Heading>
                    {
                      fa?.modules
                      .map(module => (
                        <Controller
                          name={`modules.${fa.label}`}
                          control={control}
                          render={({field}) => (
                            <CheckboxGroup {...field}>
                              <Checkbox value={`${module.code} ${module.title}`}>
                                {`${module.code} ${module.title}`}
                              </Checkbox>
                            </CheckboxGroup>
                          )}
                        />
                      ))
                    }
                  </VStack>
                ))
            }
            </Flex>
          </Section>

          <Section
            title='Internship or FYP?'
            description='Choose your internship or final-year project (FYP) preference.'
            hidden={currentSectionIndex !== 3}
          >
            <Controller
              name='internshipFyp'
              control={control}
              render={({field}) => (
                  <HStack {...getRootProps()} {...field}>
                    <HStack>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading>Internship</Heading>
                          <HStack>
                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/engineering/default/48px.svg'
                              label=''
                              isDisabled
                            />

                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/looks_6/default/48px.svg'
                              label='Months'
                              {...getRadioProps({ value: '6-Month Internship' })}
                            />
                            
                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/looks_3/default/48px.svg'
                              label='Months'
                              {...getRadioProps({ value: '3-Month Internship' })}
                            />
                            
                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/filter_3/default/48px.svg'
                              label='Months Each for 2 Internships'
                              {...getRadioProps({ value: 'Two 3-Month Internships' })}
                            />
                          </HStack>
                        </CardBody>
                      </Card>
                    </HStack>

                    <Card variant='outline'>
                      <CardBody>
                        <Heading>FYP</Heading>
                        <ImageRadio
                          image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/school/default/48px.svg'
                          label='FYP'
                          {...getRadioProps({ value: 'FYP' })}
                        />
                      </CardBody>
                    </Card>
                  </HStack>
              )}
            />
          </Section>

          <Section
            title='All Good?'
            description='Check your choices.'
            hidden={currentSectionIndex !== 4}
          >
            <HStack>
                <VStack align='end'>
                  <Text as='b'>Major</Text>
                  <Text as='b'>Focus Areas</Text>
                  <Text as='b'>Preferred Modules</Text>
                  <Text as='b'>Internship/FYP</Text>
                </VStack>

                <Divider orientation='vertical' />

                <VStack align='start'>
                  <Text>{majorWatch}</Text>
                  <Text>
                    {
                      // fasWatch is undefined at first before FAs are chosen by the user.
                      Object.entries(fasWatch ?? {})
                        .filter(([_, isFaChosen]) => isFaChosen)
                        .map(([faName, _]) => faName)
                        .join(', and ')
                    }
                  </Text>
                  <Text>
                  {
                    Object.values(modulesWatch ?? {})
                      .filter(module => !!module)
                      .flatMap(module => module)
                      .join(', ')
                  }
                  </Text>
                  <Text>{internshipFypWatch}</Text>
                </VStack>
              </HStack>
          </Section>

          <Section
            title='Plans'
            description='Here are your recommended plans.'
            hidden={currentSectionIndex !== 5}
          >
            <Plan sems={[]} />
          </Section>

          <Center>
            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              hidden={currentSectionIndex > 3}
            >
              Next
            </Button>

            <Button
              colorScheme='green'
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              isDisabled={currentSectionIndex > 4}
              hidden={currentSectionIndex < 4}
            >
              Done
            </Button>
          </Center>
        </form>
      </main>
    </ChakraProvider>
  )
}
