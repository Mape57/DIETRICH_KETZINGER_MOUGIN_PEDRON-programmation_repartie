// Initialiser la carte
var map = L.map('map').setView([48.692054, 6.18788], 13); // Centre sur Nancy (latitude, longitude) avec un zoom de 13

// Ajouter une couche de tuiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Récupérer les coordonnées et ajouter des marqueurs
fetch("https://transport.data.gouv.fr/gbfs/nancy/station_information.json")
	.then(response => response.json())
	.then(data => {
		// Récupérer toutes les coordonnées
		const coordinates = data.data.stations.map(station => ({
			lat: station.lat,
			lon: station.lon
		}));

		// Ajouter des marqueurs pour chaque coordonnée
		coordinates.forEach(coord => {
			L.marker([coord.lat, coord.lon]).addTo(map);
		});
	})
	.catch(error => {
		// En cas d'erreur lors de la récupération des données
		console.error('Erreur lors de la récupération des données:', error);
	});
