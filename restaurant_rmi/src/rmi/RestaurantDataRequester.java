package rmi;

import org.json.JSONArray;
import org.json.JSONObject;
import record.Reservation;
import record.Restaurant;
import record.Table;

import java.rmi.RemoteException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class RestaurantDataRequester implements RestaurantDataRequesterInterface {
	@Override
	public String getPossibleReservation(int idResto, int nbConviv, LocalDate date) throws RemoteException {
		List<LocalDateTime> possibleReservations;

		try {
			possibleReservations = Restaurant.getReservationPossible(idResto, nbConviv, date);
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération des réservations possibles.");
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


}