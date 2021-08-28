const loadCountries = () => {
	fetch('https://restcountries.eu/rest/v2/all')
		.then(res => res.json())
		.then(data => displayCountries(data));
}
loadCountries();

const displayCountries = countries => {
	const countriesContainer = document.getElementById('countries');
	countries.forEach(country => {
		const singleCountry = document.createElement('div');
		singleCountry.classList.add('country');
		singleCountry.innerHTML = `
			<h3>${country.name}</h3>
			<p><b>Capital:</b> ${country.capital}</p>
			<button onclick="loadCountryByName('${country.name}')" class="btn btn-success w-100">Details</button>
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
	const countryDetails = document.getElementById('country-detail');
	const languages = country.languages.map(language => language.name);
	const currencies = country.currencies.map(currency => currency.name);
	countryDetails.innerHTML = `
		<h4>${country.name}</h4>
		<img src="${country.flag}" alt="${country.name}" class="mt-1 mb-2">
		<p><b>Capital:</b> ${country.capital}</p>
		<p><b>Language:</b> ${languages.join(', ')}</p>
		<p><b>Currency:</b> ${currencies.join(', ')}</p>
	`;
}