// recup_restaurants.js

// Récupère la liste des restaurants avec leurs coordonnées
export function fetchRestaurantList() {
	return fetch("http://localhost:8080/restaurants")
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

// Récupère les détails d'un restaurant par son ID
export function fetchRestaurantDetails(idResto) {
	return fetch(`http://localhost:8080/restaurants/${idResto}`)
		.then(response => response.json())
		.then(data => {
			const [lat, lon] = data.coordonnees.split(',').map(Number);
			return {
				...data,
				lat,
				lon
			};
		})
		.catch(error => {
			console.error(`Erreur lors de la récupération des détails du restaurant ${idResto}:`, error);
			return null;
		});
}
