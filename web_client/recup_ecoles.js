export async function fetchSchoolData() {
    return fetch("https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre/records?where=(libelle_commune=%27Nancy%27%20OR%20libelle_commune=%27Laxou%27%20OR%20libelle_commune=%27Tomblaine%27%20OR%20libelle_commune=%27Essey-l%C3%A8s-Nancy%27%20OR%20libelle_commune=%27Villers-l%C3%A8s-Nancy%27%20OR%20libelle_commune=%27Vand%C5%93uvre-l%C3%A8s-Nancy%27)%20AND%20(nature_uai_libe=%27COLLEGE%27%20OR%20nature_uai_libe=%27LYCEE%20GENERAL%20ET%20TECHNOLOGIQUE%27%20OR%20nature_uai_libe=%27LYCEE%20PROFESSIONNEL%27)") // Assurez-vous que cette URL pointe vers votre API
        .then(response => response.json())
        .then(data => {
            return data.results.map(school => {
                return {
                    id: school.numero_uai,
                    lat: school.latitude,
                    lon: school.longitude,
                    name: school.appellation_officielle,
                    address: school.adresse_uai
                };
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des établissements scolaires:', error);
            return [];
        });
}
