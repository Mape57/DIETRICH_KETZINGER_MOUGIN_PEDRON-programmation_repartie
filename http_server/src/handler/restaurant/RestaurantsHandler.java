package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONObject;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;
import java.rmi.RemoteException;
import java.security.InvalidParameterException;

public class RestaurantsHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		try {
			if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
				ExchangeContentSender.sendOptions(exchange);
			} else if (exchange.getRequestMethod().equals("GET")) {
				String content = ServeurCentral.restaurant.getAllRestaurantPosition();
				ExchangeContentSender.send(exchange, content, 200);
			} else if (exchange.getRequestMethod().equals("POST")) {
				byte[] body = exchange.getRequestBody().readAllBytes();
				String content = postRestaurant(new String(body));
				ExchangeContentSender.send(exchange, content, 200);
			} else {
				ExchangeContentSender.send(exchange, "Méthode non autorisée.", 405);
			}
		} catch (NumberFormatException | InvalidParameterException e) {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		} catch (RemoteException e) {
			ExchangeContentSender.send(exchange, "Erreur lors de la récupération des restaurants.", 500);
		}
	}

	private String postRestaurant(String body) throws RemoteException {
		JSONObject json = new JSONObject(body);

		String nomResto = json.getString("nomResto");
		String adr = json.getString("adr");
		String coordonnees = json.getString("coordonnees");
		int note = json.getInt("note");

		// coordonnees match regex : number . number , number . number
		if (nomResto.isEmpty() || adr.isEmpty() || note < 0 || note > 10 || !coordonnees.matches("^-?\\d+(\\.\\d+)?,-?\\d+(\\.\\d+)?$"))
			throw new InvalidParameterException();

		return ServeurCentral.restaurant.postRestaurant(nomResto, adr, coordonnees, note);
	}
}