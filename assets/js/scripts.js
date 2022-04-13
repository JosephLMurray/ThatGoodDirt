const startBtn = document.querySelector("#getStarted");
const submitBtn = document.getElementById('#submitBtn')
const getStarted = document.getElementById("getStarted");
// const formBlock = document.getElementById('#iBlock);

const mainForm = $("#iForm")


const formSubmitHandler = e => { 
    e.preventDefault();
    const rangeKm = document.getElementById('rangeIn').value * 1000;
    const address = getAddress();
    let trails = chooseTrail();
    if (!address || !trails){ 
        alert("Please enter all values.")
        return;
    }
    getGeoCode(address, trails, rangeKm); 
}

const getAddress = () => {
    const city = document.getElementById('city').value?.trim();
    const zip = document.getElementById('zipCode').value?.trim();
    const state = document.getElementById('state').value?.trim();
    return zip !== '' ? zip : city && state ? city + ' ' + state : '';
}

const chooseTrail = () => {
    const biking = document.getElementById('biking')?.value;
    const hiking = document.getElementById('hiking')?.value;
    return biking && hiking ? 'hiking biking trails' : biking ? 'biking trails' : hiking ? 'hiking trails' : '';
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

const getGeoCode = (address, trails, rangeKm) => {
    const geoAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${secretKey}`
    fetch(geoAPI)
        .then((response) => {
            if (response.ok) {
                console.log(response);
            response.json().then((data) => {
                const coords = data.results[0].geometry.location;
                getHikingTrails(trails, rangeKm, coords.lat, coords.lng);})
            } else {
            console.error(response.statusText);
            }
        })
        .catch((error) => {
        console.error('Unable to connect to Google Maps', error);
        });
};

const getHikingTrails = (trails, rangeKm, lat, lon) => {
    const proxyURL = `https://floating-headland-95050.herokuapp.com/`
    
    const placesAPI = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${trails}&location=${lat} ${lon}&radius=${rangeKm}&key=${secretKey}`
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

