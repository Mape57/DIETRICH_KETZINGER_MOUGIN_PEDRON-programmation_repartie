import { initMap, addMarkersToMap } from './map.js';
import { redIcon, blueIcon, yellowIcon, greenIcon } from './mapIcons.js';
import { createPopupContent, createVeloPopupContent, createIncidentPopupContent, createSchoolPopupContent, reserveRestaurant } from './popupContent.js';
import { fetchVeloData } from './recup_velo.js';
import { fetchRestaurantList, fetchRestaurantDetails } from './recup_restaurants.js';
import { fetchIncidentData } from "./recup_incidents.js";
import { fetchSchoolData } from "./recup_ecoles.js";
import { fetchMeteo } from "./script/recuperation/recup_meteo";
import { displayMeteo } from "./script/affichage/aff_meteo";
import {initMap, addMarkersToMap, redIcon, blueIcon, yellowIcon} from './map.js';
import {fetchVeloData} from './recup_velo.js';
import {fetchRestaurantList, fetchRestaurantDetails, fetchRestaurantHoraires} from './recup_restaurants.js';
import {fetchIncidentData} from "./recup_incidents.js";

const modal = document.getElementById('modal');

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
		// Récupérer la liste des restaurants
		const restaurantList = await fetchRestaurantList();

	// Ajouter les marqueurs des restaurants sans les détails
	addMarkersToMap(map, restaurantList, blueIcon, async (restaurant, marker) => {
		const details = await fetchRestaurantDetails(restaurant.idResto);
		if (details) {
			const popupContent = createPopupContent(details);
			marker.bindPopup(popupContent).openPopup();
			var button = document.getElementById('button');
			button.addEventListener('click', () => {
				console.log('POP UP : ajout du bouton');
				reserveRestaurant(button.name);
			});
		}
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

function createPopupContent(details) {
		return `
			<div style="width: 250px;">
				<img src="${details.imageUrl}" alt="Image du restaurant" style="width: 100%;">
				<h3>${details.nomResto}</h3>
				<p>Note: ${details.note}</p>
				<p>Adresse: ${details.adr}</p>
				<p>État: Ouvrir/Fermer</p>
				<p>Horaires: 12:00 - 14:00, 19:00 - 22:00</p>
				<button id="button" name=${details.idResto}>RÉSERVER</button>
			</div>
		`;
}
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

// On ouvre une fenêtre pour la réservation
async function reserveRestaurant(idResto) {
	console.log('Réservation du restaurant ' + idResto);
	const details = await fetchRestaurantDetails(idResto);

	console.log('Details du resto ' + idResto + ' : ' + details);

	modal.innerHTML = `
			<div class="modal-content">
				<span class="close-btn">&times;</span>
				<h2>Réserver pour ${details.nomResto}</h2>
				<p>Voici un calendrier représentant les horaires du restaurant</p>
				<div id="calendar">Calendrier de réservation</div>
				<div class="calendar">
        			<div class="controls">
            		<button onclick="previousWeek()">Précédent</button>
            		<span id="monthYear"></span>
            		<button onclick="nextWeek()">Suivant</button>
       			 	</div>
				<table>
        <thead>
            <tr>
                <th></th>
                <th>LUNDI</th>
                <th>MARDI</th>
                <th>MERCREDI</th>
                <th>JEUDI</th>
                <th>VENDREDI</th>
                <th>SAMEDI</th>
                <th>DIMANCHE</th>
            </tr>
        </thead>
        <tbody>
        	<tr>
                <td class="hour-cell">06H</td>
                <td class="checkbox-cell"><input type="checkbox" id="06LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="06DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">07H</td>
                <td class="checkbox-cell"><input type="checkbox" id="07LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="07DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">08H</td>
                <td class="checkbox-cell"><input type="checkbox" id="08LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="08DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">09H</td>
                <td class="checkbox-cell"><input type="checkbox" id="09LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="09DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">10H</td>
                <td class="checkbox-cell"><input type="checkbox" id="10LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="10DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">11H</td>
                <td class="checkbox-cell"><input type="checkbox" id="11LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="11DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">12H</td>
                <td class="checkbox-cell"><input type="checkbox" id="12LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="12DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">13H</td>
                <td class="checkbox-cell"><input type="checkbox" id="13LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="13DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">14H</td>
                <td class="checkbox-cell"><input type="checkbox" id="14LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="14DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">15H</td>
                <td class="checkbox-cell"><input type="checkbox" id="15LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="15DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">16H</td>
                <td class="checkbox-cell"><input type="checkbox" id="16LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="16DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">17H</td>
                <td class="checkbox-cell"><input type="checkbox" id="17LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="17DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">18H</td>
                <td class="checkbox-cell"><input type="checkbox" id="18LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="18DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">19H</td>
                <td class="checkbox-cell"><input type="checkbox" id="19LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="19DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">20H</td>
                <td class="checkbox-cell"><input type="checkbox" id="20LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="20DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">21H</td>
                <td class="checkbox-cell"><input type="checkbox" id="21LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="21DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">22H</td>
                <td class="checkbox-cell"><input type="checkbox" id="22LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="22DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">23H</td>
                <td class="checkbox-cell"><input type="checkbox" id="23LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="23DIMANCHE" checked disabled></td>
            </tr>
            <tr>
                <td class="hour-cell">00H</td>
                <td class="checkbox-cell"><input type="checkbox" id="00LUNDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00MARDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00MERCREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00JEUDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00VENDREDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00SAMEDI" checked disabled></td>
                <td class="checkbox-cell"><input type="checkbox" id="00DIMANCHE" checked disabled></td>
            </tr>
        </tbody>
    </table>
			</div>
			</div>
			`;

	modal.style.display = 'block';

	document.getElementsByClassName('close-btn')[0].addEventListener('click', () => {
		modal.style.display = 'none';
	});

	let dateJour = new Date();
	dateJour = dateJour.toISOString().split('T')[0];
	console.log('Date du jour : ' + dateJour);
	let jours = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
	let nbJour = 0;
	switch (new Date(dateJour).getDay()) {
		case 0:
			nbJour = 6;
			break;
		case 1:
			nbJour = 0;
			break;
		case 2:
			nbJour = 1;
			break;
		case 3:
			nbJour = 2;
			break;
		case 4:
			nbJour = 3;
			break;
		case 5:
			nbJour = 4;
			break;
		case 6:
			nbJour = 5;
			break;
		default:
			break;
	}
	console.log('Jour : ' + nbJour);

	var dispo = [];
	for (let i = nbJour; i < 7; i++) {
		dispo[i] = await fetchRestaurantHoraires(idResto, dateJour, 0);
		console.log('Disponibilité du ' + dateJour + 'du resto ' + idResto + ' : ' + dispo[i]);
		dateJour = new Date(dateJour);
		dateJour.setDate(dateJour.getDate() + 1);
		dateJour = dateJour.toISOString().split('T')[0];
	}

	// On change les cases du tableau en fonction des horaires
	for (let i = nbJour; i < 7; i++) {
		for (let j = 0; j < dispo[i].length; j++) {
			let heure = dispo[i][j].split('T')[1].split(':')[0];
			console.log('Heure traitée ' + heure);
			console.log('Jour traité ' + jours[i]);
			document.getElementById(heure + jours[i]).checked = false;
			document.getElementById(heure + jours[i]).disabled = false;
		}
	}
}
