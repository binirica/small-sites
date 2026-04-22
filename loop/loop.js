document.addEventListener("DOMContentLoaded", () => {
  const vInput = document.getElementById("verticalInput");
  const hInput = document.getElementById("horizontalInput");
  const grid = document.getElementById("grid");

  function createLayer(chars, type) {
  // 'chars' an array of individual characters to display (e.g. ['h','e','l','l','o'])
  // 'type'  either "v" (vertical) or "h" (horizontal), used to vary styling
    const layer = document.createElement("div");
    layer.className = "layer";

    const size = 200;

    for (let i = 0; i < size; i++) {
    // loops exactly 200 times (i goes from 0 to 199).
    // each iteration creates one visible character on screen
      const char = chars[i % chars.length] || " ";
      // selects which character to display at position 'i'.
      // 'i % chars.length' wraps around the array
      // if chars is ['a','b','c'], positions 0,1,2 get a,b,c
      // then position 3 wraps back to 'a', position 4 to 'b', and so on.
      // This tiles the user's text repeatedly to fill all 200 slots.
      // '|| " "' is a fallback — if the input is empty and chars[...] is
      // undefined, a plain space is used instead to avoid rendering "undefined".
      const span = document.createElement("span");
      span.textContent = char;
      // Sets the visible text of this span to the chosen character.

      const t = type === "v" ? i : i * 1.2;
      // 't' is a "timing" value used to drive all three style calculations below.
      // For vertical layers ("v"): t equals i directly (0, 1, 2, 3...)
      // For horizontal layers ("h"): t equals i * 1.2 (0, 1.2, 2.4, 3.6...)
      // Multiplying by 1.2 slightly offsets the horizontal layer's rhythm,
      // so the two layers don't visually sync up creating a layered depth effect.
      // '? :' means: IF type === "v" THEN use i, ELSE use i * 1.2.
      span.style.opacity = 0.4 + (t % 6) * 0.08;
      // 0 = invisible, 1 = fully visible
      // creates a gentle repeating wave of fading characters across the grid
      span.style.transform = `rotate(${(t % 6) - 3}deg)`;
      // slightly rotates each character by a value between -3 and +3 degrees.
      // '(t % 6)' gives 0–5, subtracting 3 centers it at -3 to +2.
      span.style.filter = `blur(${0.5 + (t % 3) * 0.4}px)`;
      // css blur to each character
      // 't % 3' cycles through 0, 1, 2, 0, 1, 2...
      // gives blur values of 0.5px, 0.9px, or 1.3px in repeating pattern

      layer.appendChild(span);
    }

    return layer;
  }

  function render() {
    grid.innerHTML = "";

    grid.appendChild(createLayer(vInput.value.split(""), "v"));
    // reads text from the vertical input
    // '.value' gets raw string (e.g. "hello").
    // '.split("")' breaks it into an array of individual characters (["h","e","l","l","o"]).
    // passes array to createLayer as the "v" (vertical) type, then
    // appends the returned layer div into the grid.
    grid.appendChild(createLayer(hInput.value.split(""), "h"));
  }

  vInput.addEventListener("input", render); //grid updates in real time without a button
  hInput.addEventListener("input", render);

  render();
});