export default interface Request {
  id: number
  major: string
}

export function getRequestJson(requestFormData: any): Request {
  return {
    id: 0,  // TODO needs to be changed for each request.
    major: requestFormData['major'] ?? 'computerScience'  // Computer Science is chosen by default.
  }
}
