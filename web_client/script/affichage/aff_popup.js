import Handlebars from 'handlebars';
import {fetchRestaurantDetails} from "../recuperation/recup_restaurants";
import {displayRestaurantDetails} from "./aff_restaurant";

const velib_template_html = document.getElementById('velib_template').innerHTML;
let velib_template = Handlebars.compile(velib_template_html);
export const createVeloPopupContent = (station) => velib_template(station);

const incident_template_html = document.getElementById('incident_template').innerHTML;
let incident_template = Handlebars.compile(incident_template_html);
export const createIncidentPopupContent = (incident) => incident_template(incident);

const school_template_html = document.getElementById('school_template').innerHTML;
let school_template = Handlebars.compile(school_template_html);
export const createSchoolPopupContent = (school) => school_template(school);

export const createRestaurantPopupContent = (restaurant, marker) => {
	marker.on('click', () => {
		fetchRestaurantDetails(restaurant.idResto).then(async details => {
			if (!details) return;
			await displayRestaurantDetails(details, restaurant);
		})
	});
}

export function reserveRestaurant(idResto) {
	alert('Réservation pour le restaurant ' + idResto);
}

