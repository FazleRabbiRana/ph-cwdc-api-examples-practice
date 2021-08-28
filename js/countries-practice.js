const loadCountries = () => {
	fetch('https://restcountries.eu/rest/v2/all')
		.then(res => res.json())
		.then(data => displayCountries(data));
}
loadCountries();

const displayCountries = countries => {
	// show api location
	const apiUrl = `https://restcountries.eu/`;
	const apiAnchorTag = document.getElementById('api-location');
	apiAnchorTag.innerHTML = `<cite>${apiUrl}</cite>`;
	apiAnchorTag.setAttribute('href', apiUrl);

	const countriesContainer = document.getElementById('countries');
	countries.forEach(country => {
		const singleCountry = document.createElement('div');
		singleCountry.classList.add('country');
		let capital = `${country.capital}`;
		if(capital == '') {
			capital = `<small class="text-danger fst-italic">Data not available</small>`;
		}
		singleCountry.innerHTML = `
			<div class="h-100 d-flex flex-column">
				<div class="flex-fill">
					<h3>${country.name}</h3>
					<p><b>Capital:</b> ${capital}</p>
				</div>
				<div class="">
					<button onclick="loadCountryByName('${country.name}')" class="btn btn-success w-100">Details</button>
				</div>
			</div>
		`;
		countriesContainer.appendChild(singleCountry);
	});
}

const loadCountryByName = name => {
	const url = `https://restcountries.eu/rest/v2/name/${name}`;
	fetch(url)
		.then(res => res.json())
		.then(data => showCountryDetails(data[0]));
}

const showCountryDetails = country => {
	console.log(country);
	const countryDetails = document.getElementById('country-detail');
	const languages = country.languages.map(language => language.name);
	const currencies = country.currencies.map(currency => currency.name);
	let capital = `${country.capital}`;
	if(capital == '') {
		capital = `<small class="text-danger fst-italic">Data not available</small>`;
	}
	countryDetails.innerHTML = `
		<h4>${country.name}</h4>
		<img src="${country.flag}" alt="${country.name}" class="mt-1 mb-2">
		<p><b>Capital:</b> ${capital}</p>
		<p><b>Language:</b> ${languages.join(', ')}</p>
		<p><b>Currency:</b> ${currencies.join(', ')}</p>
	`;
}