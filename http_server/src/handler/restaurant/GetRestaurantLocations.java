package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;

public class GetRestaurantLocations implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String content = ServeurCentral.restaurant.getAllRestaurantPosition();
		ExchangeContentSender.send(exchange, content);
	}
}
