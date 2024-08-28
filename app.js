const weatherForm = document.querySelector(".weatherForm");
const cityNameInput = document.querySelector(".cityInput");
const weatherDescriptionDisplay = document.querySelector(".card")
const myApiKey = "c95762b18e03e39a55fbd06e0f17b177";



weatherForm.addEventListener("submit", async event=>{

  event.preventDefault()
  const city = cityNameInput.value; 
  if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.log(error);
      dispalyError(error);
    }
  }else{
    dispalyError("Please Enter City Name")
  }
});

async function getWeatherData(city) {
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${myApiKey}`;


  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}`

  const response = await fetch(apiUrl);

  if(!response.ok){
    throw new Error("Could not fetch weather data")
  }
  else{
    return await response.json()
  }
}

function displayWeatherInfo(data){

 const{name: city, 
      main: {temp, humidity}, 
      weather: [{description, id}]} = data;
      
      weatherDescriptionDisplay.textContent = "";
      weatherDescriptionDisplay.style.display = "flex";

      const cityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");

      cityDisplay.textContent = city;
      tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
      humidityDisplay.textContent = `Humadity: ${humidity}%`;
      descDisplay.textContent = description;
      weatherEmoji.textContent = getWeatherEmoji(id);

      cityDisplay.classList.add("cityDisplay");
      tempDisplay.classList.add("tempDisplay");
      humidityDisplay.classList.add("humidityDisplay")
      descDisplay.classList.add("descDisplay")
      weatherEmoji.classList.add("weatherEmoji")


      weatherDescriptionDisplay.appendChild(cityDisplay);
      weatherDescriptionDisplay.appendChild(tempDisplay);
      weatherDescriptionDisplay.appendChild(humidityDisplay);
      weatherDescriptionDisplay.appendChild(descDisplay);
      weatherDescriptionDisplay.appendChild(weatherEmoji)

  
}
function getWeatherEmoji(weatherId){

  switch(true){
    case (weatherId >= 200 && weatherId < 300):
        return "⛈";
    case (weatherId >= 300 && weatherId < 400):
        return "⛈";
    case (weatherId >= 500 && weatherId < 600):
        return "⛈";
    case (weatherId >= 600 && weatherId < 700):
        return "❄";
    case (weatherId >= 700 && weatherId < 800):
        return "🌫";
    case (weatherId === 800):
        return "☀";
    case (weatherId >= 801 && weatherId < 810):
        return "☁";
    default:
        return "❓";
}

}

function dispalyError(message){
  const dispalyError = document.createElement("p");
  dispalyError.textContent = message;
  dispalyError.classList.add("errorDisplay");


  weatherDescriptionDisplay.textContent = "";
  weatherDescriptionDisplay.style.display = "flex"
  weatherDescriptionDisplay.appendChild(dispalyError)

}

