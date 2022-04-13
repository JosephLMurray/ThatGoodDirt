const startBtn = document.querySelector("#getStarted");
const submitBtn = document.getElementById('#submitBtn')
const getStarted = document.getElementById("getStarted");
// const formBlock = document.getElementById('#iBlock);

const mainForm = $("#iForm")


const formSubmitHandler = e => { 
    e.preventDefault();
    const city = $("#city").value.trim();
    const zip = $("#zipCode").value.trim();
    const state = $("#state").value.trim();
    const rangeKm = $("#rangeIn").value;
    const biking = getElementById('biking')
    const hiking = getElementById('hiking')


    if (zip !== '') {
        const addy = zip
    } else if (city !== '' && state !== '') {
        const addy = city + ' ' + state; 
    } else {
        const addy = ''; 
    }
    if (addy === '') { 
        alert("Please enter all values.")
    } if (biking && hiking ) { 
        const trails = 'hiking biking trails'; 
    } else if (biking){
        const trails = 'biking Trail'; 
    } else if (hiking) {
        const trails = "hiking trails"; 
    } else { 
        alert('You must select a trail type')
    }

    getGeoCode(addy); 
}











let secretKey;  
// This calls the API, just update the url to have your key's name.
const fetchKey = async() => {
    const apiKey = 'https://yorkieportunus.herokuapp.com/store/GoogleAPI'
    const response = await fetch(apiKey);
    const key = await response.json();
    return key;
    }
    // Call this wherever you need your key.
    fetchKey().then((key) => {
        secretKey = key.apiKey;
});

const getGeoCode = addy => {
    const geoAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${secretKey}`
    fetch(geoAPI)
        .then((response) => {
            if (response.ok) {
                console.log(response);
            response.json().then((data) => {
                const coords = data.results[0].geometry.location;
                getHikingTrails(coords.lat, coords.lng);})
            } else {
            console.error(response.statusText);
            }
        })
        .catch((error) => {
        console.error('Unable to connect to Google Maps', error);
        });
};

const getHikingTrails = (lat, lon) => {
    const radius = 5000;
    const proxyURL = `https://floating-headland-95050.herokuapp.com/`
    
    const placesAPI = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hiking trails&location=${lat} ${lon}&radius=${radius}&key=${secretKey}`
    fetch(proxyURL + placesAPI)
        .then((response) => {
            if (response.ok) {
                console.log(response);
            response.json().then((data) => {
                console.log(data);
                createCards(data.results);
            })
            } else {
            console.error(response.statusText);
            }
        })
        .catch((error) => {
        console.error('Unable to connect to Google Maps', error);
        });
};

const createCards = (results) => {
    let siteDeck = '';
    document.getElementById('happyTrails').innerHTML = siteDeck;
    for (let i = 0; i < results.length; i++) {
            siteDeck += `<div class="card w-96 glass">`+
    `<figure><img src="/assets/img/shutterstock_1810380595.jpg" alt="car!"></figure>`+
    `<div class="card-body">`+
    `<span class="text-3xl font-bold text-gray-900 dark:text-white">${results[i].name}</span>` +
        `<h2 class="card-title">${results[i].vicinity}</h2>`+
        `<div class="card-actions justify-end">`+
        `<div class="rating">`+
  `<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">`+
  `<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked>`+
  `<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">`+
  `<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">`+
  `<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">`+
    `</div>`+
        `<span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">${results[i].rating}</span>` +
        `<button class="btn btn-primary">Go Now!</button>` +

        `</div>`+
    `</div>`+
    `</div>`
    
    }
    document.getElementById('happyTrails').innerHTML += siteDeck;     

}



getStarted.addEventListener('click', (e) => {
    e.preventDefault();
    const formBlock = $("#iBlock"); 
    formBlock.removeClass('hidden');
    getStarted.classList.add('hidden');
    document.getElementById('hero').style.display= "none"
}); 

// mainForm.addEventListener('submit', formSubmitHandler);

