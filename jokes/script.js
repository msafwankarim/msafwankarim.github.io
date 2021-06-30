const setupspan = document.querySelector("#setup");
const punchlinespan = document.querySelector("#punchline");
const generateBtn = document.querySelector("#generatejoke-btn");

let jokes = [];
let index = 0;
// https://official-joke-api.appspot.com/random_joke
const getJokes = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://official-joke-api.appspot.com/random_ten");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            jokes = JSON.parse(request.responseText);
            console.log(jokes);
        }
            
    });

    request.send();
}

const loadJoke = () => {
    if(jokes.length !== 0) {
        setupspan.textContent = jokes[index].setup;
        punchlinespan.textContent = jokes[index].punchline;
        index++;
    }
}

generateBtn.addEventListener("click",e => {
    punchlinespan.classList.add("blur");
    loadJoke();
    if(index >= 10) { 
        getJokes();
        index = 0;
    }
    
});

punchlinespan.addEventListener("click", ()=> {
    punchlinespan.classList.remove("blur");
});

getJokes();
