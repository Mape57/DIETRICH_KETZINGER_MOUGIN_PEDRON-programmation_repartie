package rmi;

import org.json.JSONArray;
import org.json.JSONObject;
import record.Horaire;
import record.Reservation;
import record.Restaurant;
import record.Table;

import java.rmi.RemoteException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RestaurantDataRequester implements RestaurantDataRequesterInterface {
	@Override
	public String getPossibleReservation(int idResto, int nbConviv, LocalDate date) throws RemoteException {
		List<LocalDateTime> possibleReservations;

		try {
			possibleReservations = Restaurant.getReservationPossible(idResto, nbConviv, date);
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération des réservations possibles.");
			e.printStackTrace();
			return "[]";
		}

		JSONArray jsonArray = new JSONArray();
		for (LocalDateTime possibleReservation : possibleReservations) {
			jsonArray.put(possibleReservation.toString());
		}

		return jsonArray.toString();
	}

	@Override
	public String postReservation(int idResto, String nom, String prenom, int nbConviv, String numTel, LocalDateTime date) throws RemoteException {
		int idTable = -1;
		try {
			Table table = Table.getTableLibreFromRestaurant(idResto, nbConviv, date);
			if (table == null) return "{}";
			idTable = table.getIdTable();
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération de la table libre.");
		}
		Reservation reservation = new Reservation(idTable, nom, prenom, nbConviv, numTel, date);
		try {
			reservation.save();
		} catch (SQLException e) {
			System.out.println("Erreur lors de la sauvegarde de la réservation.");
			return "{}";
		}
		return reservation.toJSON().toString();
	}

	@Override
	public String getAllRestaurantPosition() throws RemoteException {
		List<Restaurant> restaurants = null;

		try {
			restaurants = Restaurant.getAll();
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération de la position des restaurants.");
			return "{}";
		}

		JSONArray jsonArray = new JSONArray();
		for (Restaurant restaurant : restaurants) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("idResto", restaurant.getIdResto());
			jsonObject.put("coordonnees", restaurant.getCoordonnees());
			jsonArray.put(jsonObject);
		}

		return jsonArray.toString();
	}

	@Override
	public String getRestaurantById(int idResto) throws RemoteException {
		Restaurant restaurant;

		try {
			restaurant = Restaurant.getById(idResto);
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération du restaurant.");
			return "{}";
		}

		if (restaurant == null) return "{}";

		return restaurant.toJSON().toString();
	}

	@Override
	public String getRestaurantHoraires(int idResto) throws RemoteException {
		List<Horaire> horaires;
		try {
			horaires = Horaire.getHoraire(idResto);
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération des horaires du restaurant.");
			return "{}";
		}

		Map<String, JSONArray> horairesMap = new HashMap<>();
		for (Horaire horaire : horaires) {
			if (horairesMap.containsKey(horaire.getJour())) {
				JSONArray jsonArray = horairesMap.get(horaire.getJour());
				pushHoraireInJson(jsonArray, horaire);
			} else {
				JSONArray jsonArray = new JSONArray();
				pushHoraireInJson(jsonArray, horaire);
				horairesMap.put(horaire.getJour(), jsonArray);
			}
		}

		JSONObject jsonObject = new JSONObject(horairesMap);
		return jsonObject.toString();
	}

	@Override
	public String postRestaurant(String nomResto, String adr, String coordonnees, int note) throws RemoteException {
		Restaurant restaurant = new Restaurant(nomResto, adr, coordonnees, note);
		try {
			restaurant.save();
		} catch (SQLException e) {
			System.out.println("Erreur lors de la sauvegarde du restaurant.");
			return "{}";
		}
		return restaurant.toJSON().toString();
	}

	private static void pushHoraireInJson(JSONArray jsonArray, Horaire horaire) {
		JSONArray hours = new JSONArray();
		hours.put(horaire.getHeureOuverture());
		hours.put(horaire.getHeureFermeture());
		jsonArray.put(hours);
	}
}