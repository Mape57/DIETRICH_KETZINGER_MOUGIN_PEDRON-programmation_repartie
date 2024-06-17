package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;
import java.util.Arrays;

public class RestaurantByIdHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String path = exchange.getRequestURI().getPath();
		String[] pathParts = path.split("/");

		String content;

		if (pathParts[pathParts.length - 1].equals("horaires")) {
			System.out.println(Arrays.toString(pathParts));
			int id = Integer.parseInt(pathParts[pathParts.length - 2]);
			content = ServeurCentral.restaurant.getRestaurantHoraires(id);
		} else {
			int id = Integer.parseInt(pathParts[pathParts.length - 1]);
			content = ServeurCentral.restaurant.getRestaurantById(id);
		}

		ExchangeContentSender.send(exchange, content, 200);
	}
}