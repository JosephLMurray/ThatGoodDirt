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
    getStarted.classList.add('hidden');
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
    // add i < 6 in for loop if we want 6 results....Rini
    for (let i = 0; i < results.length; i++) {
        const placeholder = 'Aap_uECRr6W4TkACwI2LRnFqeeayxAE6WV9YTObJqt6tCoI06xCqofy4PZ0-qbUMIyJhu2m47eblcXdEYM5NN-cWOl-K3WRTI2EPCBkbpq8mFNJHq67GKbsvlFRvN7FmSwnW-6Nr2W1IACBn2CWwBdSRPF4S3KYaqsjyN0qlRm5FiI-G7O2A';
        let image = results[i].photos ?? '';
        let images = image === '' ? placeholder : results[i].photos[0].photo_reference ;
        console.log(images);
        siteDeck += 
        `<div  class = "leading-normal min-w-full	h-full p-6	 ">`+
                `<a
                href=""
                class="relative block overflow-hidden bg-center bg-no-repeat bg-cover  rounded-xl"
                style="background-image: url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${results[i].photos[0].photo_reference}&key=${secretKey})"
            >`+
                `<span
                class="absolute z-10 inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-black rounded-full  right-4 top-4"
                >`+
                `${results[i].rating}`+
            
                `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-1.5 text-yellow-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >`+
                    `<path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />`+
                `</svg>`+
                `</span>`+
                `<div class="relative p-8 pt-40 text-white bg-black bg-opacity-40">`+
                ` <h5 class="text-xl	font-bold">${results[i].name}</h5>`+
            
                `<p class="text-sm">${results[i].vicinity}</p>`+
                `</div>`+
            `</a>`+
        `</div>`
    }
    document.getElementById('happyTrails').innerHTML += siteDeck;     

}

getStarted.addEventListener('click', (e) => {
    e.preventDefault();
    const formBlock = $("#iBlock"); 
    formBlock.removeClass('hidden');

}); 

// hide form after submit
$("#submitBtn").click(function(e) { 
    e.preventDefault();
    $("#iBlock").hide();
    // document.getElementById('hero').style.display = 'none';
});


$("#newSearch").click(function(e) {
    document.getElementById('iBlock').style.display = 'block';
})

