const preview = document.getElementById("preview");

const states = {
  randomness: {
    bg: "linear-gradient(120deg, #ffcc00, #ff3366)",
    anim: "flicker"
  },
  time: {
    bg: "linear-gradient(120deg, #a3b18a, #d8b384)",
    anim: "slow"
  },
  interaction: {
    bg: "linear-gradient(120deg, #0ff, #ff00ff)",
    anim: "pulse"
  },
  loop: {
    bg: "linear-gradient(120deg, #111, #444)",
    anim: "grain"
  }
};

document.querySelectorAll(".tile").forEach(tile => {
  const key = tile.textContent.trim();

  tile.addEventListener("mouseenter", () => {
    const s = states[key];

    if (!s) return;

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