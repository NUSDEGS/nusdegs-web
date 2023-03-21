import Plan, { Semester } from "./components/Plan";
import Section from "./components/Section";

// This const is used just for testing.
const sems: Semester[] = [
  {
    seqNum: 0,
    modules: [
      {
        code: 'CS1101S',
        title: 'Programming Methodology',
        mcs: 4,
        tags: ['core']
      },
      {
        code: 'CS2040',
        title: 'Data Structures and Algorithms',
        mcs: 4,
        tags: ['core', 'algorithms']
      },
    ]
  },
  {
    seqNum: 1,
    modules: [
      {
        code: 'CS5224',
        title: 'Cloud Computing',
        mcs: 4,
        tags: ['networking']
      }
    ]
  },
  {
    seqNum: 2,
    modules: [
      {
        code: 'CS5224',
        title: 'Cloud Computing',
        mcs: 4,
        tags: ['networking']
      }
    ]
  },
]

export default function PlansPage() {
  return (
    <Section title='Plans' description='Here are your recommended plans.'>
      <Plan sems={sems}/>
    </Section>
  )
}
