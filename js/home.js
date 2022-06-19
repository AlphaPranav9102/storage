console.clear();

const html = document.documentElement;
const canvas = document.getElementById("robotAnimationCanvas");
const animationSpace = document.getElementById("robotAnimationSpace");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth/2
canvas.height = window.innerHeight

var imageWidth;
var imageHeight;
var imageLeft;
var imageTop;
var resizing = true

function resize(event){
    canvas.width = window.innerWidth/2
    canvas.height = window.innerHeight
    imageWidth = Math.min(window.innerWidth*2/3, 1100)
    imageHeight = 1080*imageWidth/1920
    imageLeft = (canvas.width-imageWidth)/2
    imageTop = (canvas.height-imageHeight)/2
    //context.fillStyle = "rgb(0,0,0)";
    //context.fillRect(0, 0, canvas.width, canvas.height);
}


window.addEventListener('resize', resize);
resize(null)

const frameCount = 120;
const frameOffset = 20;
const currentFrame = index => (
    `/img/spinny_man/kestrel${index.toString().padStart(4, "0")}.png`
);

animationSpace.style.height = `${(window.innerHeight*3.25).toString()}px`

const images = []
const airpods = {
  frame: 1
};

for (let i = 1; i < frameCount; i += 2) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

document.addEventListener("scroll", (event) => {
    console.log(animationSpace.getBoundingClientRect().y)
    if(resizing == true){
        var multiplier = (window.pageYOffset+500)/(window.innerHeight+500)
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillStyle = "rgb(0,0,0)";
        //context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[0], (canvas.width-(imageWidth*multiplier))/2, imageTop*multiplier, imageWidth*multiplier, imageHeight*multiplier); 
    }
})

gsap.to(airpods, {
  frame: 59 + frameOffset,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.2
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;


function render() {
    if (airpods.frame > frameOffset){
        resizing = false
        if(animationSpace.getBoundingClientRect().y < 0){
            console.log("changed to fixed")
            canvas.style.position = "fixed"
            canvas.style.top = '0px'
            //document.getElementById("robotName").style.position = "fixed"
            //document.getElementById("robotName").style.top = `96px`
        }
        else if(animationSpace.getBoundingClientRect().y > 0){
            console.log("changed to relative")
            canvas.style.position = "relative"
            //document.getElementById("robotName").style.position = "relative"
        }
        try {
            context.drawImage(images[airpods.frame-frameOffset], imageLeft, imageTop, imageWidth, imageHeight);
            context.clearRect(0, 0, canvas.width, canvas.height);
 
            //context.fillStyle = "rgb(0,0,0)";
            //context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[airpods.frame-frameOffset], imageLeft, imageTop, imageWidth, imageHeight); 
        }
        catch (error) {
            context.drawImage(images[airpods.frame-1-frameOffset], imageLeft, imageTop, imageWidth, imageHeight); 
        }
    }
    else {
        console.log("resizing needed")
        resizing = true
    }
}

//format all the bottom text
//document.getElementById("intakeName").style.paddingTop = "400px";
document.getElementById("climberName").style.paddingTop = `${window.innerHeight*2/3}px`
document.getElementById("shooterName").style.paddingTop = `${window.innerHeight*2/3}px`
document.getElementById("drivetrainName").style.paddingTop = `${window.innerHeight*2/3}px`
document.getElementById("upcomingName").style.paddingTop = `${window.innerHeight*2/4}px`