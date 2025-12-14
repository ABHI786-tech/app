
const apiKey = "f595339176e78a1c4fbf760b28063dea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector(".search input");
const button = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (!response.ok) {
    error.style.display = "block";
    weather.style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " km/h";

  const condition = data.weather[0].main;

  if (condition === "Clouds") icon.src = "images/cloudy.png";
  else if (condition === "Clear") icon.src = "images/sun.png";
  else if (condition === "Rain") icon.src = "images/rainy.png";
  else icon.src = "images/cloudy.png";

  weather.style.display = "block";
  error.style.display = "none";
}

button.addEventListener("click", () => {
  if (input.value.trim() !== "") checkWeather(input.value);
});


