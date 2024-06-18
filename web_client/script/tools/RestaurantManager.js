import { blueIcon } from './mapIcons.js';
import { createPopupContent } from './popupContent.js';
import { envoieRestaurant } from './envoie_Restaurant.js';

export class RestaurantManager {
	constructor(map, restaurantMarkers) {
		this.map = map;
		this.restaurantMarkers = restaurantMarkers;
		this.init();
	}

	init() {
		this.map.on('click', (e) => {
			if (e.originalEvent.ctrlKey) {
				const latlng = e.latlng;
				this.openAddRestaurantForm(latlng);
			}
		});
	}

	openAddRestaurantForm(latlng) {
		const formHtml = `
            <div id="addRestaurantForm" style="background-color: white; padding: 10px; border-radius: 5px;">
                <h3>Ajouter un nouveau restaurant</h3>
                <label for="restaurantName">Nom:</label>
                <input type="text" id="restaurantName" name="restaurantName"><br>
                <label for="restaurantAddress">Adresse:</label>
                <input type="text" id="restaurantAddress" name="restaurantAddress"><br>
                <label for="restaurantRating">Note (sur 10):</label>
                <input type="number" id="restaurantRating" name="restaurantRating" min="0" max="10"><br>
                <button onclick="restaurantManager.addRestaurant(${latlng.lat}, ${latlng.lng})">Ajouter</button>
                <button onclick="restaurantManager.closeAddRestaurantForm()">Annuler</button>
            </div>
        `;

		const formContainer = document.getElementById("creation-restaurant");
		console.log(formContainer);
		formContainer.innerHTML = formHtml;
		setTimeout(() => {
			let height = document.getElementById("addRestaurantForm").clientHeight;
			formContainer.style.maxHeight = height + 'px';
			console.log(height)
		}, 100);
	}

	closeAddRestaurantForm() {
		const formContainer = document.getElementById('formContainer');
		if (formContainer) {
			document.body.removeChild(formContainer);
		}
	}

	addRestaurant(lat, lng) {
		const name = document.getElementById('restaurantName').value;
		const address = document.getElementById('restaurantAddress').value;
		const rating = document.getElementById('restaurantRating').value;

		if (name && address && rating) {
			const coordonnees = lat + ',' + lng;


			envoieRestaurant(name, address, rating, coordonnees)
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

						const newMarker = L.marker([lat, lng], { icon: blueIcon })
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
