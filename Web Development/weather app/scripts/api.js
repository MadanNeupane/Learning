const key = 'cZvyIywJCbGEuqs18A1dM0EJK21BveMB';
const base = 'https://dataservice.accuweather.com/locations/v1/cities/search'


const getCity = async(input) => {
    const res = await fetch(`${base}?apikey=${key}&q=${input}`);
    const data = await res.json();
    return data[0];
}

const getWeather = async(id) => {
    const res = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`);
    const data = await res.json();
    return data[0];
}
