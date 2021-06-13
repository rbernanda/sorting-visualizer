import { useEffect, useState } from 'react'
import getMergeSortAnimations from '../sorting_algorithms/mergesort'
import bubbleSort from '../sorting_algorithms/bubblesort'
import { ANIMATION_SPEED_MS, NUMBER_OF_ARRAY_BARS, PRIMARY_COLOR, SECONDARY_COLOR } from '../constant'
import '../index.css'

const SortingVisualizer = () => {
  const [arr, setArray] = useState<number[]>([])

  useEffect(() => {
    resetArr()
  }, [])


  const resetArr = (): void => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomInteger(5, 500));
    }
    
    const builtInSort = [...array].sort((a, b) => a - b)
    console.log(checkIsSorted(builtInSort, bubbleSort(array)));

    setArray(array);
  }

  const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

  const mergeSort = (): void => {
    const animations = getMergeSortAnimations(arr);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i]
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i]
          const barOneStyle = arrayBars[barOneIdx]?.style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    
  }

  return (
    <>
      <div className="array-container">
        {arr.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }} />
        ))}
      </div>
      <button onClick={resetArr}>Generate new array</button>
      <button onClick={mergeSort}>Merge Sort</button>
    </>

  )
}

export default SortingVisualizer

const checkIsSorted = (arrOne: number[], arrTwo: number[]) => {
  console.log(arrOne, arrTwo);
  if(arrOne.length !== arrTwo.length) return false
  arrOne.forEach((el, idx) => {
    if(el !== arrTwo[idx]) return false
  })

  return true
}

