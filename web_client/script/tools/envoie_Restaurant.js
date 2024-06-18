import {baseURL} from "./config";

export function envoieRestaurant(nomResto, adr, note, coordonnees) {
	return fetch(`${baseURL}/restaurants`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			"nomResto": nomResto,
			"adr": adr,
			"note": note,
			"coordonnees": coordonnees
		}
	})
		.then(response => response.json())
		.catch(error => {
			console.error('Erreur lors de l\'ajout du restaurant:', error);
			return null;
		});
}