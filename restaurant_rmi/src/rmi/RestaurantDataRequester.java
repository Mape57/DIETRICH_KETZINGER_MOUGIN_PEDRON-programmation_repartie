package rmi;

import org.json.JSONArray;
import org.json.JSONObject;
import record.Restaurant;

import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.List;

public class RestaurantDataRequester implements RestaurantDataRequesterInterface {
	@Override
	public String getAllRestaurantPosition() throws RemoteException {
		List<Restaurant> restaurants = null;

		try {
			restaurants = Restaurant.getAll();
		} catch (SQLException e) {
			System.out.println("Erreur lors de la récupération de la position des restaurants.");
			e.printStackTrace();
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
			e.printStackTrace();
			return "{}";
		}

		if (restaurant == null) return "{}";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("idResto", restaurant.getIdResto());
		jsonObject.put("nomResto", restaurant.getNomResto());
		jsonObject.put("adr", restaurant.getAdr());
		jsonObject.put("coordonnees", restaurant.getCoordonnees());
		jsonObject.put("note", restaurant.getNote());

		return jsonObject.toString();
	}
}