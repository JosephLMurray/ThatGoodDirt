const apiKey = "AIzaSyD1mZtud8Jal7Szr9WhsfOcw_DI4coig-E";
const startBtn = document.querySelector("#getStarted");
const submitBtn = document.getElementById('#submitBtn')
const getStarted = document.getElementById("getStarted");
// const formBlock = document.getElementById('#iBlock);
const formBlock = $("#iBlock"); 














getStarted.addEventListener('click', (e) => {
  e.preventDefault();
  formBlock.removeClass('hidden');
}); 

console.log("heelooo")

// submitBtn.addEventListener("click",getInfo())