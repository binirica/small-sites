const grid = document.querySelector('#grid')
const playBtn = document.querySelector('#playBtn')
const stopBtn = document.querySelector('#stopBtn')
const clearBtn = document.querySelector('#clearBtn')

for (let i = 0; i < 32; i++) {
// loops 32 times (i goes from 0 to 31).
// rather than writing 32 <div>s by hand in the HTML
  const tile = document.createElement('div')
  tile.classList.add('tile')
  grid.append(tile)
  // adds the tile into grid container
  // 'append' places it after any existing children so tiles are added in order from 1 to 32, left to right.
}

const tiles = document.querySelectorAll('.tile')
let sequence = [] // array that stores the user's recorded sequence of tiles
let timeouts = [] // array that stores references to every active setTimeout call (allows for canceling timers when stop or clear pressed)
let lastClickTime = null // track timestamp of the most recent tile click to calculate the time between clicks, which encodes the rhythm
// start as null because no click has happened yet
let isPlaying = false //boolean: true when the sequence is actively playing, false when stopped

tiles.forEach(tile => {
  let clickCount = 0
    // counts how many times tile has been clicked within short window
  let clickTimer = null
  // store the setTimeout reference used to detect single vs double clicks

  tile.addEventListener('click', () => {
    clickCount++ // increments click count each time the tile is clicked.
    clearTimeout(clickTimer) // cancels the previous timer if the user clicks again quickly

    clickTimer = setTimeout(() => {
      if (clickCount >= 2) { //double click
        const now = Date.now() //returns the current time as a timestamp to calculate gaps
        const gap = lastClickTime !== null ? now - lastClickTime : 300
        //!==null condition that checks if lastClickTime has a value, ? (if true), : (else)
        // calcualte time difference between current time and previous event (lastClickTime) i.e. how many milliseconds passed since the last tile was added
        // if this is the very first tile (lastClickTime is null), defaults to 300ms.
        // this gap is captures the rhythym, tapping quickly gives small gaps, tapping slowly gives large ones, and those gaps play back later
        sequence.push({ tile: tile, gap: gap })
        // Adds an object to the sequence array recording WHICH tile and WHEN.
        // '{ tile: tile, gap: gap }' is an object literal with two properties.
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