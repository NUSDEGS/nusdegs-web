interface Fa {
  name: string
  modules: string[]
}

export default interface Request {
  id: number
  major: string
  fas: Fa[]
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
       })
  }
}
