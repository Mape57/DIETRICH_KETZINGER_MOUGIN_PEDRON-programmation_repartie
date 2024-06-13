package data_access_method;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class FetchingMethod implements AccessMethod {
	@Override
	public JSONObject getData() throws IOException {
		URL url = new URL("https://carto.g-ny.org/data/cifs/cifs_waze_v2.json");

		// se connecte à l'URL et récupère les données
		URLConnection con = url.openConnection();
		InputStream is = con.getInputStream();

		// convertit les données en objet JSON
		StringBuilder json = new StringBuilder();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
			String line;
			while ((line = br.readLine()) != null) {
				json.append(line);
			}
		}

		return new JSONObject(json.toString());
	}
}
