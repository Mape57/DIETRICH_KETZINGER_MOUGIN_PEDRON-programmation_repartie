package tools;

import java.util.HashMap;
import java.util.Map;

public class QueryParser {
	public static Map<String, String> parse(String query) {
		Map<String, String> map = new HashMap<>();

		if (query == null) return map;

		String[] params = query.split("&");
		for (String param : params) {
			String[] keyValue = param.split("=");
			map.put(keyValue[0], keyValue[1]);
		}
		return map;
	}
}
