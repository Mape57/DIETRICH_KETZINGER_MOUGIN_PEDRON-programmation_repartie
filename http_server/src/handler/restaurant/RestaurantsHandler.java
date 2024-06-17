package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;
import tools.QueryParser;

import java.io.IOException;
import java.rmi.RemoteException;
import java.util.Map;

public class RestaurantsHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String query = exchange.getRequestURI().getQuery();
		Map<String, String> params = QueryParser.parse(query);

		String content = "";
		if (params.isEmpty()) {
			content = ServeurCentral.restaurant.getAllRestaurantPosition();
		} else if (params.containsKey("nomResto") && params.containsKey("adr") && params.containsKey("coordonnees") && params.containsKey("note")) {
			content = postRestaurant(params);
		} else {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		}

		ExchangeContentSender.send(exchange, content, 200);
	}

	private String postRestaurant(Map<String, String> params) throws RemoteException {
		String nomResto = params.get("nomResto");
		String adr = params.get("adr");
		String coordonnees = params.get("coordonnees");
		int note = Integer.parseInt(params.get("note"));

		return ServeurCentral.restaurant.postRestaurant(nomResto, adr, coordonnees, note);
	}
}
