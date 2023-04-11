import ImageCheckbox from '@/view/components/ImageCheckbox'
import ImageRadio from '@/view/components/ImageRadio'
import Plan from '@/view/components/Plan'
import Section from '@/view/components/Section'

import { Button, Card, CardBody, Center, ChakraProvider, Checkbox, CheckboxGroup, Divider, Flex, Heading, HStack, Radio, RadioGroup, Slider, SliderMark, SliderThumb, SliderTrack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
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
  const { control, trigger, formState: { errors } } = useForm({ mode: 'onTouched' })
  const [ currentSectionIndex, setCurrentSectionIndex ] = useState(0)
  const { getRadioProps: internshipFypRadioProps, getRootProps: internshipFypRootProps }
    = useRadioGroup()
  const { getRadioProps: qetRadioProps, getRootProps: qetRootProps } = useRadioGroup()
  const { getRadioProps: idCdRadioProps, getRootProps: idCdRootProps } = useRadioGroup()

  const majorWatch = useWatch({ control, name: 'major' })
  const fasWatch = useWatch({ control, name: 'fas' })
  const modulesWatch = useWatch({ control, name: 'modules' })
  const internshipFypWatch = useWatch({ control, name: 'internshipFyp'})
  const maxMcsWatch = useWatch({control, name: 'maxMcs'})
  const qetWatch = useWatch({ control, name: 'qet' })
  const idCdWatch = useWatch({ control, name: 'idCd' })

  const fieldNames = ['major', 'fas', 'modules', 'internshipFyp', 'maxMcs', 'qet', 'idCd']

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
            <Text
              color='red.500'
              hidden={errors.major === undefined}
            >
              Please choose a major.
            </Text>

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
              rules={{ required: true }}
            />
          </Section>

          <Section
            title='Focus Areas'
            description='Choose your focus areas.'
            hidden={currentSectionIndex !== 1}
          >
            <Text
              color='red.500'
              hidden={errors.fas === undefined}
            >
              Please choose at least one FA but no more than two.
            </Text>

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
                    rules={{
                      validate: {
                        checkAtLeast1FA: (_, fields) => Object
                                                          .values(fields.fas)
                                                          .filter(fa => fa).length >= 1,

                        checkAtMost2FAs: (_, fields) => Object
                                                          .values(fields.fas)
                                                          .filter(fa => fa).length <= 2
                      }
                    }}
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
            <Text
              color='red.500'
              hidden={errors.modules === undefined}
            >
              {
                getChosenFaLabels(fasWatch).length < 2
                  ? 'Please choose no more than 5 modules.'
                  : 'Please choose no more than 3 modules for each FA.'
              }
            </Text>

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
                          rules={{
                            validate: checkedModules => getChosenFaLabels(fasWatch).length < 2
                              ? (checkedModules ?? []).length <= 5
                              : (checkedModules ?? []).length <= 3
                          }}
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
            <Text
              color='red.500'
              hidden={errors.internshipFyp === undefined}
            >
              Please choose an internship or FYP option.
            </Text>

            <Controller
              name='internshipFyp'
              control={control}
              render={({field}) => (
                  <HStack {...internshipFypRootProps()} {...field}>
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
                              {...internshipFypRadioProps({ value: '6-Month Internship' })}
                            />
                            
                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/looks_3/default/48px.svg'
                              label='Months'
                              {...internshipFypRadioProps({ value: '3-Month Internship' })}
                            />
                            
                            <ImageRadio
                              image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/filter_3/default/48px.svg'
                              label='Months Each for 2 Internships'
                              {...internshipFypRadioProps({ value: 'Two 3-Month Internships' })}
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
                          {...internshipFypRadioProps({ value: 'FYP' })}
                        />
                      </CardBody>
                    </Card>
                  </HStack>
              )}
              rules={{ required: true }}
            />
          </Section>

          <Section
            title='Maximum Semester MCs'
            description='Choose the maximum number of Modular Credits (MCs) for each semester.'
            hidden={currentSectionIndex !== 4}
          >
            <Controller
              name='maxMcs'
              control={control}
              render={({field}) => (
                <Slider
                  min={20}
                  max={32}
                  step={4}
                  defaultValue={20}
                  width='50%'
                  {...field}
                >
                  <SliderMark as='b' value={20} marginTop='1rem' marginLeft='-0.5rem'>20</SliderMark>
                  <SliderMark as='b' value={24} marginTop='1rem' marginLeft='-0.5rem'>24</SliderMark>
                  <SliderMark as='b' value={28} marginTop='1rem' marginLeft='-0.5rem'>28</SliderMark>
                  <SliderMark as='b' value={32} marginTop='1rem' marginLeft='-0.5rem'>32</SliderMark>

                  <SliderTrack boxSize='0.5rem' rounded='md' />
                  <SliderThumb bgColor='green.500' boxSize='1.5rem'/>
                </Slider>
              )}
            />
          </Section>

          <Section
            title='QET'
            description={
              'Choose whether you have been exempted from taking the Qualifying English Test ' +
              '(QET) or not.'
            }
            hidden={currentSectionIndex !== 5}
          >
            <Text
              color='red.500'
              hidden={errors.qet === undefined}
            >
              Please specify if you are exempted or not.
            </Text>

            <Controller
              name='qet'
              control={control}
              render={({field}) => (
                <HStack align='top' {...qetRootProps()} {...field}>
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/check/default/48px.svg'
                    label="Yes, I'm exempted"
                    {...qetRadioProps({ value: 'Exempted' })}
                  />

                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/close/default/48px.svg'
                    label="No, I'm not"
                    {...qetRadioProps({ value: 'Not exempted' })}
                  />
                </HStack>
              )}
              rules={{ required: true }}
            />
          </Section>

          <Section
            title='ID/CD'
            description={
              'Choose your area of interest for interdisciplinary (ID) and cross-' +
              'disciplinary (CD) modules.'
            }
            hidden={currentSectionIndex !== 6}
          >
            <Text
              color='red.500'
              hidden={errors.idCd === undefined}
            >
              Please choose an ID/CD group.
            </Text>

            <Controller
              name='idCd'
              control={control}
              render={({field}) => (
                <Flex wrap='wrap' justify='space-around' align='top' {...idCdRootProps()} {...field}>
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/assignment_ind/default/48px.svg'
                    label='Management and IT'
                    {...idCdRadioProps({ value: 'Management and IT' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/biotech/default/48px.svg'
                    label='Molecular Biology'
                    {...idCdRadioProps({ value: 'Molecular Biology' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/diversity_2/default/48px.svg'
                    label='Human Studies'
                    {...idCdRadioProps({ value: 'Human Studies' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/auto_awesome/fill1/48px.svg'
                    label='Astrophysics'
                    {...idCdRadioProps({ value: 'Astrophysics' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/design_services/default/48px.svg'
                    label='Design'
                    {...idCdRadioProps({ value: 'Design' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/history_edu/default/48px.svg'
                    label='History of Science'
                    {...idCdRadioProps({ value: 'History of Science' })}
                  />
                  <ImageRadio
                    image='https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/cardiology/default/48px.svg'
                    label='Medical Science'
                    {...idCdRadioProps({ value: 'Medical Science' })}
                  />
                </Flex>
              )}
              rules={{ required: true }}
            />
          </Section>

          <Section
            title='All Good?'
            description='Check your choices.'
            hidden={currentSectionIndex !== 7}
          >
            <HStack>
                <VStack align='end'>
                  <Text as='b'>Major</Text>
                  <Text as='b'>Focus Areas</Text>
                  <Text as='b'>Preferred Modules</Text>
                  <Text as='b'>Internship/FYP</Text>
                  <Text as='b'>Max MCs per Sem</Text>
                  <Text as='b'>QET</Text>
                  <Text as='b'>ID/CD modules</Text>
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
                  <Text>{maxMcsWatch}</Text>
                  <Text>{qetWatch}</Text>
                  <Text>{idCdWatch}</Text>
                </VStack>
              </HStack>
          </Section>

          <Section
            title='Plans'
            description='Here are your recommended plans.'
            hidden={currentSectionIndex !== 8}
          >
            <Plan sems={[]} />
          </Section>

          <Center>
            <HStack spacing='1rem'>
              <Button
                onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
                isDisabled={currentSectionIndex == 0}
              >
                Previous
              </Button>

              <Button
                colorScheme='green'
                onClick={() => {
                  trigger(fieldNames[currentSectionIndex])
                  .then((isValid) => isValid ? setCurrentSectionIndex(currentSectionIndex + 1) : '')
                  .catch((error) => console.error(error))
                }}
                hidden={currentSectionIndex > 6}
              >
                Next
              </Button>

              <Button
                colorScheme='green'
                onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                isDisabled={currentSectionIndex > 7}
                hidden={currentSectionIndex < 7}
              >
                Done
              </Button>
            </HStack>
          </Center>
        </form>
      </main>
    </ChakraProvider>
  )
}
