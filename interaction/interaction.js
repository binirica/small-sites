const grid = document.querySelector('#grid')
const playBtn = document.querySelector('#playBtn')
const stopBtn = document.querySelector('#stopBtn')
const clearBtn = document.querySelector('#clearBtn')

for (let i = 0; i < 32; i++) {
  const tile = document.createElement('div')
  tile.classList.add('tile')
  grid.append(tile)
}

const tiles = document.querySelectorAll('.tile')
let sequence = []
let timeouts = []
let lastClickTime = null
let isPlaying = false

tiles.forEach(tile => {
  let clickCount = 0
  let clickTimer = null

  tile.addEventListener('click', () => {
    clickCount++
    clearTimeout(clickTimer)

    clickTimer = setTimeout(() => {
      if (clickCount >= 2) {
        const now = Date.now()
        const gap = lastClickTime !== null ? now - lastClickTime : 300
        sequence.push({ tile: tile, gap: gap })
        lastClickTime = now
        tile.classList.add('active')
      } else {
        let foundIndex = -1
        for (let i = 0; i < sequence.length; i++) {
          if (sequence[i].tile === tile) {
            foundIndex = i
            break
          }
        }

        if (foundIndex !== -1) {
          sequence.splice(foundIndex, 1)
          let stillIn = false
          for (let i = 0; i < sequence.length; i++) {
            if (sequence[i].tile === tile) {
              stillIn = true
              break
            }
          }
          if (!stillIn) tile.classList.remove('active')
        } else {
          const now = Date.now()
          const gap = lastClickTime !== null ? now - lastClickTime : 300
          sequence.push({ tile: tile, gap: gap })
          lastClickTime = now
          tile.classList.add('active')
        }
      }
      clickCount = 0
    }, 250)
  })
})

function playSequence(index) {
  if (!isPlaying || sequence.length === 0) return

  const item = sequence[index]
  item.tile.classList.add('playing')

  const t1 = setTimeout(() => {
    item.tile.classList.remove('playing')
  }, 150)
  timeouts.push(t1)

  const nextIndex = (index + 1) % sequence.length
  const nextGap = sequence[nextIndex].gap || 300

  const t2 = setTimeout(() => {
    playSequence(nextIndex)
  }, nextGap)
  timeouts.push(t2)
}

playBtn.addEventListener('click', () => {
  if (sequence.length === 0) return
  isPlaying = true
  playSequence(0)
})

stopBtn.addEventListener('click', () => {
  isPlaying = false
  timeouts.forEach(t => clearTimeout(t))
  timeouts = []
  tiles.forEach(tile => tile.classList.remove('playing'))
})

clearBtn.addEventListener('click', () => {
  isPlaying = false
  timeouts.forEach(t => clearTimeout(t))
  timeouts = []
  sequence = []
  lastClickTime = null
  tiles.forEach(tile => {
    tile.classList.remove('active')
    tile.classList.remove('playing')
  })
})