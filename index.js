let dissapearTimer

const generateRandomRgbValue = () => {
  const rand = () => Math.floor(Math.random() * 255)

  return `rgb(${rand()}, ${rand()}, ${rand()})`
}

const drawMainSquare = sideSize => {
  const mainSquareEl = document.getElementById('mainSquare')
  mainSquareEl.innerHTML = ''

  mainSquareEl.style.width = `${sideSize}px`
  mainSquareEl.style.height = `${sideSize}px`

  document.getElementById('app')?.appendChild(mainSquareEl)

  return mainSquareEl
}

const calcChildrenWillFit = (containerSize, childSize, numberOfChildren) => {
  const side = Math.floor(containerSize / childSize)
  const totalChildrenFitInContainer = side * side

  const result =
    totalChildrenFitInContainer < numberOfChildren
      ? totalChildrenFitInContainer
      : numberOfChildren

  return result
}

const drawContainer = (containerSize, childSize, numberOfChildren) => {
  const childrenWillFit = calcChildrenWillFit(
    containerSize,
    childSize,
    numberOfChildren
  )

  const container = drawMainSquare(containerSize)

  const reportEl = document.createElement('div')
  document.body.appendChild(reportEl)

  if (childrenWillFit < numberOfChildren) {
    reportEl.innerHTML = `
    <p>
      Not all children could fit. Out of ${numberOfChildren} only ${childrenWillFit} would fit.
      ${numberOfChildren - childrenWillFit} were left out
      </p>
    `
  } else {
    reportEl.innerHTML = `
    <p>
      All children were able to fit 
    </p>
    `
  }

  for (let i = 0; i < childrenWillFit; i++) {
    const child = document.createElement('div')
    child.style.height = `${childSize}px`
    child.style.width = `${childSize}px`
    child.classList.add('child')
    child.style.backgroundColor = generateRandomRgbValue()

    child.onmouseenter = () => {
      child.style.backgroundColor = generateRandomRgbValue(255)

      dissapearTimer = setTimeout(() => {
        child.style.opacity = '0'
      }, 2000)

      child.onmouseleave = () => {
        dissapearTimer ? clearTimeout(dissapearTimer) : 0
      }
    }

    container.appendChild(child)
  }
}

drawContainer(200, 50, 17)
// drawContainer(310, 200, 4)
// drawContainer(413, 42, 30)
// drawContainer(200, 300, 2)
