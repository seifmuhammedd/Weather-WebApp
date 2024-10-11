// Intializing Variables
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const userCity = document.querySelector(".City");
const cityDegree = document.querySelector(".degree");
const weatherImg = document.getElementById("weatherImg");
const weatherStatus = document.getElementById("weatherStatus");
const rain = document.getElementById("rain");
const wind = document.getElementById("wind");
const nextDay = document.querySelectorAll("#nextDay");
const windDirection = document.getElementById("direction");
const nextDayIcon = document.querySelectorAll(".next-img");
const nextDayHighTemp = document.querySelectorAll("#highDegree");
const nextDaySmallTemp = document.querySelectorAll("#smallDegree");
const nextDayStatus = document.querySelectorAll("#newStatus");

// Fetching Data

async function weatherForecast(city) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5b65996e148e4f39b49204321241010&q=${city}&days=3`,
    {
      method: "GET",
    }
  );
  let data = await response.json();
  return data;
}

// Displaying Current Day

function displayCurrentDay(data) {
  let date = new Date();
  currentDay.innerHTML = date.toLocaleDateString("en-us", { weekday: "long" });
  currentDate.innerHTML =
    date.getDate() + " " + date.toLocaleDateString("en-us", { month: "long" });
  userCity.innerHTML = data.location.name;
  cityDegree.innerHTML = data.current.temp_c;
  weatherImg.setAttribute("src", data.current.condition.icon);
  weatherStatus.innerHTML = data.current.condition.text;
  rain.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph;
  windDirection.innerHTML = data.current.wind_dir;
}

// Displaying Next Days

function DispalayNextDays(data) {
  let nextDays = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let date = new Date(nextDays[i + 1].date);
    nextDay[i].innerHTML = date.toLocaleDateString("en-us", {
      weekday: "long",
    });
    nextDayHighTemp[i].innerHTML = nextDays[i + 1].day.maxtemp_c;
    nextDaySmallTemp[i].innerHTML = nextDays[i + 1].day.mintemp_c;
    nextDayStatus[i].innerHTML = nextDays[i + 1].day.condition.text;
    nextDayIcon[i].setAttribute("src", nextDays[i + 1].day.condition.icon);
  }
}

// Real Time Search
searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value;
  startApp(searchValue);
});

// On Click Search
searchBtn.addEventListener("click", function () {
  let searchValue = searchInput.value;
  startApp(searchValue);
});

async function startApp(city = "cairo") {
  let weatherData = await weatherForecast(city);
  if (!weatherData.error) {
    displayCurrentDay(weatherData);
    DispalayNextDays(weatherData);
  }
}

startApp();
