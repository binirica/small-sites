const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
const imgElement = document.getElementById("loopImage");

function changeImage() {
    // Generate random index between 0 and array length
    const randomIndex = Math.floor(Math.random() * images.length);
    imgElement.src = images[randomIndex];
}

// Loop every 3000ms (3 seconds)
setInterval(changeImage, 3000);