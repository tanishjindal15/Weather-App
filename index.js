 const weather=document.querySelector("#weather");
 const cityinput=document.querySelector("#text");
 const card=document.querySelector("#display");
 const apikey="af303dbebe1a4056856e5f1142e496b1";
 

 weather.addEventListener("submit",async event=>
    {
        event.preventDefault();
        const city=cityinput.value;
        if(city)
            {
                try{
                    const weatherData= await getWeatherdata(city);
                    displayWeatherinfo(weatherData);
                }
                catch(error)
                {
                    console.error(error);
                    displayError(error);
                }
            }
            else{
                displayError("Please enter a valid Location")
            }
    }
 );
 cityinput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        weather.dispatchEvent(new Event("submit"));
    }
});


  async function getWeatherdata(city)
  {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error("Could not fetch data");
        }
        return await response.json();
  }


  function displayWeatherinfo(data)
  {
    const {name: city, main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humiDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const emojiDisplay=document.createElement("p");
    cityDisplay.textContent=city;
    card.appendChild(cityDisplay);
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("temperature");
    card.appendChild(tempDisplay);
    humiDisplay.textContent=`Humidity:${humidity}%`;
    humiDisplay.classList.add("humidity");
    card.appendChild(humiDisplay);
    descDisplay.textContent=description;
    descDisplay.classList.add("description");
    card.appendChild(descDisplay);
    emojiDisplay.textContent=getWeatherEmoji(id);
    emojiDisplay.classList.add("emoji");
    card.appendChild(emojiDisplay);
  }


  function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️"; 
    } else if (weatherId >= 300 && weatherId < 400) {
        return "🌦️"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️";
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; 
    } else if (weatherId === 800) {
        return "☀️"; 
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁️"; 
    } else {
        return "❓"; 
    }
}


  function displayError(message)
  {
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("error");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
  }