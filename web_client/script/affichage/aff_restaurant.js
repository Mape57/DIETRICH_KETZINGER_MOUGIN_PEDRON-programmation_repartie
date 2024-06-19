import Handlebars from "handlebars";
import {fetchAllRestaurantHours, fetchRestaurantHours} from "../recuperation/recup_restaurants";
import {semaine} from "../tools/config";
import {reserveRestaurant} from "../../index";

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
		reserveRestaurant(details.idResto);
	});

	document.getElementById('fermer-restaurant').addEventListener('click', () => {
		document.querySelector("#restaurantDetails").classList.remove("show");
	});


	if (!animate) document.querySelector("#restaurantDetails").classList.add("show");
	else setTimeout(() => document.querySelector("#restaurantDetails").classList.add("show"), 10);
}

function generateStars(rating) {
	const maxStars = 5;
	const stars = (rating / 2);
	const fullStars = Math.floor(stars);
	const halfStar = stars % 1 >= 0.5 ? 1 : 0;
	const emptyStars = maxStars - fullStars - halfStar;

	let starsHtml = '';

	for (let i = 0; i < fullStars; i++) {
		starsHtml += '<i class="fas fa-star" style="color: gold;"></i>';
	}

	if (halfStar) {
		starsHtml += '<i class="fas fa-star-half-alt" style="color: gold;"></i>';
	}

	for (let i = 0; i < emptyStars; i++) {
		starsHtml += '<i class="far fa-star" style="color: gold;"></i>';
	}

	return starsHtml;
}