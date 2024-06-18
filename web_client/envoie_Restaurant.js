import {baseURL} from "./script/config";

export function envoieRestaurant(nomResto, adr, note, coordonnees) {
	return fetch(`${baseURL}/restaurants`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			nomResto,
			adr,
			note,
			coordonnees
		})
	})
		.then(response => response.json())
		.catch(error => {
			console.error('Erreur lors de l\'ajout du restaurant:', error);
			return null;
		});
}