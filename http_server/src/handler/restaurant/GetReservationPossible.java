package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;
import tools.QueryParser;

import java.io.IOException;
import java.rmi.RemoteException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class GetReservationPossible implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String query = exchange.getRequestURI().getQuery();
		Map<String, String> params = QueryParser.parse(query);

		String content = "";
		// params.get("date") est dans le format "xxxx-xx-xx" ou "xxxx-xx-xx xx:xx:xx"
		if (params.get("date").matches("\\d{4}-\\d{2}-\\d{2}")) {
			content = getPossibleReservation(params);
		} else if (params.get("date").matches("\\d{4}-\\d{2}-\\d{2}_\\d{2}:\\d{2}:\\d{2}")) {
			content = postReservation(params);
		} else {
			exchange.sendResponseHeaders(400, -1);
		}

		ExchangeContentSender.send(exchange, content);
	}

	private String getPossibleReservation(Map<String, String> params) throws RemoteException {
		LocalDate date = LocalDate.parse(params.get("date"));
		int idResto = Integer.parseInt(params.get("idResto"));
		int nbConviv = Integer.parseInt(params.get("nbConviv"));

		return ServeurCentral.restaurant.getPossibleReservation(idResto, nbConviv, date);
	}

	private String postReservation(Map<String, String> params) throws RemoteException {
		int idResto = Integer.parseInt(params.get("idResto"));
		String nom = params.get("nom");
		String prenom = params.get("prenom");
		int nbConviv = Integer.parseInt(params.get("nbConviv"));
		String numTel = params.get("numTel");

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss");
		LocalDateTime date = LocalDateTime.parse(params.get("date"), formatter);

		return ServeurCentral.restaurant.postReservation(idResto, nom, prenom, nbConviv, numTel, date);
	}
}