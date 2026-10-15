const API_KEY = "3c819ffaaa28efd6abe08b5c0a325f6b";

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (API_KEY === "PASTE_YOUR_NEW_API_KEY_HERE") {
        message.textContent = "Please add your API key in script.js.";
        return;
    }

    message.style.color = "#b54747";
    message.textContent = "Loading weather...";
    weatherResult.hidden = true;

    const searchButton = weatherForm.querySelector("button");
    searchButton.disabled = true;

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check the spelling.");
            }

            if (response.status === 401) {
                throw new Error("API key invalid or not active yet.");
            }

            throw new Error("Unable to get weather. Please try again.");
        }

        const data = await response.json();

        const {
            name,
            sys,
            main,
            weather,
            wind: windData
        } = data;

        cityName.textContent = `${name}, ${sys.country}`;
        temperature.textContent = `${Math.round(main.temp)}°C`;
        description.textContent = weather[0].description;
        humidity.textContent = `${main.humidity}%`;
        wind.textContent = `${windData.speed} m/s`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherIcon.alt = weather[0].description;

        weatherResult.hidden = false;
        message.textContent = "";
    } catch (error) {
        message.textContent = error.message;
    } finally {
        searchButton.disabled = false;
    }
});