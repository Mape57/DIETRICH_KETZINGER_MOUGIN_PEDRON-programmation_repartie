import L from 'leaflet';

export function initMap() {
	// Initialiser la carte
	var map = L.map('map').setView([48.692054, 6.18788], 14); // Centre sur Nancy (latitude, longitude) avec un zoom de 13

	// Ajouter une couche de tuiles
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	return map;
}

export function addMarkersToMap(map, coordinates, icon, createPopupContent) {
	const markers = coordinates.map(coord => {
		if (coord.lat !== undefined && coord.lon !== undefined) {
			const marker = L.marker([coord.lat, coord.lon], { icon: icon });
			const popupContent = createPopupContent(coord, marker);
			if (popupContent) {
				marker.bindPopup(popupContent);
			}
			marker.addTo(map);  // Ajout du marqueur à la carte ici
			return marker;
		} else {
			console.error('Coordonnées invalides pour le marqueur:', coord);
			return null;
		}
	});
	return markers.filter(marker => marker !== null);
}



