export function fetchVeloData() {
	return fetch("https://transport.data.gouv.fr/gbfs/nancy/station_information.json")
		.then(response => response.json())
		.then(data => {
			// Récupérer toutes les coordonnées
			return data.data.stations.map(station => ({
				lat: station.lat,
				lon: station.lon
			}));
		})
		.catch(error => {
			// En cas d'erreur lors de la récupération des données
			console.error('Erreur lors de la récupération des données:', error);
			return [];
		});
}
