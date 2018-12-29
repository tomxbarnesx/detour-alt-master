// var imageClicker = document.getElementById("detour-img");

// imageClicker.addEventListener("click", function() {
//     console.log("I was clicked");
//     console.log(imageClicker.src);
//     if (imageClicker.src == "http://localhost:8889/src/images/propaganda.jpg") {
//         imageClicker.src = "http://localhost:8889/src/images/propaganda2.jpg";
//     } else {
//         imageClicker.src = "http://localhost:8889/src/images/propaganda.jpg";
//     }
// })

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let detourTrigger = document.getElementById("detour-trigger");
let detourVid = document.getElementById("detour-vid");
let detourReturn = document.getElementById("detour-return");
let detourRestart = document.getElementById("detour-restart");

detourTrigger.addEventListener("click", function() {
    document.getElementById('DetourLanding').scrollIntoView(true);
    detourVid.play();
})

detourReturn.addEventListener("click", function(){
    document.getElementById('return-target').scrollIntoView(true);
    detourVid.pause();
})

detourRestart.addEventListener("click", function() {
    detourVid.currentTime = 0;
})
