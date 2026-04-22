// ===============================================
// GRAB ELEMENTS FROM HTML TO INTERACT WITH THEM
// ===============================================

//'const' declares a variable with a constant reference to a value that cannot be reassigned
//'document.querySelector()' references the html document and returns the first element that matches the CSS selector, in this instance id (#) or class (.)
const ring = document.querySelector('.ring') //selects element with class 'ring' (SVG circle)
const display = document.querySelector('.display') //selects the element with class 'display' (countdown text)
const slider = document.querySelector('#slider') //selects the element with id 'slider' (the range to set the time)
const visualTimer = document.querySelector('#visualTimer') //selects the element with id 'visualTimer' (clickable timer area)


// ======================================
//DEFINE FIXED VALUES AND TRACKABLE DATA
// ======================================

//total fixed length ('const') of the circle's perimeter in pixels
//used to calculate what percentage of the ring to fill as time passes
const circumference = 283

//let declares a variable that can be reassigned
let totalSeconds = Number(slider.value) 
//'slider.value' reads the current position of the slider and Number() converts it to an integer
//stores the duration of time selected by the user
let secondsLeft = totalSeconds
//tracks how many seconds remain during the countdown
//starts equal to totalSeconds and then counts down to zero
let timer
//declares an empty variable to hold the interval reference later so the timer can stop when needed (using 'clearInterval')


// =================================================================
// EVENT LISTENER SLIDER INPUT (update time when user drags slider)
// =================================================================

slider.addEventListener('input', () => {
  //'addEventListener' listens for a specific event on an element.
  //'input' fires continuously as user drags slider
  //'() ==> {}' is an arrow function and the code inside the function runs each time the event fires
        totalSeconds = Number(slider.value) //update total time to new slider position
        secondsLeft = totalSeconds //reset countdown to match the new total 
        
        //calculate minutes and seconds from the secondsLeft number
        const minutes = Math.floor(secondsLeft / 60) //Math.floor() rounds down to the nearest integer
        const seconds = Math.floor(secondsLeft % 60) //'%' operator returns the remanider after division
        display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}` 
        //updates the visible display text with the time formatted 
        //use the ` backtick string to directly embed variables and the ? : is an operator that shortens if/else
        //if seconds <10, add leading zero, else show as is
})


// ================================================
// EVENT LISTENER CLICK ON TIMER (start countdown)
// ================================================

visualTimer.addEventListener('click', () => { //fires each time user clicks the timer element
  clearInterval(timer) //stops current timer in progress before starting a new timer, uses 'timer' reference stored earlier to cancel it
  ring.style['stroke'] = '#7a9e7e' //changes ring stroke color to light green to signal timer is running
  secondsLeft = totalSeconds //resets countdown back to full selected duration before starting timer

  timer = setInterval( () => { //'setInterval()' runs the function inside it repeatedly and the return value is stored in 'timer' to stop it later
    secondsLeft = secondsLeft - 1 //decreases secondsLeft by 1 each interval
    //recalculate updated minutes and seconds
    const minutes = Math.floor(secondsLeft / 60) 
    const seconds = Math.floor(secondsLeft % 60)
    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`

    const offset = circumference * (1 - secondsLeft / totalSeconds) 
    //calculate how far to draw the ring's progress stroke
    //'secondsLeft / totalSeconds' gives value between 0 and 1 (fraction of time remaining)
    //subtracting from 1 inverts it, so as time decreases, the offset increases
    //multiplying by circumference converts the fraction to actual pixel length (svg cicrcle)
    //e.g. halfway timer: cicrumference * (1 - 0.5) = 283 * 0.5 = 141.5px offset (half of 283)
    
    ring.style['stroke-dashoffset'] = offset
    //applies calculated offset to ring's svg stroke
    //'stroke-dashoffset' controls where a dashed stroke begins (next animate to create visual effect of ring emptying as timer counts down)

    if (secondsLeft <= 0) { //when countdown reaches zero, reset
      clearInterval(timer) //stop interval from continuing to run
      ring.style['stroke-dashoffset'] = 0 //reset ring stroke to fully drawn (dark green)
      ring.style['stroke'] = '#c97b63' //change ring color to orange to indicate time's up
      display.textContent = 'Time!' //replace countdown text with 'time!'
    }
  }, 1000) //interval delay runs function above every 1000ms (1sec)
})
