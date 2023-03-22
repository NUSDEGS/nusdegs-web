import ImageRadio from './components/ImageRadio'
import Section from './components/Section'

export default function MajorPage() {
  return (
    <Section title='Major' description='Choose your major.'>
      <ImageRadio
        image='https://www.svgrepo.com/show/12668/computer.svg'
        label='Computer Science'
        value='computer science'
      />
    </Section>
  )
}
