export default (quoteText:string) => {
  const re = /(?:^\$|\s\$)([a-z]+)/g
  const matches:string[] = []
  let execResult:RegExpExecArray|null

  while ((execResult = re.exec(quoteText)) !== null) {
    matches.push(execResult[1])
  }

  return matches
}