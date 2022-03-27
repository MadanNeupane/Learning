const form = document.querySelector('form');
const card = document.querySelector('.card');
const weatherImg = document.querySelector('.weather-img');
const weatherDetails = document.querySelector('.weather-details');

const updateCity = async(city) =>{
    const cityInfo = await getCity(city);
    const cityWeather = await getWeather(cityInfo.Key);

    return {cityInfo, cityWeather};
}

const updateUI = (data) =>{

    const {cityInfo, cityWeather} = data;

    const imgSource =  cityWeather.IsDayTime ? 'imgs/day.svg' : 'imgs/night.svg';
    weatherImg.setAttribute('src', imgSource);

    weatherDetails.innerHTML = `
    <h2 class="city-name">${cityInfo.EnglishName}, ${cityInfo.Country.EnglishName}</h2>
    <img class="weather-icon" src="imgs/icons/${cityWeather.WeatherIcon}.svg" alt="${cityWeather.WeatherText}">
    <p class="weather-condition">${cityWeather.WeatherText}</p>
    <h1 class="weather-temp">${cityWeather.Temperature.Metric.Value} &deg;c</h1>
    `;

    card.classList.remove('hidden');
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const city = form.city.value.trim();
    updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
})
