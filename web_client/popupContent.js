export function generateStars(rating) {
	const maxStars = 5;
	const stars = (rating / 2);
	const fullStars = Math.floor(stars);
	const halfStar = stars % 1 >= 0.5 ? 1 : 0;
	const emptyStars = maxStars - fullStars - halfStar;

	let starsHtml = '';

	for (let i = 0; i < fullStars; i++) {
		starsHtml += '<i class="fas fa-star" style="color: gold;"></i>';
	}

	if (halfStar) {
		starsHtml += '<i class="fas fa-star-half-alt" style="color: gold;"></i>';
	}

	for (let i = 0; i < emptyStars; i++) {
		starsHtml += '<i class="far fa-star" style="color: gold;"></i>';
	}

	return starsHtml;
}


export function createPopupContent(details) {
	const starsHtml = generateStars(details.note);
	return `
        <div style="width: 250px;">
            <img src="${details.imageUrl}" alt="Image du restaurant" style="width: 100%;">
            <h3>${details.nomResto}</h3>
            <div>Note: ${details.note}/10</div>
            <div>${starsHtml}</div>
            <p>Adresse: ${details.adr}</p>
            <p>État: Ouvrir/Fermer</p>
            <p>Horaires: 12:00 - 14:00, 19:00 - 22:00</p>
            <button onclick="reserveRestaurant(${details.idResto})">RÉSERVER</button>
        </div>
    `;
}

export function createVeloPopupContent(station) {
	return `
        <div style="width: 250px;">
            <h3>Station de Vélos</h3>
            <p style="text-align: justify">Adresse: ${station.address}</p>
            <p>Capacité: ${station.capacity} vélos</p>
        </div>
    `;
}

export function createIncidentPopupContent(incident) {
	return `
        <div style="width: 250px;">
            <h3>${incident.short_description}</h3>
            <p>${incident.description}</p>
            <p><b>Début:</b> ${incident.starttime}</p>
            <p><b>Fin:</b> ${incident.endtime}</p>
            <p><b>Localisation:</b> ${incident.location_description}</p>
        </div>
    `;
}

export function createSchoolPopupContent(school) {
	return `
        <div style="width: 250px;">
            <h3>${school.name}</h3>
            <p>Adresse: ${school.address}</p>
        </div>
    `;
}

export function reserveRestaurant(idResto) {
	alert('Réservation pour le restaurant ' + idResto);
}
