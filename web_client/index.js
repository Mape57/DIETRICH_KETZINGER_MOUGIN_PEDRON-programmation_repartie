import {initMap, addMarkersToMap} from './script/affichage/map.js';
import {redIcon, blueIcon, yellowIcon, greenIcon} from './script/tools/mapIcons.js';
import {
	createPopupContent,
	createVeloPopupContent,
	createIncidentPopupContent,
	createSchoolPopupContent,
	afficherHoraires, generateStars
} from './script/tools/popupContent.js';
import {fetchVeloData} from './script/recuperation/recup_velo.js';
import {
	fetchRestaurantList,
	fetchRestaurantDetails,
	fetchRestaurantHours
} from './script/recuperation/recup_restaurants.js';
import {fetchIncidentData} from "./script/recuperation/recup_incidents.js";
import {fetchSchoolData} from "./script/recuperation/recup_ecoles.js";
import {fetchMeteo} from "./script/recuperation/recup_meteo";
import {displayMeteo} from "./script/affichage/aff_meteo";
import {RestaurantManager} from './script/tools/RestaurantManager.js';
import Handlebars from 'handlebars';


document.addEventListener('DOMContentLoaded', async () => {
	// TODO centrer la carte sur le point créé 

	document.getElementById("toggleReport").addEventListener("click", () => {
		document.querySelectorAll("#controls > div").forEach((div) => {
			div.classList.toggle("hide");
		});
	});

	const map = initMap();

	let restaurantMarkers = [];
	let veloMarkers = [];
	let incidentMarkers = [];
	let schoolMarkers = [];

	const [veloCoordinates, incidentData, schoolCoordinates, restaurantList, meteo] = await Promise.all([
		fetchVeloData(),
		fetchIncidentData(),
		fetchSchoolData(),
		fetchRestaurantList(),
		fetchMeteo()
	]);

	displayMeteo(meteo);

	veloMarkers = addMarkersToMap(map, veloCoordinates, redIcon, (coord) => createVeloPopupContent(coord));

	incidentMarkers = addMarkersToMap(map, incidentData, yellowIcon, (incident) => createIncidentPopupContent(incident));

	schoolMarkers = addMarkersToMap(map, schoolCoordinates, greenIcon, (school) => createSchoolPopupContent(school));

	restaurantMarkers = addMarkersToMap(map, restaurantList, blueIcon, (restaurant, marker) => {
		marker.on('click', async () => {
			fetchRestaurantDetails(restaurant.idResto).then(async details => {
				if (details) {
					let animate = !document.querySelector("#restaurantDetails, #addRestaurantForm");
					console.log(animate);
					details.note = generateStars(details.note);
					const detail_template = document.getElementById('detail_template');
					let detail = Handlebars.compile(detail_template.innerHTML);
					details.etatOuverture = await fetchRestaurantHours(details.idResto).then(({ouvert}) => ouvert ? "Ouvert" : "Fermé");
					document.getElementById('detail').innerHTML = detail(details);

					if (!animate) document.querySelector("#restaurantDetails").classList.add("show");
					else setTimeout(() => document.querySelector("#restaurantDetails").classList.add("show"), 10);
				}
			})
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

	function updateButtonState() {
		const buttons = [
			{id: 'toggleRestaurants', color: '#007bff'},
			{id: 'toggleVelo', color: '#dc3545'},
			{id: 'toggleIncidents', color: '#ffc107'},
			{id: 'toggleSchools', color: '#28a745'},
		];

		buttons.forEach(button => {
			const checkbox = document.getElementById(button.id);
			if (!checkbox) return;

			const label = checkbox.closest('label');
			if (!label) return;

			if (checkbox.checked) {
				label.style.borderColor = button.color;
			} else {
				label.style.borderColor = 'white';
			}
		});
	}

	document.getElementById('toggleRestaurants').addEventListener('change', (e) => {
		toggleMarkers(restaurantMarkers, e.target.checked);
		updateButtonState();
	});

	document.getElementById('toggleVelo').addEventListener('change', (e) => {
		toggleMarkers(veloMarkers, e.target.checked);
		updateButtonState();
	});

	document.getElementById('toggleIncidents').addEventListener('change', (e) => {
		toggleMarkers(incidentMarkers, e.target.checked);
		updateButtonState();
	});

	document.getElementById('toggleSchools').addEventListener('change', (e) => {
		toggleMarkers(schoolMarkers, e.target.checked);
		updateButtonState();
	});

	document.getElementById('toggleRestaurants').checked = true;
	document.getElementById('toggleVelo').checked = false;
	document.getElementById('toggleIncidents').checked = false;
	document.getElementById('toggleSchools').checked = false;
	toggleMarkers(restaurantMarkers, true);
	toggleMarkers(veloMarkers, false);
	toggleMarkers(incidentMarkers, false);
	toggleMarkers(schoolMarkers, false);

	// Initialiser le gestionnaire de restaurants
	window.restaurantManager = new RestaurantManager(map, restaurantMarkers);

	// Exposer la fonction afficherHoraires pour qu'elle soit accessible depuis le HTML
	window.afficherHoraires = afficherHoraires;

	updateButtonState();
});
