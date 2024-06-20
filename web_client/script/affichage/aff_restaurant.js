import Handlebars from "handlebars";
import {
	fetchAllRestaurantHours,
	fetchReservation,
	fetchRestaurantHours,
	postReservation
} from "../recuperation/recup_restaurants";
import {semaine} from "../tools/config";
import {createDateSelectionArea} from "./aff_popup";

let dateValue;
let decalageDate = 0;
let selectedDate = "";

export async function displayRestaurantDetails(details, restaurant) {
	let animate = !document.querySelector("#restaurantDetails.show, #addRestaurantForm.show");

	details.note = generateStars(details.note);
	const detail_template = document.getElementById('detail_template');
	let detail = Handlebars.compile(detail_template.innerHTML);
	details.etatOuverture = await fetchRestaurantHours(details.idResto).then((data) => data.ouvert ? "ouvert" : "fermé");
	let horaires = await fetchAllRestaurantHours(details.idResto);

	details.horaires = [];
	for (let jour of semaine) {
		if (horaires[jour]) {
			details.horaires.push({jour: jour, horaire: horaires[jour].map(h => `${h[0]}h - ${h[1]}h`).join(', ')});
		} else {
			details.horaires.push({jour: jour, horaire: "Fermé"});
		}
	}


	document.getElementById('detail').innerHTML = detail(details);

	document.getElementById('reserver-restaurant').addEventListener('click', () => {
		let res = document.getElementById('reservation-restaurant')

		if (!res.classList.contains("selecting")) {
			res.style.maxHeight = res.firstElementChild.clientHeight + "px";
			return;
		}

		let nbConviv = parseInt(document.getElementById('restaurant_nbConviv').value);
		let nom = document.getElementById('restaurant_nom').value;
		let prenom = document.getElementById('restaurant_prenom').value;
		let numTel = document.getElementById('restaurant_numTel').value;

		postReservation(details.idResto, nbConviv, selectedDate, nom, prenom, numTel)
			.then((data) => {
				if (data) {
					alert("Réservation effectuée avec succès !");
					document.querySelector("#restaurantDetails").classList.remove("show");
				} else {
					alert("Erreur lors de la réservation.");
				}
			});
	});

	document.getElementById('restaurant_validerNbConviv').addEventListener('click', async () => {
		await initDateValue(details);
		displayDateSelectionArea(details);

		let res = document.getElementById('reservation-restaurant');
		if (res.classList.contains("selecting")) return;
		res.classList.add("selecting")
		res.style.maxHeight = (res.firstElementChild.clientHeight + res.children[1].clientHeight) + "px";
	});

	document.getElementById('fermer-restaurant').addEventListener('click', () => {
		document.querySelector("#restaurantDetails").classList.remove("show");
	});

	if (!animate) document.querySelector("#restaurantDetails").classList.add("show");
	else setTimeout(() => document.querySelector("#restaurantDetails").classList.add("show"), 10);
}

async function initDateValue(details) {
	let nbConviv = parseInt(document.getElementById('restaurant_nbConviv').value);

	dateValue = await Promise.all([
		doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate),
		doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate + 1),
		doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate + 2),
		doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate + 3),
	])
}

async function nextDateValue(details) {
	let nbConviv = parseInt(document.getElementById('restaurant_nbConviv').value);
	decalageDate++;

	dateValue.shift();
	dateValue.push(await doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate + dateValue.length));
}

async function previousDateValue(details) {
	let nbConviv = parseInt(document.getElementById('restaurant_nbConviv').value);
	decalageDate--;

	dateValue.pop();
	dateValue.unshift(await doFetchReservation(details.idResto, nbConviv, new Date(), decalageDate));
}

function displayDateSelectionArea(details) {
	const idOfMaxLenghtForValue = dateValue.reduce((acc, val, i) => val[1].length > dateValue[acc][1].length ? i : acc, 0);

	// jours correspond à la liste des clefs de dateValue
	let result = {
		jours: dateValue.map(v => v && v[0]),
	}

	result.lignes = [];
	for (let i = 0; i < dateValue[idOfMaxLenghtForValue][1].length; i++) {
		for (let j = 0; j < dateValue.length; j++) {
			let val = dateValue[j][1][i];
			if (!result.lignes[i])
				result.lignes[i] = [addValue(result, val)];
			else
				result.lignes[i].push(addValue(result, val));
		}
	}

	if (result.lignes.length === 0) {
		result.lignes = [{blank: true}];
	}

	document.getElementById("reservation-date").innerHTML = createDateSelectionArea(result);

	document.getElementById('restaurant_date-previous').addEventListener('click', async () => {
		await previousDateValue(details);
		displayDateAndAnimate(details);
	});

	document.getElementById('restaurant_date-next').addEventListener('click', async () => {
		await nextDateValue(details);
		displayDateAndAnimate(details);
	});

	document.querySelectorAll('#reservation-date > .datePicker').forEach((el) => {
		el.addEventListener('click', (e) => {
			let res = document.getElementById('reservation-restaurant');
			if (selectedDate !== e.target.id) {
				document.querySelector('.selected')?.classList.remove('selected');
				selectedDate = e.target.id;
				res.style.maxHeight = res.scrollHeight + "px";
			} else {
				selectedDate = null;
				res.style.maxHeight = (res.firstElementChild.clientHeight + res.children[1].clientHeight) + "px";
			}
			e.target.classList.toggle('selected');
		});
	});
}

function displayDateAndAnimate(details) {
	displayDateSelectionArea(details);

	let res = document.getElementById('reservation-restaurant');
	if (!selectedDate) {
		res.style.maxHeight = (res.firstElementChild.clientHeight + res.children[1].clientHeight) + "px";
	} else {
		res.style.maxHeight = res.clientHeight + "px";
	}
}

function addValue(result, val) {
	if (!val) return {blank: true};
	else return {
		id: val,
		heure: val.slice(11, 16),
		selected: val === selectedDate
	};
}

function generateStars(rating) {
	const maxStars = 5;
	const stars = (rating / 2);
	const fullStars = Math.floor(stars);
	const halfStar = stars % 1 >= 0.5 ? 1 : 0;
	const emptyStars = maxStars - fullStars - halfStar;

	let starsHtml = '';
	for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star" style="color: gold;"></i>';
	if (halfStar) starsHtml += '<i class="fas fa-star-half-alt" style="color: gold;"></i>';
	for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star" style="color: gold;"></i>';

	return starsHtml;
}

function doFetchReservation(idResto, nbConviv, date, decalageDate = 0) {
	date.setDate(date.getDate() + decalageDate);
	return fetchReservation(idResto, nbConviv, date.toISOString().split('T')[0])
		.then((data) => {
			if (!data) return;
			// first value should be like that : Lun. 10
			return [
				semaine[date.getDay()].slice(0, 3) + ". " + date.getDate(),
				data.map((d) => d + ":00")
			];
		}).catch((error) => {
			console.error(`Erreur lors de la récupération des horaires du restaurant ${idResto}:`, error);
			return null;
		});
}