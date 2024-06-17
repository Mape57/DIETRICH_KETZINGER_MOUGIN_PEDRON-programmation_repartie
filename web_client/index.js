import { initMap, addMarkersToMap } from './map.js';
import { redIcon, blueIcon, yellowIcon, greenIcon } from './mapIcons.js';
import { createPopupContent, createVeloPopupContent, createIncidentPopupContent, createSchoolPopupContent, reserveRestaurant } from './popupContent.js';
import { fetchVeloData } from './recup_velo.js';
import { fetchRestaurantList, fetchRestaurantDetails } from './recup_restaurants.js';
import { fetchIncidentData } from "./recup_incidents.js";
import { fetchSchoolData } from "./recup_ecoles.js";
import { fetchMeteo } from "./script/recuperation/recup_meteo";
import { displayMeteo } from "./script/affichage/aff_meteo";

document.addEventListener('DOMContentLoaded', async () => {
	const map = initMap();

	const meteo = await fetchMeteo();
	displayMeteo(meteo);

	let restaurantMarkers = [];
	let veloMarkers = [];
	let incidentMarkers = [];
	let schoolMarkers = [];

	const veloCoordinates = await fetchVeloData();
	veloMarkers = addMarkersToMap(map, veloCoordinates, redIcon, (coord) => createVeloPopupContent(coord));

	const incidentData = await fetchIncidentData();
	incidentMarkers = addMarkersToMap(map, incidentData, yellowIcon, (incident) => createIncidentPopupContent(incident));

	const schoolCoordinates = await fetchSchoolData();
	schoolMarkers = addMarkersToMap(map, schoolCoordinates, greenIcon, (school) => createSchoolPopupContent(school));

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

	function toggleMarkers(markers, show) {
		markers.forEach(marker => {
			if (show) {
				marker.addTo(map);
			} else {
				map.removeLayer(marker);
			}
		});
	}

	document.getElementById('toggleRestaurants').addEventListener('change', (e) => {
		toggleMarkers(restaurantMarkers, e.target.checked);
	});

	document.getElementById('toggleVelo').addEventListener('change', (e) => {
		toggleMarkers(veloMarkers, e.target.checked);
	});

	document.getElementById('toggleIncidents').addEventListener('change', (e) => {
		toggleMarkers(incidentMarkers, e.target.checked);
	});

	document.getElementById('toggleSchools').addEventListener('change', (e) => {
		toggleMarkers(schoolMarkers, e.target.checked);
	});

	document.getElementById('toggleRestaurants').checked = true;
	document.getElementById('toggleVelo').checked = false;
	document.getElementById('toggleIncidents').checked = false;
	document.getElementById('toggleSchools').checked = false;
	toggleMarkers(restaurantMarkers, true);
	toggleMarkers(veloMarkers, false);
	toggleMarkers(incidentMarkers, false);
	toggleMarkers(schoolMarkers, false);
});
