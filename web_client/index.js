import {initMap, addMarkersToMap, redIcon, blueIcon, yellowIcon, greenIcon} from './map.js';
import {fetchVeloData} from './recup_velo.js';
import {fetchRestaurantList, fetchRestaurantDetails} from './recup_restaurants.js';
import {fetchIncidentData} from "./recup_incidents.js";
import {fetchSchoolData} from "./recup_ecoles.js"; // Importer la nouvelle fonction

document.addEventListener('DOMContentLoaded', async () => {
	const map = initMap();

	// Récupérer les données des vélos et ajouter les marqueurs
	const veloCoordinates = await fetchVeloData();
	addMarkersToMap(map, veloCoordinates, redIcon, (station, marker) => {
		const popupContent = createVeloPopupContent(station);
		marker.bindPopup(popupContent).openPopup();
	});

	// Récupérer la liste des restaurants
	const restaurantList = await fetchRestaurantList();

	// Ajouter les marqueurs des restaurants sans les détails
	addMarkersToMap(map, restaurantList, blueIcon, async (restaurant, marker) => {
		const details = await fetchRestaurantDetails(restaurant.idResto);
		if (details) {
			const popupContent = createPopupContent(details);
			marker.bindPopup(popupContent).openPopup();
		}
	});

	// Récupérer les données des incidents et ajouter les marqueurs
	const incidentData = await fetchIncidentData();
	addMarkersToMap(map, incidentData, yellowIcon, (incident, marker) => {
		const popupContent = createIncidentPopupContent(incident);
		marker.bindPopup(popupContent);
		marker.on('click', () => {
			marker.openPopup();
		});
	});

	// Récupérer les données des établissements scolaires et ajouter les marqueurs
	const schoolData = await fetchSchoolData();
	addMarkersToMap(map, schoolData, greenIcon, (school, marker) => {
		const popupContent = createSchoolPopupContent(school);
		marker.bindPopup(popupContent);
	});
});

function createPopupContent(details) {
	return `
        <div style="width: 250px;">
            <img src="${details.imageUrl}" alt="Image du restaurant" style="width: 100%;">
            <h3>${details.nomResto}</h3>
            <p>Note: ${details.note}</p>
            <p>Adresse: ${details.adr}</p>
            <p>État: Ouvrir/Fermer</p>
            <p>Horaires: 12:00 - 14:00, 19:00 - 22:00</p>
            <button onclick="reserveRestaurant(${details.idResto})">RÉSERVER</button>
        </div>
    `;
}

function createVeloPopupContent(station) {
	return `
        <div style="width: 250px;">
            <h3>Station de Vélos</h3>
            <p>Adresse: ${station.address}</p>
            <p>Capacité: ${station.capacity} vélos</p>
        </div>
    `;
}

function createIncidentPopupContent(incident) {
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

function createSchoolPopupContent(school) {
	return `
        <div style="width: 250px;">
            <h3>${school.name}</h3>
            <p>Adresse: ${school.address}</p>
        </div>
    `;
}

// Fonction pour gérer la réservation (à implémenter)
function reserveRestaurant(idResto) {
	alert('Réservation pour le restaurant ' + idResto);
}
