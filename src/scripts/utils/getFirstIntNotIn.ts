export default function getFirstIntNotIn(list:number[]) {
  let firstInt = 0

  while (list.indexOf(firstInt) !== -1) {
    firstInt++
  }

  return firstInt
}