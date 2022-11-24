export function editDate (str: string) {
  let result = str.split('-')
  return `${result[2].slice(0,2)}.${result[1]}.${result[0]}`
}