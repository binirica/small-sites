const ring = document.querySelector('.ring')
const display = document.querySelector('.display')
const slider = document.querySelector('#slider')
const visualTimer = document.querySelector('#visualTimer')

const circumference = 283

let totalSeconds = Number(slider.value)
let secondsLeft = totalSeconds
let timer

slider.addEventListener('input', () => {
        totalSeconds = Number(slider.value)
        secondsLeft = totalSeconds
        
        const minutes = Math.floor(secondsLeft / 60)
        const seconds = Math.floor(secondsLeft % 60)
        display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})

visualTimer.addEventListener('click', () => {
  clearInterval(timer)
  ring.style['stroke'] = '#7a9e7e'
  secondsLeft = totalSeconds

  timer = setInterval( () => {
    secondsLeft--

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = Math.floor(secondsLeft % 60)
    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`

    const offset = circumference * (1 - secondsLeft / totalSeconds)
    ring.style['stroke-dashoffset'] = offset

    if (secondsLeft <= 0) {
      clearInterval(timer)
      ring.style['stroke-dashoffset'] = 0
      ring.style['stroke'] = '#c97b63'
      display.textContent = 'Time!'
    }
  }, 1000)
})
