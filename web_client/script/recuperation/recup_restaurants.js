import {baseURL} from "../tools/config";

const UNSPLASH_ACCESS_KEY = 'demande a ta mere'; // Remplacez par votre clé API
let imageIndex = 0; // Compteur global pour suivre l'index des images

// Récupère la liste des restaurants avec leurs coordonnées
export function fetchRestaurantList() {
	return fetch(`${baseURL}/restaurants`)
		.then(response => response.json())
		.then(data => {
			return data.map(station => {
				const [lat, lon] = station.coordonnees.split(',').map(Number);
				return { idResto: station.idResto, lat, lon };
			});
		})
		.catch(error => {
			console.error('Erreur lors de la récupération de la liste des restaurants:', error);
			return [];
		});
}

export async function fetchRestaurantHoraires(idResto, dateR, nbConviv) {
	return fetch(`http://localhost:8080/reservation?date=${dateR}&idResto=${idResto}&nbConviv=${nbConviv}`)
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error(`Erreur lors de la récupération des horaires du restaurant ${idResto}:`, error);
			return null;
		});
}

// Récupère les détails d'un restaurant par son ID et ajoute une image de Unsplash
export function fetchRestaurantDetails(idResto) {
	return fetch(`${baseURL}/restaurants/${idResto}`)
		.then(response => response.json())
		.then(async data => {
			console.log("data");
			console.log(await data);
			const [lat, lon] = data.coordonnees.split(',').map(Number);
			const imageUrl = await fetchRestaurantImage(data.nomResto);
			return {
				...data,
				lat,
				lon,
				imageUrl
			};
		})
		.catch(error => {
			console.error(`Erreur lors de la récupération des détails du restaurant ${idResto}:`, error);
			return null;
		});
}

//tom revoit l'utilisation de l'index, il n'y en a surement pas besoin si tu change la requete indiqué dans l'url
// Fonction pour obtenir une image de Unsplash pour un restaurant
function fetchRestaurantImage(restaurantName) {
	return fetch(`https://api.unsplash.com/search/photos?query=restaurant,${encodeURIComponent(restaurantName)}&client_id=${UNSPLASH_ACCESS_KEY}`)
		.then(response => response.json())
		.then(data => {
			if (data.results && data.results.length > 0) {
				const imageUrl = data.results[imageIndex % data.results.length].urls.small; // Utiliser l'image à l'index actuel
				imageIndex++; // Incrémenter l'index pour le prochain restaurant
				return imageUrl;
			} else {
				// URL d'une image par défaut si aucune image n'est trouvée
				return 'https://via.placeholder.com/250?text=Restaurant+Image';
			}
		})
		.catch(error => {
			console.error(`Erreur lors de la récupération de l'image du restaurant ${restaurantName}:`, error);
			return 'https://via.placeholder.com/250?text=Restaurant+Image';
		});
}

// Fonction pour obtenir l'état d'ouverture
export function fetchRestaurantHours(idResto) {
	return fetch(`${baseURL}/restaurants/${idResto}/horaires`)
		.then(response => response.json())
		.then(data => {
			const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
			const aujourdhui = new Date().getDay();
			const jourActuel = jours[aujourdhui];
			const horaires = data[jourActuel] || null;

			if (horaires) {
				const maintenant = new Date();
				const heureActuelle = maintenant.getHours();

				const ouvert = horaires.some(([debut, fin]) => heureActuelle >= debut && heureActuelle < fin);

				return { ouvert };
			} else {
				return { ouvert: false };
			}
		})
		.catch(error => {
			console.error(`Erreur lors de la récupération des horaires du restaurant ${idResto}:`, error);
			return { ouvert: false };
		});
}

// Fonction pour obtenir tous les horaires de la semaine
export function fetchAllRestaurantHours(idResto) {
	return fetch(`${baseURL}/restaurants/${idResto}/horaires`)
		.then(response => response.json())
		.catch(error => {
			console.error(`Erreur lors de la récupération des horaires du restaurant ${idResto}:`, error);
			return null;
		});
}

export function postRestaurant(nomResto, adr, note, coordonnees) {
	return fetch(`${baseURL}/restaurants`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"nomResto": nomResto,
			"adr": adr,
			"note": note,
			"coordonnees": coordonnees
		})
	})
		.then(response => response.json())
		.catch(error => {
			console.error('Erreur lors de l\'ajout du restaurant:', error);
			return null;
		});
}