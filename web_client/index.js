import { initMap, addMarkersToMap } from './map.js';
import { redIcon, blueIcon, yellowIcon, greenIcon } from './mapIcons.js';
import { createPopupContent, createVeloPopupContent, createIncidentPopupContent, createSchoolPopupContent } from './popupContent.js';
import { fetchVeloData } from './recup_velo.js';
import { fetchIncidentData } from "./recup_incidents.js";
import { fetchSchoolData } from "./recup_ecoles.js";
import { fetchMeteo } from "./script/recuperation/recup_meteo";
import { displayMeteo } from "./script/affichage/aff_meteo";
import {fetchRestaurantList, fetchRestaurantDetails, fetchRestaurantHoraires} from './recup_restaurants.js';

const modal = document.getElementById('modal');

document.addEventListener('DOMContentLoaded', async () => {

	const map = initMap();

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
				var button = document.getElementById('reserveButton');
				console.log('POP UP : ajout du bouton' + button.name);
				button.addEventListener('click', () => {
					console.log('EVENTLISTENER');
					reserveRestaurant(button.name);
				});
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


// On ouvre une fenêtre pour la réservation
	async function reserveRestaurant(idResto) {
		console.log('Réservation du restaurant ' + idResto);
		const details = await fetchRestaurantDetails(idResto);
		var nom;
		var prenom;
		var tel;
		var nbConviv;
		var dateReserv;
		var heureReserv;

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
    <div class="form">
    		<tr>Nom : </tr>
    		<input type="text" id="Nom">
    		<tr>Prénom : </tr>
            <input type="text" id="Prénom">
            <tr>Numéro de téléphone : </tr>
            <input type="number" id="Numéro de téléphone" min="10" max="9999999999">
            <tr>Nombre de convives : </tr>
            <input type="number" id="Nombre de convives" min="2" max="99">
            <tr>Date de réservation : </tr>
            <input type="date" id="Date de réservation" min="">
            <tr>Heure de réservation : </tr>
            <input type="number" id="Heure de réservation" min="6" max="24">
         	<tr></tr>
            <button id="submit">Valider</button>
            </div>
			</div>
			</div>
			`;

		modal.style.display = 'block';

		document.getElementsByClassName('close-btn')[0].addEventListener('click', () => {
			modal.style.display = 'none';
		});

		let dateJour = new Date().toISOString().split('T')[0];
		document.getElementById('Date de réservation').setAttribute('min', dateJour);
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
			dateJour = new Date(dateJour);
			dateJour.setDate(dateJour.getDate() + 1);
			dateJour = dateJour.toISOString().split('T')[0];
		}

		// On change les cases du tableau en fonction des horaires
		for (let i = nbJour; i < 7; i++) {
			for (let j = 0; j < dispo[i].length; j++) {
				let heure = dispo[i][j].split('T')[1].split(':')[0];
				document.getElementById(heure + jours[i]).checked = false;
				document.getElementById(heure + jours[i]).disabled = false;
			}
		}



		document.getElementById('Nom').addEventListener('change', (e) => {
			nom = e.target.value;
		});
		document.getElementById('Prénom').addEventListener('change', (e) => {
			prenom = e.target.value;
		});
		document.getElementById('Numéro de téléphone').addEventListener('change', (e) => {
			if(e.target.value.length === 10) {
				tel = e.target.value;
			}
		});
		document.getElementById('Nombre de convives').addEventListener('change', (e) => {
			nbConviv = e.target.value;
		});
		document.getElementById('Date de réservation').addEventListener('change', (e) => {
			dateReserv = e.target.value;
		});
		document.getElementById('Heure de réservation').addEventListener('change', (e) => {
			heureReserv = e.target.value;
		});

		document.getElementById('submit').addEventListener('click', () => {
			if (nom && prenom && tel && nbConviv && dateReserv && heureReserv) {
				console.log('Réservation du restaurant ' + idResto + ' par ' + nom + ' ' + prenom + ' au ' + tel + ' pour ' + nbConviv + ' personnes le ' + dateReserv + ' à ' + heureReserv + 'h');
				fetch('http://localhost:8080/reservation?date=' + dateReserv + '_' + heureReserv + ':00:00&idResto=' + idResto + '&nbConviv=' + nbConviv + '&nom=' + nom + '&prenom=' + prenom + '&numTel=' + tel);
				modal.style.display = 'none';
			}
			else {
				alert('Veuillez remplir tous les champs');
			}
		});

}

