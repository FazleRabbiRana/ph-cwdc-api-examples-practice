const loadBuddies = () => {
	fetch('https://randomuser.me/api/?results=12')
		.then(res => res.json())
		.then(data => displayBuddies(data.results));
}
loadBuddies();

const displayBuddies = buddies => {
	// console.log(buddies);

	// show api location
	const apiUrl = `https://randomuser.me/`;
	const apiAnchorTag = document.getElementById('api-location');
	apiAnchorTag.innerHTML = `<cite>${apiUrl}</cite>`;
	apiAnchorTag.setAttribute('href', apiUrl);

	const allWrap = document.getElementById('buddies');
	buddies.forEach(buddy => {
		console.log(buddy);
		const card = document.createElement('div');
		card.classList.add('card', 'pt-3');
		card.innerHTML = `
			<img src="${buddy.picture.large}" class="img-fluid mx-auto rounded-circle shadow-sm" alt="${buddy.name.first}">
			<div class="card-body">
				<h5 class="card-title">${buddy.name.title} ${buddy.name.first} ${buddy.name.last}</h5>
				<p class="card-text">${buddy.location.city}, ${buddy.location.country}</p>
			</div>
		`;
		allWrap.appendChild(card);
	});
}