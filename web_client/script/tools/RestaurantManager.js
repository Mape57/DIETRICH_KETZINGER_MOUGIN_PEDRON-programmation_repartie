import {blueIcon} from './mapIcons.js';
import {postRestaurant} from '../recuperation/recup_restaurants.js';
import Handlebars from 'handlebars';

const addRestaurant_template = document.getElementById("addRestaurant_template");
let addRestaurant = Handlebars.compile(addRestaurant_template.innerHTML);

export class RestaurantManager {
	constructor(map, restaurantMarkers) {
		this.map = map;
		this.restaurantMarkers = restaurantMarkers;
		this.init();
	}

	init() {
		this.map.on('click', (e) => {
			// if control is pressed or if on mobile
			if (e.originalEvent.ctrlKey || window.innerWidth < 800) {
				const latlng = e.latlng;
				this.openAddRestaurantForm(latlng);
			}
		});
	}

	openAddRestaurantForm(latlng) {
		let animate = !document.querySelector("#restaurantDetails.show, #addRestaurantForm.show") ;

		if (this.latlng && document.getElementById("addRestaurantForm")) {
			this.latlng = latlng;
			return;
		}
		this.latlng = latlng;
		let parent = document.getElementById("detail");
		parent.innerHTML = addRestaurant({});

		document.getElementById("create_restaurant").addEventListener('click', (e) => {
			if (!this.latlng) return;
			this.addRestaurant(this.latlng.lat, this.latlng.lng);
		});
		document.getElementById("cancel_restaurant").addEventListener('click', (e) => {
			this.closeAddRestaurantForm();
		});

		if (!animate) document.querySelector("#addRestaurantForm").classList.add("show");
		else setTimeout(() => document.querySelector("#addRestaurantForm").classList.add("show"), 10);
	}

	closeAddRestaurantForm() {
		this.latlng = null;
		document.querySelector("#addRestaurantForm").classList.remove("show");
	}

	addRestaurant(lat, lng) {
		const name = document.getElementById('restaurantName').value;
		const address = document.getElementById('restaurantAddress').value;
		const rating = document.getElementById('restaurantRating').value;

		if (name && address && rating) {
			const coordonnees = lat + ',' + lng;


			postRestaurant(name, address, rating, coordonnees)
				.then(response => {
					if (response) {
						const newRestaurant = {
							idResto: response.idResto,
							lat: lat,
							lon: lng,
							nomResto: name,
							adr: address,
							note: rating
						};

						const newMarker = L.marker([lat, lng], {icon: blueIcon})
							.bindPopup(createPopupContent(newRestaurant))
							.addTo(this.map);

						this.restaurantMarkers.push(newMarker);
						this.closeAddRestaurantForm();
					} else {
						alert('Erreur lors de l\'ajout du restaurant. Veuillez réessayer.');
					}
				});
		} else {
			alert('Veuillez remplir tous les champs.');
		}
	}
}
