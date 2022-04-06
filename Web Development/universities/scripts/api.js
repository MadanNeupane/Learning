// Get University from API
const getUniversities = async (searchInput='', country='') =>{
    const URL = `http://universities.hipolabs.com/search?name=${searchInput}&country=${country}`;
    const response = await fetch(URL);
    const data = await response.json()
    // data.forEach(university => {
    //     const uniName = university.name;
    //     const country = university.country;
    //     const website = university.web_pages[0];
    //     const iso = university.alpha_two_code;
    //     console.log(uniName, country, website, iso);
    // });

    universities = data.slice(0, 20);
    return universities;
}