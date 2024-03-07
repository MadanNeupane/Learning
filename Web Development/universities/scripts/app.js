
const form = document.querySelector('form');
const uniSearch = form.universities;
const country = form.country;
const cards = document.querySelector('.cards');
const dataResults = document.querySelector('.data-results');

const updateUI = (universities) => {

    cards.classList.remove('hidden');
    cards.innerHTML = '';
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

// country.addEventListener('change', e => {
//     let countryFilter = e.target.value.trim().toLowerCase();
//     return countryFilter;
// })

const searchUni = () => {
    let inputValue = uniSearch.value.trim().toLowerCase();
    let countryFilter = country.value.trim().toLowerCase();
    let resultText = countryFilter ? ` in ${countryFilter}` : '';
    if (inputValue != ''){
        getUniversities({searchInput : inputValue, countryName: countryFilter})
        .then(data => {
            if (data.length>0) {
                updateUI(data.slice(0, 20));
                if (data.length>20) {
                    dataResults.classList.remove('hidden');
                    cards.dataResults = '';
                    dataResults.innerHTML = `<p>${data.length} Results found for "<strong>${inputValue}</strong>"${resultText}. Showing first 20 results.</p>`;
                }

            } else {
                dataResults.classList.remove('hidden');
                dataResults.innerHTML = `<p>No results found.</p>`;
                cards.innerHTML = '';
            }
        })
        .catch(err => {
            dataResults.classList.remove('hidden');
            dataResults.innerHTML = `<p>${err.message}</p>`;
        });
    } else{
        dataResults.classList.add('hidden');
    }
}

