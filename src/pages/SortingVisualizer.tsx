import { useEffect, useState } from 'react'
import getMergeSortAnimations from '../sorting_algorithms/mergesort'
import bubbleSort from '../sorting_algorithms/bubblesort'
import { ANIMATION_SPEED_MS, NUMBER_OF_ARRAY_BARS, PRIMARY_COLOR, SECONDARY_COLOR } from '../constant'
import '../index.css'

const SortingVisualizer = () => {
  const [arr, setArray] = useState<number[]>([])
  const [isSorting, setIsSorting] = useState(false)

  const progressBar = document.querySelector('.progress-bar') as HTMLElement

  useEffect(() => {
    resetArr()
  }, [])


  const resetArr = (): void => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomInteger(5, 450));
    }

    if(progressBar) progressBar.style.width = "0%"

    // const builtInSort = [...array].sort((a, b) => a - b)

    setArray(array);
  }

  const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

  const mergeSort = (): void => {
    const animations = getMergeSortAnimations(arr);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      // const progressBar = document.querySelector('.progress-bar') as HTMLElement
      const percentage = ((i + 1) / animations.length) * 100
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
          progressBar.style.width = `${percentage}%`
        }, i * ANIMATION_SPEED_MS);
      }
    }

  }

  return (
    <>
      <div className="array-container">
        <div>
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
      </div>
      <div className='bottom-menu-container'>
        <div className='shuffle'>
          <button onClick={resetArr}> <i className="fa-random fa"></i>  </button>
        </div>

        <div className='play'>
          <button onClick={mergeSort}>
              {isSorting ? <i className="fa fa-play-circle"></i> : <i className="fas fa-pause-circle"></i>}
          </button>
          <div className='progress-bar-container'> <div className='progress-bar'></div> </div>
        </div>


      </div>
    </>

  )
}

export default SortingVisualizer

const checkIsSorted = (arrOne: number[], arrTwo: number[]) => {
  if (arrOne.length !== arrTwo.length) return false
  arrOne.forEach((el, idx) => {
    if (el !== arrTwo[idx]) return false
  })

  return true
}

