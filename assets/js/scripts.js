const startBtn = document.querySelector("#getStarted");
const submitBtn = document.getElementById('#submitBtn')
const getStarted = document.getElementById("getStarted");
// const formBlock = document.getElementById('#iBlock);
const formBlock = $("#iBlock"); 

const mainForm = $("#iForm")


function formSubmitHandler(e) { 
    e.preventDefault();

    const city = cityName.value.trim();
    const zip = zipCode.value.trim();
    const trail = trailType.value.trim();
    const state = stateName.value.trim();
    const rangeKm = range.value.trim();

        if (city, zip, trail, state, rangeKm) { 
            getHikingTrails(); 
                city.value = "";
                zip.value = "";
                trail.value = "";
                state.value = "";
                rangeKm.value = "";
        } else {
            alert("Please enter all values.")
        }
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
                console.log(data);;})
            } else {
            console.error(response.statusText);
            }
        })
        .catch((error) => {
        console.error('Unable to connect to Google Maps', error);
        });
};












getStarted.addEventListener('click', (e) => {
  e.preventDefault();
  formBlock.removeClass('hidden');
  getStarted.classList.add('hidden');
}); 

console.log("heelooo")

// submitBtn.addEventListener("click",getInfo())

