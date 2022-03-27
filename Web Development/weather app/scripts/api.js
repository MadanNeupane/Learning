const key = '3uqGqA0FI2FLZvZwyDs7ZkZmvoOkTY8t';
const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'


const getCity = async(input) => {
    const res = await fetch(`${base}?apikey=${key}&q=${input}`);
    const data = await res.json();
    return data[0];
}

const getWeather = async(id) => {
    const res = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`);
    const data = await res.json();
    return data[0];
}
