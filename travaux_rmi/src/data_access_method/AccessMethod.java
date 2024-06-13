package data_access_method;

import org.json.JSONObject;

import java.io.IOException;
import java.net.MalformedURLException;

public interface AccessMethod {
	JSONObject getData() throws IOException;
}
