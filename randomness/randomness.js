function handleClick() { //function triggered by onlcick attribute on a button in html
    const btn = document.getElementById("button"); //grabs html element with id="button" and stores it in 'btn'

    //SHAKE ANIMATION
    btn.classList.add("shake"); //built-in property 'classList' modifies css without overwriting and '.add("shake") applies "shake" class which activates CSS keyframe animation to physically shake button

    //WAIT FOR SHAKE TO FINISH, THEN RETURN RESULT
    btn.addEventListener("animationend", function onShakeEnd() {
    //'animationend' is a built-in browser event that fires automatically the moment css animation completes on an element
    // use instead of a timer (setTimeout) so result only appears after the shake visually finishes 
    //'function onShakeEnd()' names the function  and allows to remove this listener later (removeEventListener)
        btn.classList.remove("shake"); //removes shake when animation is done
        btn.classList.add("triangle"); //changes the buttons visual to reveal answer
    
    //GENERATE RANDOM NUMBER TO PICK RESPONSE

    const num = Math.floor(Math.random() * 20) + 1;
    let result = "";
    // 'Math.random()' generates a decimal between 0 (inclusive) and 1 (exclusive)
    // multiply by 20 to scale to a range of 0–19.9999.
    // 'Math.floor()' rounds down to the nearest integer → 0 to 19.
    // add 1 shifts range to 1–20, giving an integer that maps to one of the 20 potential responses below
    
 
if (num===1) { 
    result = "My reply is no.";
} else if (num===2) {
    result = "Don't count on it.";
} else if (num===3) {
    result = "My sources say no.";
} else if (num===4) {
    result = "Very doubtful.";
} else if (num===5) {
    result = "Outlook not so good.";
} else if (num===6) {
    result = "Better not tell you now.";
} else if (num===7) {
    result = "Cannot predict now.";
} else if (num===8) {
    result = "Ask again later.";
} else if (num===9) {
    result = "Reply hazy. Try again.";
} else if (num===10) {
    result = "Concentrate and ask again.";
} else if (num===11) {
    result = "Outlook good.";
} else if (num===12) {
    result = "Most likely.";
} else if (num===13) {
    result = "Signs point to yes.";
} else if (num===14) {
    result = "As I see it, yes.";
} else if (num===15) {
    result = "Yes.";
} else if (num===16) {
    result = "You may rely on it.";
} else if (num===17) {
    result = "Without a doubt.";
} else if (num===18) {
    result = "Yes, definitely.";
} else if (num===19) {
    result = "It is decidely so.";
} else if (num===20) {
    result = "It is certain.";
}
    document.getElementById("result").textContent = result;
    // find element with id="result" and set visible text to assigned response to 'result'.
    // '.textContent' sets plain text only (as opposed to innerHTML)
    btn.removeEventListener("animationend", onShakeEnd);
    // Removes this exact event listener from the button after it runs once.
  });
}
