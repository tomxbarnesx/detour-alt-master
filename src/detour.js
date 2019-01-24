// SIZING THE DETOUR VIEW HIEGHT FOR THE WINDOW

let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

window.addEventListener('resize', () => {
    // Same script as before on resize
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
});

// DETOUR MULTIPLE VIDEO HANDLING

let detourTriggers = document.getElementsByClassName("detour-trigger");
let detourButtons = document.getElementsByClassName("detour-button");
let detourVids = document.getElementsByClassName("detour-vid");
let detourReturn = document.getElementById("detour-return");
let detourRestart = document.getElementById("detour-restart");
let returnRing = document.getElementsByClassName("return-ring")[0];
let ring = document.getElementById("ring");
let active;

// ADD EVENT LISTENERS FOR THE DETOUR TRIGGER BUTTONS AND EFFECTS TO THE RETURN BUTTON ON VIDEO END

for (let i = 0; i < detourTriggers.length; i++) {
    detourButtons[i].id = "trigger"+i;
    detourTriggers[i].addEventListener("click", event => {
        document.getElementById('DetourLanding').scrollIntoView({behavior:"smooth"});
        active = event.target.id.slice(-1);
        detourVids[active].style.display = "block";
        detourVids[active].play();
    });
    detourVids[i].addEventListener("ended", event => {
        returnRing.id = "ring"
    })
};

// ADD EVENT LISTENER TO THE RETURN SCROLL

detourReturn.addEventListener("click", function(){
    document.getElementById('return-target').scrollIntoView({behavior:"smooth"});
    detourVids[active].pause();
    detourVids[active].style.display = "none";
    if (returnRing.id == "ring") {
        returnRing.removeAttribute("id");
    }
})

// RESTART BUTTON EVENT LISTENER

detourRestart.addEventListener("click", function() {
    detourVids[active].currentTime = 0;
    if (returnRing.id == "ring") {
        returnRing.removeAttribute("id");
    }
})