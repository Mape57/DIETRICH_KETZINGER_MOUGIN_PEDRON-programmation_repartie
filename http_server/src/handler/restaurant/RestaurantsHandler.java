package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONObject;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;
import java.rmi.RemoteException;

public class RestaurantsHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String content = "";

		if (exchange.getRequestMethod().equals("GET")) {
			content = ServeurCentral.restaurant.getAllRestaurantPosition();
		} else if (exchange.getRequestMethod().equals("POST")) {
			byte[] body = exchange.getRequestBody().readAllBytes();
			content = postRestaurant(new String(body));
		} else {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		}

		ExchangeContentSender.send(exchange, content, 200);
	}

	private String postRestaurant(String body) throws RemoteException {
		JSONObject json = new JSONObject(body);

		String nomResto = json.getString("nomResto");
		String adr = json.getString("adr");
		String coordonnees = json.getString("coordonnees");
		int note = json.getInt("note");

		return ServeurCentral.restaurant.postRestaurant(nomResto, adr, coordonnees, note);
	}
}
