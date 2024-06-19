import {initMap, addMarkersToMap} from './script/affichage/map.js';
import {redIcon, blueIcon, yellowIcon, greenIcon} from './script/tools/mapIcons.js';
import {
	createVeloPopupContent,
	createIncidentPopupContent,
	createSchoolPopupContent, createRestaurantPopupContent
} from './script/affichage/aff_popup.js';
import {fetchVeloData} from './script/recuperation/recup_velo.js';
import {fetchRestaurantList} from './script/recuperation/recup_restaurants.js';
import {fetchIncidentData} from "./script/recuperation/recup_incidents.js";
import {fetchSchoolData} from "./script/recuperation/recup_ecoles.js";
import {fetchMeteo} from "./script/recuperation/recup_meteo";
import {displayMeteo} from "./script/affichage/aff_meteo";
import {RestaurantManager} from './script/tools/RestaurantManager.js';

document.addEventListener('DOMContentLoaded', () => {
	/*
	document.getElementById("toggleReport").addEventListener("click", () => {
		document.querySelectorAll("#controls > div").forEach((div) => {
			div.classList.toggle("hide");
		});
	});
	*/

	const map = initMap();

	Promise.all([
		initMeteo(),
		initRestaurants(map, fetchRestaurantList, blueIcon, createRestaurantPopupContent, 'toggleRestaurants', true),
		init(map, fetchVeloData, redIcon, createVeloPopupContent, 'toggleVelo'),
		init(map, fetchIncidentData, yellowIcon, createIncidentPopupContent, 'toggleIncidents'),
		init(map, fetchSchoolData, greenIcon, createSchoolPopupContent, 'toggleSchools'),
	]);
});

async function initMeteo() {
	const meteo = await fetchMeteo();
	displayMeteo(meteo);
}

async function initRestaurants(map, fetchFunction, icon, createPopupContentFunction, toggleId, showMarkers = false) {
	let markers = await init(map, fetchFunction, icon, createPopupContentFunction, toggleId, showMarkers);
	window.restaurantManager = new RestaurantManager(map, markers);
}

async function init(map, fetchFunction, icon, createPopupContentFunction, toggleId, showMarkers = false) {
	const toggle = document.getElementById(toggleId);

	const data = await fetchFunction();
	const markers = addMarkersToMap(map, data, icon, createPopupContentFunction);

	toggle.addEventListener('change', (e) => {
		toggleMarkers(map, markers, e.target.checked);
	});
	toggle.checked = showMarkers;
	toggleMarkers(map, markers, showMarkers);

	if (markers.length === 0) {
		toggle.disabled = true;
		toggle.nextElementSibling.style.cursor = 'not-allowed';
	}

	return markers;
}

function toggleMarkers(map, markers, show) {
	markers.forEach(marker => {
		if (show) {
			marker.addTo(map);
		} else {
			map.removeLayer(marker);
		}
	});
}