const mergeSortAnimation = (arr: number[]) => {
  const animations: any[] = []
  if (!arr.length) return arr
  const copyArr = [...arr]
  mergeSortHelper(arr, 0, arr.length - 1, copyArr, animations)
  return animations
}

const mergeSortHelper = (mainArr: number[], start: number, end: number, copyArr: number[], animations: number[]) => {
  if (start === end) return
  const mid = Math.floor((start + end) / 2)
  mergeSortHelper(copyArr, start, mid, mainArr, animations)
  mergeSortHelper(copyArr, mid + 1, end, mainArr, animations)
  mergeArr(mainArr, start, mid, end, copyArr, animations)
}

const mergeArr = (mainArr: number[], start: number, mid: number, end: number, copyArr: number[], animations: any[]): void => {
  let k = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (copyArr[i] <= copyArr[j]) {
      // overwrite the value at index k in the original array with the
      // value at index i in the copy array.
      animations.push([k, copyArr[i]]);
      mainArr[k++] = copyArr[i++];
    } else {
      // overwrite the value at index k in the original array with the
      // value at index j in the copy array.
      animations.push([k, copyArr[j]]);
      mainArr[k++] = copyArr[j++];
    }
  }
  while (i <= mid) {
    // comparing & we push them to change their color.
    animations.push([i, i]);

    // comparing & push them a second time to revert their color.
    animations.push([i, i]);

    // overwrite the value at index k in the original array with the
    // value at index i in the copy array.
    animations.push([k, copyArr[i]]);
    mainArr[k++] = copyArr[i++];
  }
  while (j <= end) {
    // comparing & we push them to change their color.
    animations.push([j, j]);

    // comparing & push them a second time to revert their color.
    animations.push([j, j]);

    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, copyArr[j]]);
    mainArr[k++] = copyArr[j++];
  }
}

export default mergeSortAnimation