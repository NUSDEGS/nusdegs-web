import { Button } from '@chakra-ui/button'
import Link from 'next/link'
import Section from './components/Section'

export default function HomePage() {
  return (
    <Section title='NUSDegs' alignContent='start'>
        <Link href='/generate'>
          <Button>Start</Button>
        </Link>
    </Section>
  )
}
