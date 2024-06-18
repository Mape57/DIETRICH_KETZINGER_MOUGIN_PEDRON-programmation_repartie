// recup_incidents.js

import {baseURL} from "../tools/config";

export async function fetchIncidentData() {
    return fetch(`${baseURL}/travaux`)
        .then(response => response.json())
        .then(data => {
            return data.incidents.map(incident => {
                const [lat, lon] = incident.location.polyline.split(' ').map(Number);
                return {
                    id: incident.id,
                    lat,
                    lon,
                    description: incident.description,
                    short_description: incident.short_description,
                    starttime: incident.starttime,
                    endtime: incident.endtime,
                    location_description: incident.location.location_description
                };
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des incidents:', error);
            return [];
        });
}
