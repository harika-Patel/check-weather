const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="8c33075367c6c1b1be70aca62a7beba8";

weatherForm.addEventListener("submit",async event => {
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a city");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json(); // Parse the JSON from the response
        console.log(weatherData); // Log the weather data to the console
        return weatherData; // Return the weather data for further use
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}




function displayWeatherInfo(data){
    const{name: city,
        main : {temp,humidity},
        weather:[{description, id}]} = data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${((temp - 273.15)*(9/5)+32).toFixed(1)}F`;
    humidityDisplay.textContent=`Humidity: ${humidity}`;
    descDisplay.textContent=description;
    WeatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("weatherEmoji");
    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId<300):
            return '⛈️';
        case(weatherId>=300 && weatherId<400):
            return '🌧️';
        case(weatherId>=500 && weatherId<600):
            return '🌧️';
        case(weatherId>=600 && weatherId<700):
            return '❄️';
        case(weatherId>=700 && weatherId<800):
            return '🌫️';
        case(weatherId===800):
            return '☀️';
        case(weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return '🌳';

    }
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("error Display");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
    
}






