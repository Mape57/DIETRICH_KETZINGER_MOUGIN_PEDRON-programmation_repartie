package handler.travaux;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import serveur.ServeurCentral;
import tools.ExchangeContentSender;

import java.io.IOException;

public class TravauxHandler implements HttpHandler {
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String content = ServeurCentral.incident.getData();
		ExchangeContentSender.send(exchange, content, 200);
	}
}
