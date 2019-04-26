// const data = [
// 	{"model": "amp_stories.detourelement", 
// 	"pk": 6, 
// 	"fields": 
// 		{"story": 4, 
// 		"type": "detour_video", 
// 		"position": 0, 
// 		"detour_video": "stories/title/detourelement/RP3.mp4", 
// 		"detour_scroller_text": ""}
// 	}, 

// 	{"model": "amp_stories.detourelement", 
// 	"pk": 8, 
// 	"fields": 
// 		{"story": 4, 
// 		"type": "detour_scroller", 
// 		"position": 1, 
// 		"detour_video": "", 
// 		"detour_scroller_text": "<p>&ldquo;Welcome to La 72! We have only three rules here:</p><ol><li>No violence &ndash; neither verbal, nor physical; whether against men, women, minors or people of diverse sexual preferences.</li><li>No business &ndash; all our services are completely free and you can stay here as long as you need. No one within these walls is permitted to sell anything, including their services as a guide&hellip; [this part is to avoid &lsquo;coyotes&rsquo;, people-smugglers]</li><li>No alcohol or drugs &ndash; and you cannot enter under the influence of either</li></ol><p>For security, our gates are always manned and only open 9am-1pm and 2.30-6pm. The only exception is when the train approaches&hellip; the guards always keep watch and when they hear the train approaching they will shout &ldquo;&iexcl;EL TREN!&rdquo; or &ldquo;&iexcl;LA BESTIA!&rdquo;</p>"}
// 	},
    
// const data = [
// 	{"model": "amp_stories.detourelement", 
// 	"pk": 9, 
// 	"fields": {"story": 4, 
// 		"type": "detour_map", 
// 		"position": 2, 
// 		"detour_video": "", 
//         "detour_scroller_text": ""}
//     },
// ];

// const subData = [

// ]



// SIZING THE DETOUR VIEW HIEGHT FOR THE WINDOW
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

window.addEventListener('resize', () => {
    // Same script as before on resize
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
});

// DETOUR HANDLING

let detourTriggers = document.getElementsByClassName("detour-trigger");
let detourButtons = document.getElementsByClassName("detour-button");
let detourContainers = document.getElementsByClassName("detour-container");
let detourReturn = document.getElementById("detour-return");
let detourRestart = document.getElementById("detour-restart");
let returnRing = document.getElementsByClassName("return-ring")[0];
let ring = document.getElementById("ring");

//LOCAL
// let mediaPrefix = "/media/"
//PRODUCTION
// let mediaPrefix = 'https://frame-v-media-django.s3.amazonaws.com/'

//DATA HANDLING
let active, mySwiper;
// const data = JSON.parse(document.getElementById("detours").value);
// const subData = JSON.parse(document.getElementById("subDetours").value)

// ADD EVENT LISTENERS FOR THE DETOUR TRIGGER BUTTONS AND EFFECTS TO THE RETURN BUTTON ON VIDEO END

for (let i = 0; i < detourTriggers.length; i++) {
    detourTriggers[i].id = "trigger"+i;
    detourButtons[i].addEventListener("click", detourLaunch);
};

function detourLaunch(event) {
    document.getElementById('DetourLanding').scrollIntoView({behavior:"smooth"});
    //gets the id number of which component should activate
    active = event.target.id.slice(-1);
    console.log(active)
    if (detourContainers[active].classList.contains("video")) {
        videoCreate();
    } else if (detourContainers[active].classList.contains("scroller")) {
        scrollerCreate();
    } else if (detourContainers[active].classList.contains("swiper")) {
        swiperCreate();
    } else if (detourContainers[active].classList.contains("map")) {
        mapCreate();
    }
}

//THE CREATE FUNCTIONS FOR THE VARIOUS ASSETS
function videoCreate() {
    detourContainers[active].style.display = "block";
    let video = detourContainers[active].children[0];
    let spinner = document.createElement("DIV");
    spinner.classList.add("loader");
    detourContainers[active].appendChild(spinner);
    // let video = document.createElement("VIDEO");
    // detourContainers[active].appendChild(video);
    // video.classList.add("detour-vid");
    // video.src = (mediaPrefix + data[active].fields.detour_video);
    // video.onloadstart = function() {
    //     let spinner = document.createElement("DIV");
    //     spinner.classList.add("loader");
    //     detourContainers[active].appendChild(spinner);
    // };
    // video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    // video.setAttribute('playsinline', '');
    video.play();
    video.onplaying = (event) => {
        if (document.getElementsByClassName("loader")[0]) {
            detourContainers[active].removeChild(document.getElementsByClassName("loader")[0]);
        }
        video.style.display = "block";
    };

    // video.oncanplay = function() {
    //     detourContainers[active].removeChild(spinner);
    //     video.style.display = "block";
    //     video.play();
    // }
    video.addEventListener("ended", event => {
            returnRing.id = "ring";
        })
}

function scrollerCreate() {
    detourContainers[active].style.display = "block";
    detourRestart.style.display = "none";
    detourContainers[active].insertAdjacentHTML("beforeend", data[active].fields.detour_scroller_text);
}

function swiperCreate() {
    let container = detourContainers[active]
    container.style.display = "block";
    detourRestart.style.display = "none";

    let swipeContainer = document.createElement("DIV");
    swipeContainer.classList.add("swiper-container");
    container.insertBefore(swipeContainer, container.firstChild)
    let wrapper = document.createElement("DIV");
    wrapper.classList.add("swiper-wrapper");
    swipeContainer.appendChild(wrapper)
    
    // Build slides
    let fragment = document.createDocumentFragment();
    let slide, flex, content;
    filteredSlideData = subData.filter(x => (x.fields.detour === data[active].pk))
    filteredSlideData.forEach(function(element){
        slide = document.createElement("DIV");
        slide.classList.add("swiper-slide");
        flex = document.createElement("DIV");
        flex.classList.add("swiper-flex");
        if (element.fields.swiper_image === "") {
            content = document.createElement("DIV");
            content.classList.add("swiper-text");
            content.insertAdjacentHTML("beforeend", element.fields.swiper_slide)
        } else {
            content = document.createElement("IMG");
            content.classList.add("swiper-image");
            content.src = (element.fields.swiper_image);
        }
        slide.appendChild(flex);
        flex.appendChild(content);
        fragment.appendChild(slide)
    });

    //Append to the wrapper
    wrapper.appendChild(fragment);

    // //Add the navigation tools
    let toolFragment = document.createDocumentFragment();
    let pagination = document.createElement("DIV");
    let swiperLeft = document.createElement("DIV");
    let swiperRight = document.createElement("DIV");
    let scrollbar = document.createElement("DIV");
    pagination.classList.add("swiper-pagination");
    swiperLeft.classList.add("swiper-button-prev", "swiper-button-white");
    swiperRight.classList.add("swiper-button-next", "swiper-button-white");
    scrollbar.classList.add("swiper-scrollbar");

    toolFragment.appendChild(pagination);
    toolFragment.appendChild(swiperLeft);
    toolFragment.appendChild(swiperRight);
    toolFragment.appendChild(scrollbar);
    container.appendChild(toolFragment);

    //TURN INTO A SWIPER
    mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
    });
}

function mapCreate(){
    //Set up map container
    detourContainers[active].style.display = "block";
    detourRestart.style.display = "none";
    let map = document.createElement("DIV");
    map.id = "detourMap"
    detourContainers[active].appendChild(map);

    //Initialize map =>
    var mapInit = L.map('detourMap').setView([19.241534, -98.999796], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidG9teGJhcm5lc3giLCJhIjoiY2p1OTJsZDEwMXI1ajN5bzJ4NDhhNzVkcCJ9.EV4112N91Zp7z0tOS-bazg'
    }).addTo(mapInit);

    let wayz = [
        L.latLng(15.504509, -88.024840),
        L.latLng(17.258365, -90.984482),
        L.latLng(19.346606, -98.961627),
        L.latLng(25.767529, -100.294431),
        L.latLng(26.927774, -101.455629),
        L.latLng(28.695498, -100.517013),
    ]

    L.Routing.control({
        waypoints: wayz,
        show: false,
        draggableWaypoints: false,
        addWaypoints: false,
      }).addTo(mapInit);

    L.marker([15.504509, -88.024840]).addTo(mapInit).bindPopup("<b>San Pedro Sula</b><br>Where Johnny began his journey.")
    L.marker([15.591705, -88.369946]).addTo(mapInit).bindPopup("<b>Corinto</b><br>Guatamalan border city where Johnny told police he was fetching a motorcycle part.")
    L.marker([17.258365, -90.984482]).addTo(mapInit).bindPopup("<img src='./images/Launch.jpg'>")
    var marker4 = L.marker([17.459883, -91.433157]).addTo(mapInit);
    var marker5 = L.marker([19.346606, -98.961627]).addTo(mapInit);
    var marker6 = L.marker([25.767529, -100.294431]).addTo(mapInit);
    var marker7 = L.marker([26.927774, -101.455629]).addTo(mapInit);
    var marker8 = L.marker([28.695498, -100.517013]).addTo(mapInit);
    marker8.bindPopup("<b>Piedras Negras</b><br>Where Johnny planned to cross the U.S. - Mexico border.");


}

function videoDestroy() {
    detourContainers[active].style.display = "none";
    video = document.getElementsByClassName("detour-vid")[0];
    detourContainers[active].removeChild(video);
}

function scrollerDestroy() {
    detourContainers[active].style.display = "none";
    detourRestart.style.display = "block";
    detourContainers[active].innerHTML = "";
}

function swiperDestroy(){
    if ( mySwiper !== undefined ) mySwiper.destroy(true, true);
    detourContainers[active].innerHTML = "";
    detourContainers[active].style.display = "none";
    detourRestart.style.display = "block";
}

// ADD EVENT LISTENER TO THE RETURN SCROLL

detourReturn.addEventListener("click", function(){
    document.getElementById('return-target').scrollIntoView({behavior:"smooth"});
    
    if (detourContainers[active].classList.contains("video")){
        videoDestroy();
    } else if (detourContainers[active].classList.contains("scroller")) {
        scrollerDestroy();
    } else if (detourContainers[active].classList.contains("swiper")) {
        swiperDestroy(true, true)
    }
    if (returnRing.id == "ring") {
        returnRing.removeAttribute("id");
    }
})

// RESTART BUTTON EVENT LISTENER

detourRestart.addEventListener("click", function() {
    if (detourContainers[active].classList.contains("video")){
        document.getElementsByClassName("detour-vid")[0].currentTime = 0;
        if (returnRing.id == "ring") {
            returnRing.removeAttribute("id");
        }
    }
});










//OLD SCRIPTS


// // SIZING THE DETOUR VIEW HIEGHT FOR THE WINDOW

// let vh = window.innerHeight * 0.01;
// let vw = window.innerWidth * 0.01;
// document.documentElement.style.setProperty('--vh', `${vh}px`);
// document.documentElement.style.setProperty('--vw', `${vw}px`);

// window.addEventListener('resize', () => {
//     // Same script as before on resize
//     let vh = window.innerHeight * 0.01;
//     let vw = window.innerWidth * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//     document.documentElement.style.setProperty('--vw', `${vw}px`);
// });

// // DETOUR MULTIPLE VIDEO HANDLING

// let detourTriggers = document.getElementsByClassName("detour-trigger");
// let detourButtons = document.getElementsByClassName("detour-button");
// let detourVids = document.getElementsByClassName("detour-vid");
// let detourReturn = document.getElementById("detour-return");
// let detourRestart = document.getElementById("detour-restart");
// let returnRing = document.getElementsByClassName("return-ring")[0];
// let ring = document.getElementById("ring");
// let active;

// // ADD EVENT LISTENERS FOR THE DETOUR TRIGGER BUTTONS AND EFFECTS TO THE RETURN BUTTON ON VIDEO END

// for (let i = 0; i < detourTriggers.length; i++) {
//     detourButtons[i].id = "trigger"+i;
//     detourTriggers[i].addEventListener("click", event => {
//         document.getElementById('DetourLanding').scrollIntoView({behavior:"smooth"});
//         active = event.target.id.slice(-1);
//         detourVids[active].style.display = "block";
//         detourVids[active].play();
//     });
//     detourVids[i].addEventListener("ended", event => {
//         returnRing.id = "ring"
//     })
// };

// // ADD EVENT LISTENER TO THE RETURN SCROLL

// detourReturn.addEventListener("click", function(){
//     document.getElementById('return-target').scrollIntoView({behavior:"smooth"});
//     detourVids[active].pause();
//     detourVids[active].style.display = "none";
//     if (returnRing.id == "ring") {
//         returnRing.removeAttribute("id");
//     }
// })

// // RESTART BUTTON EVENT LISTENER

// detourRestart.addEventListener("click", function() {
//     detourVids[active].currentTime = 0;
//     if (returnRing.id == "ring") {
//         returnRing.removeAttribute("id");
//     }
// })