const preview = document.getElementById("preview");

const states = { //object as lookup table
  randomness: {
    bg: "linear-gradient(120deg, #8800ff, #ff3366)",
  },
  time: {
    bg: "linear-gradient(120deg, #e07a5f, #4f7a65)",
  },
  interaction: {
    bg: "linear-gradient(120deg, #0ff, #ff00ff)",
  },
  loop: {
    bg: "linear-gradient(120deg, #111, #444)",
  }
};

document.querySelectorAll(".tile").forEach(tile => {
  const key = tile.textContent.trim();

  tile.addEventListener("mouseenter", () => {
    const s = states[key];

    preview.style.background = s.bg;

    preview.style.transform = "scale(1.02)";
    preview.style.boxShadow = "0 0 20px rgba(255,255,255,0.08)";
  });

  tile.addEventListener("mouseleave", () => {
    preview.style.background = "rgba(255,255,255,0.02)";
    preview.style.transform = "scale(1)";
    preview.style.boxShadow = "none";
  });
});