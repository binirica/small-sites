document.addEventListener("DOMContentLoaded", () => {
  const vInput = document.getElementById("verticalInput");
  const hInput = document.getElementById("horizontalInput");
  const grid = document.getElementById("grid");

  function createLayer(chars, type) {
    const layer = document.createElement("div");
    layer.className = "layer";

    const size = 200;

    for (let i = 0; i < size; i++) {
      const char = chars[i % chars.length] || " ";

      const span = document.createElement("span");
      span.textContent = char;

      const t = type === "v" ? i : i * 1.2;

      span.style.opacity = 0.4 + (t % 6) * 0.08;
      span.style.transform = `rotate(${(t % 6) - 3}deg)`;
      span.style.filter = `blur(${0.5 + (t % 3) * 0.4}px)`;

      layer.appendChild(span);
    }

    return layer;
  }

  function render() {
    grid.innerHTML = "";

    grid.appendChild(createLayer(vInput.value.split(""), "v"));
    grid.appendChild(createLayer(hInput.value.split(""), "h"));
  }

  vInput.addEventListener("input", render);
  hInput.addEventListener("input", render);

  render();
});