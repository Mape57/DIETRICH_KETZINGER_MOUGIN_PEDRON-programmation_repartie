package data_access_method;

import org.json.JSONObject;

import java.io.IOException;

public interface AccessMethod {
	JSONObject getData(String url) throws IOException;
}
