package tools;

import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;

public class ExchangeContentSender {
	public static void send(HttpExchange exchange, String content) throws IOException {
		// Set headers for CORS
		exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
		exchange.getResponseHeaders().add("Content-Type", "application/json");

		// Send response
		exchange.sendResponseHeaders(200, content.getBytes().length);
		OutputStream os = exchange.getResponseBody();
		os.write(content.getBytes());
		os.close();
	}
}
