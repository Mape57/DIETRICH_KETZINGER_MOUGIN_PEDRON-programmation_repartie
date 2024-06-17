import { initMap, addMarkersToMap, redIcon, blueIcon, yellowIcon } from './map.js';
import { fetchVeloData } from './recup_velo.js';
import { fetchRestaurantList, fetchRestaurantDetails } from './recup_restaurants.js';
import { fetchIncidentData } from './recup_incidents.js';

document.addEventListener('DOMContentLoaded', async () => {
	const map = initMap();

	// Récupérer les données des vélos et ajouter les marqueurs
	const veloCoordinates = await fetchVeloData();
	addMarkersToMap(map, veloCoordinates, redIcon);

	// Récupérer la liste des restaurants
	const restaurantList = await fetchRestaurantList();

	// Ajouter les marqueurs des restaurants sans les détails
	addMarkersToMap(map, restaurantList, blueIcon, async (restaurant, marker) => {
		const details = await fetchRestaurantDetails(restaurant.idResto);
		if (details) {
			const popupContent = createPopupContent(details);
			marker.bindPopup(popupContent);
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
});

function createPopupContent(details) {
	return `
        <div style="width: 250px;">
            <img src="https://via.placeholder.com/250" alt="Image du restaurant" style="width: 100%;">
            <h3>${details.nomResto}</h3>
            <p>Note: ${details.note}</p>
            <p>Adresse: ${details.adr}</p>
            <p>Coordonnées: ${details.coordonnees}</p>
            <p>État: Ouvrir/Fermer</p>
            <p>Horaires: 12:00 - 14:00, 19:00 - 22:00 ceci est un exemple a finir</p>
            <button onclick="reserveRestaurant(${details.idResto})">RÉSERVER</button>
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

// Fonction pour gérer la réservation (à implémenter)
function reserveRestaurant(idResto) {
	alert('Réservation pour le restaurant ' + idResto);
}
