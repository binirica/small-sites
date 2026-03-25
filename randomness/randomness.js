function handleClick() {
    const btn = document.getElementById("button");

    btn.classList.add("shake");

    btn.addEventListener("animationend", function onShakeEnd() {
        btn.classList.remove("shake");  
        btn.classList.add("triangle");   
    const num = Math.floor(Math.random() * 20) + 1;
    let result = "";

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
    cresult = "It is certain";
}
    document.getElementById("result").textContent = result;
    btn.removeEventListener("animationend", onShakeEnd); // remove listener
  });
}
