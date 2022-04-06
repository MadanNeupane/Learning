// Get University from API
const getUniversities = async ({searchInput='', countryName=''}) =>{
    const URL = `http://universities.hipolabs.com/search?name=${searchInput}&country=${countryName}`;
    const response = await fetch(URL);
    const data = await response.json()
    return data;
}