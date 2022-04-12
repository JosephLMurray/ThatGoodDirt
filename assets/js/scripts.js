const apiKey = 'AIzaSyD1mZtud8Jal7Szr9WhsfOcw_DI4coig-E'       
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
    const geoAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${apiKey}`
    fetch(geoAPI)
        .then((response) => {
            if (response.ok) {
                console.log(response);
            response.json().then((data) => {
                console.log(data)});
            } else {
            console.error(response.statusText);
            }
        })
        .catch((error) => {
           console.error('Unable to connect to Open Weather', error);
        });
};

const getHikingTrails = (lat, lon) => {

}