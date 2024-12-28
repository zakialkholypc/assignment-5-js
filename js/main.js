let firstPage = document.getElementById('nav-mmorpg-tab');
let secondPage = document.getElementById('nav-shooter-tab');
let thirdPage = document.getElementById('nav-sailing-tab');
let furthPage = document.getElementById('nav-permadeath-tab');
let fifthPage = document.getElementById('nav-superhero-tab');
let sixthPage = document.getElementById('nav-pixel-tab');
let searchIn = document.getElementById('search');

let loaderPade = document.getElementById('lodainglayer');
// ==================The first visit================
var x = "";
var y = "";
let games = '';
if (games == '') {
    getGames('mmorpg', '#nav-mmorpg .row');
    x = 'mmorpg'
    y = '#nav-mmorpg .row'
}

// ==================Changing the data================
firstPage.addEventListener('click', function () {
    getGames('mmorpg', '#nav-mmorpg .row');
    x = 'mmorpg'
    y = '#nav-mmorpg .row'
});
secondPage.addEventListener('click', function () {
    getGames('shooter', '#nav-shooter .row');
    x = 'shooter'
    y = '#nav-shooter .row'
});
thirdPage.addEventListener('click', function () {
    getGames('sailing', '#nav-sailing .row');
    x = 'sailing'
    y = '#nav-sailing .row'
});
furthPage.addEventListener('click', function () {
    getGames('permadeath', '#nav-permadeath .row');
    x = 'permadeath'
    y = '#nav-permadeath .row'
});
fifthPage.addEventListener('click', function () {
    getGames('superhero', '#nav-superhero .row');
    x = 'superhero'
    y = '#nav-superhero .row'
});
sixthPage.addEventListener('click', function () {
    getGames('pixel', '#nav-pixel .row');
    x = 'pixel'
    y = '#nav-pixel .row'
});


// ==================Getting Games================

async function getGames(games, elmkan) {
    // loaderPade.classList.remove('d-none');
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${games}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '85ecae3e5amsh2de483979f52115p1553a4jsn93740d9c74f5',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let arr2 = []
        let hambozo = searchIn.value;
        for (var i = 0; i < result.length; i++) {
            if (result[i].title.toLowerCase().includes(hambozo.toLowerCase())) {
                arr2.push(result[i])
            }
        };

        display(arr2, elmkan); //assigns the results and the (elmkan) to assign the place of the desplaying data

        loaderPade.classList.add('d-none');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// ========================== Getting Display of the Games =========================

function display(arr, hatElmkan) {
    let container = ``;
    for (let i = 0; i < arr.length; i++) {


        let shortdes = arr[i].short_description;
        if (shortdes.length > 50) {
            shortdes = shortdes.substring(0, 50) + '...';
        };// limitation f short description for the user interface
        // getting the id from the game for fetching the description
        container = container + `<div class="col-md-6 col-lg-4 col-xl-3 mb-4 thegamecont" onclick="getId(${arr[i].id})">
                                <div class="card shadow">
                                    <div class="p-3">
                                        <img src="${arr[i].thumbnail}" class="card-img-top" alt="${arr[i].title}">
                                        <div class="card-body px-0">
                                            <div class="tittle-game d-flex justify-content-between align-items-center">
                                                <h3 class="m-0">${arr[i].title}</h3>
                                                <button class="my-button">Free</button>
                                            </div>
                                            <p class="mb-0 hightdes">${shortdes}</p>
                                        </div>
                                    </div>
                                    <ul class="list-group list-group-flush py-1 my-card-des">
                                        <li class="list-group-itempb-1 py-1 px-2 d-flex justify-content-between">
                                            <a href="#"
                                                class="card-link text-decoration-none text-white">${arr[i].genre}</a>
                                            <a href="#"
                                                class="card-link text-decoration-none text-white">${arr[i].platform}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>`;


    }
    document.querySelector(hatElmkan).innerHTML = container // getting the place of the display by clicking the nave tabs 
};

// ======================Calling The Game Description=============================
let theDescription = document.getElementById('game-descreption');// the dscription layer container
async function getId(hatid) {
    loaderPade.classList.remove('d-none');//loading page
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${hatid}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8b7ee35b4amsh53210845cd9f136p1b06cfjsn41ee07f8efee',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displaydes(result);// getting the data of the game by id for the display
        loaderPade.classList.add('d-none');
        console.log(result);
    } catch (error) {
        console.error(error);
    }

};

// ============================Displaying the game Description============================
let theMainElement = document.getElementById('mainelemant');// to d-none the main page for user interface
function displaydes(kouddata) {
    let container = `
    <div class="pos-x">
        <span class="fa fa-x edite-x" onclick = "getclose()" id="closedes"></span>
    </div>
    <div class="col-md-5">
        <div class="left">
            <div class="destittle pb-4">
                Details Game
            </div>
            <div class="the-image">
                <img src="${kouddata.thumbnail}" class="w-100" alt="${kouddata.title}">
            </div>
        </div>
    </div>
    <div class="col-md-7">
        <div class="right d-flex flex-column gap-1">
            <h3>Title: <span>${kouddata.title}</span></h3>
            <div class="utili">
                <span>Category:</span>
                <span class="span-backgroun">${kouddata.genre}</span>
            </div>
            <div class="utili">
                <span>Platform:</span>
                <span class="span-backgroun">${kouddata.platform}</span>
            </div>
            <div class="utili">
                <span>Status:</span>
                <span class="span-backgroun">${kouddata.status}</span>
            </div>
            <p class="whole-des mt-2">
            ${kouddata.description}
            </p>
            <a href="${kouddata.game_url}" class="des-bttun text-decoration-none text-center">Show Game</a>
            <div class = "mb-5"></div>
        </div>
    </div>`;

    document.querySelector('#game-descreption .row').innerHTML = container;
    theMainElement.classList.add('d-none');
    theDescription.classList.remove('d-none');
}
// ===================Closing the Game Desciption===================
function getclose() {
    theDescription.classList.add('d-none');
    theMainElement.classList.remove('d-none');
}
// ========================For Design===============================
let srachBtn = document.getElementById('srachBtn');

srachBtn.addEventListener('click', function () {
    getGames(x, y);
});