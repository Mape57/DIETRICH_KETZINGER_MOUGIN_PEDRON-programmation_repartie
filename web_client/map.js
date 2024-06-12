export function initMap() {
	// Initialiser la carte
	var map = L.map('map').setView([48.692054, 6.18788], 13); // Centre sur Nancy (latitude, longitude) avec un zoom de 13

	// Ajouter une couche de tuiles
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	return map;
}

// Définir une icône personnalisée
export var redIcon = L.icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	iconSize: [25, 41], // taille de l'icône
	iconAnchor: [12, 41], // point d'ancrage de l'icône (base de l'icône)
	popupAnchor: [1, -34], // point d'ancrage de la popup par rapport à l'icône
	shadowSize: [41, 41]  // taille de l'ombre
});


export var blueIcon = L.icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	iconSize: [25, 41], // taille de l'icône
	iconAnchor: [12, 41], // point d'ancrage de l'icône (base de l'icône)
	popupAnchor: [1, -34], // point d'ancrage de la popup par rapport à l'icône
	shadowSize: [41, 41]  // taille de l'ombre
});


export function addMarkersToMap(mapp, coordinates, icon, onClick) {
	coordinates.forEach(coord => {
		if (coord.lat !== undefined && coord.lon !== undefined) {
			const marker = L.marker([coord.lat, coord.lon], { icon: icon }).addTo(mapp);
			if (onClick) {
				marker.on('click', () => onClick(coord, marker));
			}
		} else {
			console.error('Coordonnées invalides pour le marqueur:', coord);
		}
	});
}

