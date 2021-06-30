const setupspan = document.querySelector("#setup");
const punchlinespan = document.querySelector("#punchline");
const generateBtn = document.querySelector("#generatejoke-btn");

const showpunchBtn = document.querySelector("#showpunch-btn");

let jokes = [];
let index = 0;
let firstJoke = true;
const loadJoke = () => {
    if(jokes.length !== 0) {
        setupspan.textContent = jokes[index].setup;
        punchlinespan.textContent = jokes[index].punchline;
        index++;
    }
}

// https://official-joke-api.appspot.com/random_joke
const getJokes = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://official-joke-api.appspot.com/random_ten");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            jokes = JSON.parse(request.responseText);
            // console.log(jokes);
            if(firstJoke) {
                loadJoke(); firstJoke = false; }
        }
            
    });

    request.send();
}


generateBtn.addEventListener("click",e => {
    punchlinespan.classList.add("blur");
    showpunchBtn.classList.remove("hide");
    loadJoke();
    if(index >= 10) { 
        getJokes();
        index = 0;
    }
    
});
showpunchBtn.addEventListener("click", ()=> {
    
    showpunchBtn.classList.add("hide");
    punchlinespan.classList.remove("blur");

});

getJokes();
