
const form = document.querySelector('form');
const uniSearch = form.universities;
const country = form.country;
const cards = document.querySelector('.cards');

const updateUI = (universities) => {
    universities.forEach(university => {
        const uniName = university.name;
        const country = university.country;
        const website = university.web_pages[0];
        const iso = university.alpha_two_code;
        cards.innerHTML += `
        <div class="university card">
            <h3 class="university-name">${uniName}</h3>
            <div class="location">
                <h5 class="country">${country}</h5>
                <img class="country-flag" height="12px" src="imgs/flags/${iso}.svg" alt="${country}">
            </div>
            <a target="_blank" href="${website}" class="domain btn">More Info</a>
        </div>
        `
    });
}

uniSearch.addEventListener('keyup', () => {
    cards.classList.remove('hidden');
    let inputValue = uniSearch.value.trim().toLowerCase()
    cards.innerHTML = ''

    getUniversities(inputValue)
    .then(data => {
        if (data.length>0) {
            updateUI(data);
            console.log(`${data.length} results found`)
        } else {
            console.log('No results found');
        }
    })
    .catch(err => console.log(err));
})
