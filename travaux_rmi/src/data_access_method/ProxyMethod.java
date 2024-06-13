package data_access_method;

import org.json.JSONObject;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ProxySelector;
import java.net.http.HttpClient;
import java.net.http.HttpConnectTimeoutException;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;

public class ProxyMethod implements AccessMethod {
	@Override
	public JSONObject getData() throws IOException {
		// crée un client HTTP avec le proxy de l'IUT
		HttpClient client = HttpClient.newBuilder()
				.version(HttpClient.Version.HTTP_1_1)
				.followRedirects(HttpClient.Redirect.NORMAL)
				.connectTimeout(Duration.ofSeconds(20))
				.proxy(ProxySelector.of(new InetSocketAddress("www-cache.iutnc.univ-lorraine.fr", 3128)))
				.build();

		// crée une requête pour obtenir les données
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://carto.g-ny.org/data/cifs/cifs_waze_v2.json"))
				.build();

		// envoie la requête et récupère la réponse
		HttpResponse<String> response = null;
		try {
			response = client.send(request, HttpResponse.BodyHandlers.ofString());
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}

		return new JSONObject(response.body());
	}
}