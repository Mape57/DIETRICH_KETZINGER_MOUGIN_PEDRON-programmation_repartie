package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;
import java.rmi.RemoteException;

public class RestaurantByIdHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String path = exchange.getRequestURI().getPath();
		String[] pathParts = path.split("/");

		String content = "";

		try {
			if (pathParts[pathParts.length - 1].equals("horaires")) {
				int id = Integer.parseInt(pathParts[pathParts.length - 2]);
				content = ServeurCentral.restaurant.getRestaurantHoraires(id);
			} else {
				int id = Integer.parseInt(pathParts[pathParts.length - 1]);
				content = ServeurCentral.restaurant.getRestaurantById(id);
			}
		} catch (NumberFormatException e) {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		} catch (RemoteException e) {
			ExchangeContentSender.send(exchange, "Erreur lors de la récupération du restaurant.", 500);
		}

		ExchangeContentSender.send(exchange, content, 200);
	}
}