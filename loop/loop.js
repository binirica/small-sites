const vInput = document.getElementById("verticalInput");
const hInput = document.getElementById("horizontalInput");
const grid = document.getElementById("grid");

function createLayer(text, isVertical) {
  const layer = document.createElement("div");
  layer.className = "layer";

  const size = 200;

  for (let i = 0; i < size; i++) {
    const span = document.createElement("span");

    // pick a character (repeat text if needed)
    if (text.length > 0) {
      span.textContent = text[i % text.length];  // i % text.length makes the text repeat over and over
    } else {
      span.textContent = " "; // if no text, just show a space
    }

    // simple styling
    let t = i;
    if (!isVertical) {
      t = i * 1.2;
    }

    span.style.opacity = 0.4 + (t % 6) * 0.08;
    span.style.transform = "rotate(" + ((t % 6) - 3) + "deg)";
    span.style.filter = "blur(" + (0.5 + (t % 3) * 0.4) + "px)";

    layer.appendChild(span);
  }

  return layer;
}

function render() {
  grid.innerHTML = "";

  const vText = vInput.value;
  const hText = hInput.value;

  grid.appendChild(createLayer(vText, true));
  grid.appendChild(createLayer(hText, false));
}

vInput.addEventListener("input", render);
hInput.addEventListener("input", render);

render();