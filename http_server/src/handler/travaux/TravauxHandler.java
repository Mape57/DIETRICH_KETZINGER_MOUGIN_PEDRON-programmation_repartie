package handler.travaux;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;
import tools.QueryParser;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.Map;

public class TravauxHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		try {
			if (exchange.getRequestMethod().equals("GET")) {
				String query = exchange.getRequestURI().getQuery();
				Map<String, String> params = QueryParser.parse(query);

				String url = params.get("url");

				if (url == null) throw new InvalidParameterException();

				String content = ServeurCentral.distant.getData(url);
				ExchangeContentSender.send(exchange, content, 200);
			}
		} catch (IOException e) {
			ExchangeContentSender.send(exchange, "Erreur lors de la récupération des données.", 500);
		} catch (InvalidParameterException e) {
			ExchangeContentSender.send(exchange, "Paramètre manquant.", 400);
		}
	}
}
