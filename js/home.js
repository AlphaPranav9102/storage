/*
var robotCanvas = document.getElementById("robotAnimationCanvas")
var robotDiv = document.getElementById("robotAnimationDiv")
var state = {
    imageTickCount : 2,
    prevY : robotDiv.getBoundingClientRect().y
}

robotCanvas.width = window.innerWidth/2
robotCanvas.height = window.innerHeight

var context = robotCanvas.getContext("2d");
context.fillStyle = "rgb(0,0,0)";
context.fillRect(0, 0, robotCanvas.width, robotCanvas.height);
context.stroke()

var img = new Image()
img.src = `/img/spinny_boi/${"1".toString().padStart(4, "0")}.png`
console.log(img.src)
img.onload=function(){
    context.drawImage(img, 0, 0, 1920/3, 1080/3);
    context.stroke()
}

robotDiv.onwheel = imageLoader

function imageLoader(event){
    console.log(event)
    console.log(state.imageTickCount, robotDiv.getBoundingClientRect().y)

    if((state.prevY >= 0 && robotDiv.getBoundingClientRect().y <= 0) && state.imageTickCount < 60){
        if(event.wheelDelta < 0){
            state.imageTickCount += 1
        }
        else {
            state.imageTickCount -= 1
        }
        event.preventDefault();
        img.src = `/img/spinny_boi/${state.imageTickCount.toString().padStart(4, "0")}.png`
        context.fillStyle = "rgb(0, 0, 0)"
        context.fillRect(0, 0, robotCanvas.width, robotCanvas.height)
        console.log(img.src)
        context.drawImage(img, 0, 0, 1920/3, 1920/3)
        
    }
    else {
        state.prevY = robotDiv.getBoundingClientRect().y
    }
}
*/

console.clear();

const canvas = document.getElementById("robotAnimationCanvas");
const animationSpace = document.getElementById("robotAnimationSpace");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var imageWidth = window.innerWidth*2/3
var imageHeight = 1080*imageWidth/1920

window.addEventListener('resize', function() {
    console.log("resized")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    imageWidth = window.innerWidth
    imageHeight = 1080*window.innerHeight/1920
});

const frameCount = 120;
const frameOffset = 25;
const currentFrame = index => (
    `/img/spinny_man/kestrel${index.toString().padStart(4, "0")}.png`
);

animationSpace.style.height = `${(window.innerHeight*3).toString()}px`

const images = []
const html = document.documentElement;
const airpods = {
  frame: 1
};

for (let i = 1; i < frameCount; i += 2) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(airpods, {
  frame: 59 + frameOffset,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.01
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;


function render() {
    if (airpods.frame > frameOffset){
        if(animationSpace.getBoundingClientRect().y < 0){
            canvas.style.position = "fixed"
            canvas.style.top = '0px'
        }
        else if(animationSpace.getBoundingClientRect().y > 0){
            canvas.style.position = "relative"
        }
        try {
            console.log(images[airpods.frame-frameOffset].src)
            context.drawImage(images[airpods.frame-frameOffset], 0, window.innerHeight/4, imageWidth, imageHeight); 
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgb(211,211,211)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[airpods.frame-frameOffset], 0, window.innerHeight/4, imageWidth, imageHeight); 
        }
        catch (error) {
            console.log(error)
            context.drawImage(images[airpods.frame-1-frameOffset], 0, window.innerHeight/4, imageWidth, imageHeight); 
        }
    }
}
