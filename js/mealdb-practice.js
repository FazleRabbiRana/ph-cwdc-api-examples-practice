// hide error message on search initially
document.getElementById('error-message').style.display = 'none';

const searchFood = async () => {
	const searchField = document.getElementById('search-field');
	const searchText = searchField.value;

	// clear input
	searchField.value = '';

	// load data if search field not empty
	if (searchText == '') {
		document.getElementById('empty-search-alert').innerText = 'Please type something to search.';
	} else {
		document.getElementById('empty-search-alert').innerText = '';
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			displaySearchResult(data.meals);
		} catch (err) {
			displaySearchError(err);
		}
	}
};

// display error message on search
const displaySearchError = error => {
	document.getElementById('error-message').style.display = 'block';
	console.log(error);
};

// display search result
const displaySearchResult = meals => {
	const searchResultContainer = document.getElementById('search-result');

	// clear previous search result
	searchResultContainer.textContent = '';

	// show new search result
	if(meals) {
		meals.forEach(meal => {
			console.log(meal);
			const singleContainer = document.createElement('div');
			singleContainer.classList.add('col');
			const mealDetails = meal.strInstructions;
			let shortDetails = mealDetails;
			if(mealDetails.length > 80) {
				shortDetails = mealDetails.slice(0, 80) + '...';
			}
			singleContainer.innerHTML = `
			<div class="card h-100">
				<img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
				<div class="card-body">
					<h5 class="card-title">${meal.strMeal}</h5>
					<p class="card-text">${shortDetails}</p>
				</div>
				<div class="card-footer d-grid">
					<a href="#" onclick="loadMealDetails(${meal.idMeal})" role="button" class="btn btn-primary">See Details</a>
				</div>
			</div>
			`;
			searchResultContainer.appendChild(singleContainer);
		});
		// search result notice
		const notice = document.getElementById('result-notice');
		if(meals.length > 1) {
			notice.innerHTML = `<span class="text-warning">Found <span class="px-1 bg-warning text-white">${meals.length}</span> foods!</span>`;
		} else {
			notice.innerHTML = `<span class="text-warning">Found <span class="px-1 bg-warning text-white">1</span> food!</span>`;
		}
	} else {
		const notice = document.getElementById('result-notice');
		notice.innerHTML = `<span class="text-danger">Sorry, not found!</span>`;
	}
};

// load meal details
const loadMealDetails = async mealId => {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayMealDetails(data.meals[0]);
	} catch (error) {
		displayLoadDetailsError(error);
	}
}

// display load details error
const displayLoadDetailsError = error => console.log(error);

// display meal details
const displayMealDetails = meal => {
	console.log(meal);
	const mealDetailsContainer = document.getElementById('single-item-details');

	// clear previous details
	mealDetailsContainer.textContent = '';

	// show new details
	const heading = document.createElement('h4');
	heading.innerHTML = `<span class="d-block mb-3 text-center">Details: ${meal.strMeal}</span>`;
	mealDetailsContainer.appendChild(heading);
	const div = document.createElement('div');
	div.classList.add('card', 'p-4', 'mb-5', 'bg-white', 'shadow');
	div.innerHTML = `
		<img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
		<div class="card-body">
			<h5 class="card-title">${meal.strMeal}</h5>
			<p class="card-text">${meal.strInstructions}</p>
			<a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">See Video</a>
		</div>
	`;
	mealDetailsContainer.appendChild(div);
}
