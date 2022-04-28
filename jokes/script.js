const setupspan = document.querySelector("#setup");
const punchlinespan = document.querySelector("#punchline");
const generateBtn = document.querySelector("#generatejoke-btn");

const showpunchBtn = document.querySelector("#showpunch-btn");

let jokes = [];
let index = 0;
let firstJoke = true;
const loadJoke = () => {
    if(jokes.length !== 0) {
        let currentJoke = jokes[index];

        switch(currentJoke.type) {
            case "single":
                document.querySelector("#punchline-wrap").style.display ="none";
                setupspan.textContent = currentJoke.joke;
                break;
            case "twopart":
                document.querySelector("#punchline-wrap").style.display ="block";
                setupspan.textContent = jokes[index].setup;
                punchlinespan.textContent = jokes[index].delivery;
                break;
        }                
        index++;
    }
}

// https://official-joke-api.appspot.com/random_joke
const getJokes = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist&amount=10");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let response = JSON.parse(request.responseText);
            if(!response.error) {
                jokes = response.jokes;
            } else {
                alert("API returned an error");
            }
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
