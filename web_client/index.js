import {initMap, addMarkersToMap, redIcon, blueIcon, yellowIcon} from './map.js';
import {fetchVeloData} from './recup_velo.js';
import {fetchRestaurantList, fetchRestaurantDetails} from './recup_restaurants.js';
import {fetchIncidentData} from "./recup_incidents.js";

document.addEventListener('DOMContentLoaded', async () => {
	const map = initMap();

	let restaurantMarkers = [];
	let veloMarkers = [];
	let incidentMarkers = [];

	// Récupérer les données des vélos et ajouter les marqueurs
	const veloCoordinates = await fetchVeloData();
	veloMarkers = addMarkersToMap(map, veloCoordinates, redIcon, (coord) => {createVeloPopupContent(coord)});

	// Récupérer les données des incidents et ajouter les marqueurs
	const incidentData = await fetchIncidentData();
	incidentMarkers = addMarkersToMap(map, incidentData, yellowIcon, (incident) => {createIncidentPopupContent(incident)});

	// Récupérer la liste des restaurants et ajouter les marqueurs
	const restaurantList = await fetchRestaurantList();
	restaurantMarkers = addMarkersToMap(map, restaurantList, blueIcon, (restaurant, marker) => {
		marker.on('click', async () => {
			const details = await fetchRestaurantDetails(restaurant.idResto);
			if (details) {
				const popupContent = createPopupContent(details);
				marker.bindPopup(popupContent).openPopup();
			}
		});
	});

	// Fonction pour afficher ou masquer les marqueurs
	function toggleMarkers(markers, show) {
		markers.forEach(marker => {
			if (show) {
				marker.addTo(map);
			} else {
				map.removeLayer(marker);
			}
		});
	}

	// Écouter les changements d'état des cases à cocher
	document.getElementById('toggleRestaurants').addEventListener('change', (e) => {
		toggleMarkers(restaurantMarkers, e.target.checked);
	});

	document.getElementById('toggleVelo').addEventListener('change', (e) => {
		toggleMarkers(veloMarkers, e.target.checked);
	});

	document.getElementById('toggleIncidents').addEventListener('change', (e) => {
		toggleMarkers(incidentMarkers, e.target.checked);
	});

	// Initial state: hide all markers
	document.getElementById('toggleRestaurants').checked = true;
	document.getElementById('toggleVelo').checked = false;
	document.getElementById('toggleIncidents').checked = false;
	toggleMarkers(restaurantMarkers, true);
	toggleMarkers(veloMarkers, false);
	toggleMarkers(incidentMarkers, false);
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

// Fonction pour gérer la réservation (à implémenter)
function reserveRestaurant(idResto) {
	alert('Réservation pour le restaurant ' + idResto);
}
