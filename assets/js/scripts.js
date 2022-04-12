

        
// This calls the API, just update the url to have your key's name.
async function fetchKey() {
const apiKey = 'https://yorkieportunus.herokuapp.com/store/GoogleAPI'
const response = await fetch(apiKey);
const key = await response.json();
return key;
}
// Call this wherever you need your key.
fetchKey().then((key) => {
    secretKey = key.apiKey;
    console.log(secretKey);
});
      
    