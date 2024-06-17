package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;

public class GetRestaurantById implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String path = exchange.getRequestURI().getPath();
		String idStr = path.substring(path.lastIndexOf('/') + 1);
		int id = Integer.parseInt(idStr);

		String content = ServeurCentral.restaurant.getRestaurantById(id);
		ExchangeContentSender.send(exchange, content);
	}
}