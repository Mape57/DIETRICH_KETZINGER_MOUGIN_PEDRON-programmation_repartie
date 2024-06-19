import {
	createIncidentPopupContent,
	createRestaurantPopupContent, createSchoolPopupContent,
	createVeloPopupContent
} from './script/affichage/aff_popup.js';
import {RestaurantManager} from './script/tools/RestaurantManager.js';
import {fetchMeteo} from "./script/recuperation/recup_meteo";
import {displayMeteo} from "./script/affichage/aff_meteo";
import {addMarkersToMap, initMap} from "./script/affichage/map";
import {
	fetchRestaurantDetails,
	fetchRestaurantHoraires,
	fetchRestaurantList
} from "./script/recuperation/recup_restaurants";
import {blueIcon, greenIcon, redIcon, yellowIcon} from "./script/tools/mapIcons";
import {fetchVeloData} from "./script/recuperation/recup_velo";
import {fetchIncidentData} from "./script/recuperation/recup_incidents";
import {fetchSchoolData} from "./script/recuperation/recup_ecoles";
import {baseURL} from "./script/tools/config";

const modal = document.getElementById('modal');

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


// On ouvre une fenêtre pour la réservation
export async function reserveRestaurant(idResto) {
	console.log('Réservation pour le restaurant', idResto);
	const details = await fetchRestaurantDetails(idResto);
	let nom, prenom, tel, nbConviv = 2, dateReserv = null, heureReserv, dispo = [];
	modal.innerHTML = `
		<div class="modal-content">
			<span class="close-btn">&times;</span>
			<h2>Réserver pour ${details.nomResto}</h2>
			<p>Voici un calendrier représentant les horaires du restaurant</p>
			<div id="calendar">Calendrier de réservation</div>
			<table>
       			<thead>
       			    <tr id="jours-header">
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
   		    <input type="text" id="Numéro de téléphone" minlength="10" maxlength="10">
           	<tr>Nombre de convives : </tr>
           	<input type="number" id="CONVIV" min="2" max="99">
           	<tr>Date de réservation : </tr>
           	<input type="date" id="Date de réservation" min="">
           	<tr>Heure de réservation : </tr>
           	<select id="Heure de réservation"></select><tr></tr>
           	<button id="submit">Valider</button>
           </div>
	</div>
</div>
		`;
	// Appel initial pour mettre à jour les en-têtes avec les dates
	updateTableHeaders();

	// On récupère la date et l'heure du jour
	let dateJour = new Date().toISOString().split('T')[0];
	let heureJour = new Date().toISOString().split('T')[1].split(':')[0] + 2;

	// On met à jour la date minimale pour la date de réservation
	document.getElementById('Date de réservation').setAttribute('min', dateJour);

	// On récupère le jour de la semaine
	let jours = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
	const nbJour = getDay(dateJour);

	await initCalendar(dateJour, idResto, nbJour, heureJour, jours);


	// On affiche la page
	modal.style.display = 'block';

	// On ajoute les listeners
	document.getElementsByClassName('close-btn')[0].addEventListener('click', () => {
		modal.style.display = 'none';
	});
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
	document.getElementById('CONVIV').addEventListener('change', async (e) => {
		nbConviv = e.target.value;
		console.log('Nombre de convives : ' + nbConviv);
		dispo = [];
		let rec;
		dateJour = new Date().toISOString().split('T')[0];
		for (let i = nbJour; i < 7; i++) {
			dispo[i] = await fetchRestaurantHoraires(idResto, dateJour, nbConviv);
			dateJour = new Date(dateJour);
			dateJour.setDate(dateJour.getDate() + 1);
			dateJour = dateJour.toISOString().split('T')[0];
		}
		// On change les cases du tableau en fonction des horaires et des convives
		// Les cases précédemment décochées sont cochées si elles ne rentrent pas dans les nouvels horaires disponibles
		const heuresDispo = [];
		for (let i = nbJour; i < 7; i++) {
			for (let j = 0; j < dispo[i].length; j++) {
				let heure = dispo[i][j].split('T')[1].split(':')[0];
				heuresDispo.push(heure + jours[i]);
				document.getElementById(heure + jours[i]).checked = false;
				document.getElementById(heure + jours[i]).disabled = false;
			}
		}
		console.log('Heures dispo : ' + heuresDispo);
		for (let i = nbJour; i < 7; i++) {
			for (let j = 6; j < 24; j++) {
				if (j === 6 || j === 7 || j === 8 || j === 9){
					rec = "0" + j;
				}
				else {
					rec = j;
				}
				if (!heuresDispo.includes(rec + jours[i])) {
					document.getElementById(rec + jours[i]).checked = true;
					document.getElementById(rec + jours[i]).disabled = true;
				}
			}
		}
		if (dateReserv !== null){
			for (let i = nbJour; i < 7; i++) {
				for (let j = 6; j < 24; j++) {
					desacBox(j, i, rec, dateReserv, jours);
				}
			}
		}
	});

	document.getElementById('Date de réservation').addEventListener('change', async (e) => {
		dateReserv = e.target.value;
		dispo = [];
		dispo[0] = await fetchRestaurantHoraires(idResto, dateReserv, nbConviv);
		const options = [];
		let selectElement = document.getElementById('Heure de réservation');
		for (let j = 0; j < dispo[0].length; j++) {
			let heure = dispo[0][j].split('T')[1].split(':')[0];
			document.getElementById(heure + jours[getDay(dateReserv)]).checked = false;
			document.getElementById(heure + jours[getDay(dateReserv)]).disabled = false;
			options.push({value: heure, text: heure + 'h'});
		}
		document.getElementById('Heure de réservation').innerHTML = '<option></option>';
		options.forEach(function (option) {
			const newOption = document.createElement('option');
			newOption.value = option.value;
			newOption.text = option.text;
			selectElement.appendChild(newOption);
		});
		for (let i = nbJour; i < 7; i++) {
			for (let j = 6; j < 24; j++) {
				let rec;
				desacBox(j, i, rec, dateReserv, jours);
			}
		}
	});
	document.getElementById('Heure de réservation').addEventListener('change', (e) => {
		if (heureReserv !== undefined && heureReserv !== null) {
			document.getElementById(heureReserv + jours[getDay(dateReserv)]).checked = false;
		}
		heureReserv = e.target.value;
		document.getElementById(heureReserv + jours[getDay(dateReserv)]).checked = true;
	});
	document.getElementById('submit').addEventListener('click', () => {
		if (nom && prenom && tel && nbConviv && dateReserv && heureReserv !== undefined && heureReserv !== null) {
			fetch(`${baseURL}/reservation?date=${dateReserv}_${heureReserv}:00:00&idResto=${idResto}&nbConviv=${nbConviv}&nom=${nom}&prenom=${prenom}&numTel=${tel}`)
				.then(response => response.json())
				.then(data => {
					console.log('Réservation réussie:', data);
				})
				.catch(error => {
					console.error('Erreur:', error);
					alert('Erreur lors de la réservation.');
				});
			alert('Confirmation de votre réservation pour le ' + dateReserv + ' à ' + heureReserv + 'h pour ' + nbConviv + ' personnes. Merci de votre confiance !');
			modal.style.display = 'none';
		}
		else {
			let missingFields = [];
			if (!nom) missingFields.push('Nom');
			if (!prenom) missingFields.push('Prénom');
			if (!tel) missingFields.push('Téléphone');
			if (!nbConviv) missingFields.push('Nombre de convives');
			if (!dateReserv) missingFields.push('Date de réservation');
			if (!heureReserv) missingFields.push('Heure de réservation');
			alert('Veuillez remplir tous les champs: ' + missingFields.join(', '));
		}
	});
}

function getDay(dateJour){
	switch (new Date(dateJour).getDay()) {
		case 0:
			return 6;
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		default:
			break;
	}
}


// Fonction pour obtenir la date de chaque jour de la semaine en fonction de la date actuelle
function getDatesOfWeek() {
	const today = new Date();
	const dayOfWeek = today.getDay(); // 0 (dimanche) à 6 (samedi)
	const startOfWeek = new Date(today); // Commence la semaine actuelle
	startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Commence à lundi

	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + i);
		dates.push(date);
	}
	return dates;
}

// Fonction pour formater la date sous le format souhaité (JJ/MM)
function formatDate(date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${day}/${month}`;
}

// Met à jour les en-têtes de la table avec les dates
function updateTableHeaders() {
	const dates = getDatesOfWeek();
	const headers = document.querySelectorAll('#jours-header th');
	const jours = ["", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];
	for (let i = 1; i < headers.length; i++) { // Commence à 1 pour ignorer le premier th vide
		headers[i].textContent = `${jours[i]} (${formatDate(dates[i-1])})`;
	}
}


async function initCalendar(dateJour, idResto, nbJour, heureJour, jours) {
	console.log('Initialisation du calendrier');
	console.log(dateJour, idResto, nbJour, heureJour, jours);
	let dispo = [];
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
			if (i === nbJour) {
				if (heure >= heureJour) {
					document.getElementById(heure + jours[i]).checked = false;
					document.getElementById(heure + jours[i]).disabled = false;
				}
			} else {
				document.getElementById(heure + jours[i]).checked = false;
				document.getElementById(heure + jours[i]).disabled = false;
			}
		}
	}
}

function desacBox(j, i, rec, dateReserv, jours){
	if (j === 6 || j === 7 || j === 8 || j === 9) {
		rec = "0" + j;
	} else {
		rec = j;
	}
	if (getDay(dateReserv) !== i) {
		document.getElementById(rec + jours[i]).checked = true;
		document.getElementById(rec + jours[i]).disabled = true;
	}
}

