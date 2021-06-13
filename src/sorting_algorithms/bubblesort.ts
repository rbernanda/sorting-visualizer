const bubbleSort = (arr: number[]) => {
  const copyArr = [...arr]
  let sorted = false
  let round = 0

  while(!sorted) {
    sorted = true
    for(let i = 0; i < (copyArr.length - 1 - round); i++) {
      if(copyArr[i] > copyArr[i + 1]) {
        sorted = false
        let temp = copyArr[i]
        copyArr[i] = copyArr[i + 1]
        copyArr[i + 1] = temp
      }
    }

    round++
  }

  return copyArr
}

export default bubbleSort