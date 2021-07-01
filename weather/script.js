const key = '542a992edf78b8126d983704e380467e';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const iconBase = 'https://openweathermap.org/img/w/';

const form = document.querySelector("#location-form");
const image = document.querySelector("#dayimg");
const icon = document.querySelector("#icon");
const cityname = document.querySelector("#cityname");
const weatherinfo = document.querySelector("#weatherinfo");
const temp = document.querySelector("#temp");
const error = document.querySelector("#error");
const weatherCard = document.querySelector("#weather-card");

const getWeather = async (city) => {
    const query = `${baseUrl}q=${city}&appid=${key}&units=metric`;
    const response = await fetch(query);
    if (response.status !== 200)
        throw new Error("Location not found");
    return response.json();
}

const updateUI = weatherObj => {
    cityname.textContent = weatherObj.name;
    weatherinfo.textContent = weatherObj.info;
    temp.textContent = weatherObj.temp;
    icon.src = iconBase + weatherObj.icon + ".png";
    image.src = `./images/${(weatherObj.icon.includes("d")) ? "day.jpg" : "night.jpg"}`;
    weatherCard.classList.remove("invisible");
}
const showError = () => {
    error.classList.remove("hidden");
    error.style.animation = "bottomup .5s";
    error.style.animationFillMode = "forwards";

}

const hideError = () => {
    error.style.animation = "toptobottom .5s";
    setTimeout(() => error.classList.add("hidden"), 400);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = form.locationtxt.value.trim();
    if (city.length >= 1) {
        getWeather(city)
            .then(data => {
                const weather = {
                    name: data.name,
                    temp: data.main.temp,
                    info: data.weather[0].main,
                    icon: data.weather[0].icon
                };
                console.log(data);
                updateUI(weather);
            }).catch(err => {
                // console.error(err);
                showError();
            });
    }

});

document.querySelector("#close").addEventListener("click", e => {
    hideError();
});
