const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
const imgElement = document.getElementById("loopImage");

function changeImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    imgElement.src = images[randomIndex];
}

setInterval(changeImage, 3000);