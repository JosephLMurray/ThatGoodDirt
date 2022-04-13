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
        siteDeck += `<div class="basis-1/3">` +
                    `<div class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">` +
                    `<a href="#">` +
                    `<img class="p-8 rounded-t-lg" src="" alt="image from file" />` +
                    `</a>` +
                    `<div class="px-5 pb-5">` +
                    `<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${results[i].vicinity}</h5>` +
                    `<div class="flex items-center mt-2.5 mb-5">` +
                    `<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>` +
                    `<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>` +
                    `<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>` +
                    `<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>` +
                    `<svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>` +
                    `<span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">${results[i].rating}</span>` +
                    `</div>` +
                    `<span class="text-3xl font-bold text-gray-900 dark:text-white">${results[i].name}</span>` +
                    `</div>` +
                    `</div>` +
                    `</div>` +
                    `</div>`
    }
    document.getElementById('happyTrails').innerHTML += siteDeck;     
};
    










getStarted.addEventListener('click', (e) => {
    e.preventDefault();
    const formBlock = $("#iBlock"); 
    formBlock.removeClass('hidden');
    getStarted.classList.add('hidden');
    document.getElementById('hero').style.display= "none"
}); 

// mainForm.addEventListener('submit', formSubmitHandler);

