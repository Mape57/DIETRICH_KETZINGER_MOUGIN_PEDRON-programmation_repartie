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
		if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
			exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
			exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
			exchange.sendResponseHeaders(204, -1);
		} else if (exchange.getRequestMethod().equals("GET")) {
			String content = ServeurCentral.restaurant.getAllRestaurantPosition();
			ExchangeContentSender.send(exchange, content, 200);
		} else if (exchange.getRequestMethod().equals("POST")) {
			System.out.println("here");
			byte[] body = exchange.getRequestBody().readAllBytes();
			System.out.println("before");
			String content = postRestaurant(new String(body));
			System.out.println(content);
			ExchangeContentSender.send(exchange, content, 200);
		} else {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		}
	}

	private String postRestaurant(String body) throws RemoteException {
		System.out.println(body);
		JSONObject json = new JSONObject(body);
		System.out.println("ok");

		String nomResto = json.getString("nomResto");
		String adr = json.getString("adr");
		String coordonnees = json.getString("coordonnees");
		int note = json.getInt("note");

		System.out.println("=====================================");
		System.out.println(nomResto);
		System.out.println(adr);
		System.out.println(coordonnees);
		System.out.println(note);

		return ServeurCentral.restaurant.postRestaurant(nomResto, adr, coordonnees, note);
	}
}