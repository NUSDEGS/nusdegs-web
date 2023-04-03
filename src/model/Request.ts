interface Fa {
  name: string
  modules: string[]
}

export default interface Request {
  id: number
  major: string
  fas: Fa[]
  isFyp: boolean
  is6MonthInternship: boolean
  is3Month1Internship: boolean
  is3Month2Internships: boolean
  maxMcs: number
  doesNeedQet: boolean
  cdIdGroup: string
}

export function getRequestJson(requestFormData: any): Request {
  return {
    id: 0,  // TODO needs to be changed for each request.
    major: requestFormData['major'] ?? 'Computer Science',  // Computer Science is chosen by
                                                            // default.
    fas: Object.entries(requestFormData['modules'])
      .map(([fa, modules]): Fa => {
        const moduleStrings = modules as string[]
        return {name: fa, modules: moduleStrings}
       }),

    isFyp: requestFormData['internshipFyp'] === 'FYP',
    is6MonthInternship: requestFormData['internshipFyp'] === '6-Month Internship',
    is3Month1Internship: requestFormData['internshipFyp'] === '3-Month Internship',
    is3Month2Internships: requestFormData['internshipFyp'] === 'Two 3-Month Internships',
    maxMcs: requestFormData['maxMcs'],
    doesNeedQet: requestFormData['qet'] !== 'Exempted',
    cdIdGroup: requestFormData['idCd']  // Field names are a bit messy; can be changed later.
  }
}
