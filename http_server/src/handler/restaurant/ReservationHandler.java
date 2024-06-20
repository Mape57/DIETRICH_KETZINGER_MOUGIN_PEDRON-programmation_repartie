package handler.restaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONObject;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;
import tools.QueryParser;

import java.io.IOException;
import java.rmi.RemoteException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class ReservationHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String query = exchange.getRequestURI().getQuery();
		Map<String, String> params = QueryParser.parse(query);

		String content = "";
		// params.get("date") est dans le format "xxxx-xx-xx" ou "xxxx-xx-xx xx:xx:xx"
		if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
			exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
			exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
			exchange.sendResponseHeaders(204, -1);
		} else if (exchange.getRequestMethod().equals("GET")) {
			content = getPossibleReservation(params);
			ExchangeContentSender.send(exchange, content, 200);
		} else if (exchange.getRequestMethod().equals("POST")) {
			byte[] body = exchange.getRequestBody().readAllBytes();
			content = postReservation(new String(body));
			ExchangeContentSender.send(exchange, content, 200);
		} else {
			ExchangeContentSender.send(exchange, "Les paramètres fournis ne sont pas corrects.", 400);
		}
	}

	private String getPossibleReservation(Map<String, String> params) throws RemoteException {
		LocalDate date = LocalDate.parse(params.get("date"));
		int idResto = Integer.parseInt(params.get("idResto"));
		int nbConviv = Integer.parseInt(params.get("nbConviv"));

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

		System.out.println("Sending reservation to backend");
		return ServeurCentral.restaurant.postReservation(idResto, nom, prenom, nbConviv, numTel, date);
	}
}