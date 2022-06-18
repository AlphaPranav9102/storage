const html = document.documentElement;
var robotCanvas = document.getElementById("robotAnimationCanvas")
var robotDiv = document.getElementById("robotAnimationDiv")
var prevY = robotDiv.getBoundingClientRect().y
const context = robotCanvas.getContext("2d");



const frameCount = 148;
const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

var scrollTop = 0

const img = new Image()
img.src = currentFrame(1);
robotCanvas.width = window.innerWidth/2
robotCanvas.height = window.innerHeight
img.onload=function(){
  context.drawImage(img, 0, 0, 800, 800);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0, 800, 800);
}

robotDiv.onwheel =  (event) => {
    console.log(robotDiv.getBoundingClientRect().y)
    if ((prevY > 0 && robotDiv.getBoundingClientRect().y < 0) || (prevY < 0 && robotDiv.getBoundingClientRect().y > 0)){
        console.log(scrollTop)
        scrollTop -= event.wheelDelta;
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(scrollFraction * frameCount),
        );
        if (147 > frameIndex && frameIndex >= 0){
            requestAnimationFrame(() => updateImage(frameIndex + 1))
            event.preventDefault()
        }
        else {
            scrollTop = 0
        }
    }
    else {
        scrollTop = 0
        prevY = robotDiv.getBoundingClientRect().y
    }
};

preloadImages()