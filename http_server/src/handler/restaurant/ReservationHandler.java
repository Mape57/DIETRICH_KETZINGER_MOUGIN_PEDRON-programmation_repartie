package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONObject;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;
import tools.QueryParser;

import java.io.IOException;
import java.rmi.RemoteException;
import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;

public class ReservationHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String content = "";
		int code = 200;

		try {
			if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
				ExchangeContentSender.sendOptions(exchange);
			} else if (exchange.getRequestMethod().equals("GET")) {
				String query = exchange.getRequestURI().getQuery();
				Map<String, String> params = QueryParser.parse(query);
				content = getPossibleReservation(params);
			} else if (exchange.getRequestMethod().equals("POST")) {
				byte[] body = exchange.getRequestBody().readAllBytes();
				content = postReservation(new String(body));
			} else {
				content = "Méthode non autorisée.";
				code = 405;
			}
		} catch (NumberFormatException | DateTimeParseException | InvalidParameterException e) {
			content = "Les paramètres fournis ne sont pas corrects.";
			code = 400;
		} catch (RemoteException e) {
			content = "Erreur lors de la récupération des données.";
			code = 500;
		}

		ExchangeContentSender.send(exchange, content, code);
	}

	private String getPossibleReservation(Map<String, String> params) throws RemoteException {
		LocalDate date = LocalDate.parse(params.get("date"));
		int idResto = Integer.parseInt(params.get("idResto"));
		int nbConviv = Integer.parseInt(params.get("nbConviv"));

		if (date.isBefore(LocalDate.now()) || nbConviv < 0)
			throw new InvalidParameterException();

		return ServeurCentral.restaurant.getPossibleReservation(idResto, nbConviv, date);
	}

	private String postReservation(String body) throws RemoteException {
		JSONObject json = new JSONObject(body);

		int idResto = json.getInt("idResto");
		String nom = json.getString("nom");
		String prenom = json.getString("prenom");
		int nbConviv = json.getInt("nbConviv");
		String numTel = json.getString("numTel");
		LocalDateTime date = LocalDateTime.parse(json.getString("date").replace('T', ' '), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

		if (date.isBefore(LocalDateTime.now()) || nbConviv < 0 || nom.isEmpty() || prenom.isEmpty() || numTel.isEmpty())
			throw new InvalidParameterException();

		return ServeurCentral.restaurant.postReservation(idResto, nom, prenom, nbConviv, numTel, date);
	}
}