
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
    
    const placesAPI = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hiking trails&location=${lat} ${lon}&radius=${radius}&key=${secretKey}`
    fetch(placesAPI)
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

const apiKey = "AIzaSyD1mZtud8Jal7Szr9WhsfOcw_DI4coig-E";
const startBtn = document.querySelector("#getStarted");
const submitBtn = document.getElementById('#submitBtn')
const getStarted = document.getElementById("getStarted");












const formBlock = $("#iBlock"); 


getStarted.addEventListener('click', (e) => {
  e.preventDefault();
  formBlock.removeClass('hidden');
}); 

console.log("heelooo")

// submitBtn.addEventListener("click",getInfo())

