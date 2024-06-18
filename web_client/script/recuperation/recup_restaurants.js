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

// Récupère les détails d'un restaurant par son ID et ajoute une image de Unsplash
export async function fetchRestaurantDetails(idResto) {
	return fetch(`${baseURL}/restaurants/${idResto}`)
		.then(response => response.json())
		.then(async data => {
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
async function fetchRestaurantImage(restaurantName) {
	console.log(restaurantName)
	const response = await fetch(`https://api.unsplash.com/search/photos?query=restaurant,${encodeURIComponent(restaurantName)}&client_id=${UNSPLASH_ACCESS_KEY}`);
	const data = await response.json();
	if (data.results && data.results.length > 0) {
		const imageUrl = data.results[imageIndex % data.results.length].urls.small; // Utiliser l'image à l'index actuel
		imageIndex++; // Incrémenter l'index pour le prochain restaurant
		return imageUrl;
	} else {
		// URL d'une image par défaut si aucune image n'est trouvée
		return 'https://via.placeholder.com/250?text=Restaurant+Image';
	}
}