package rmi;

import data_access_method.FetchingMethod;
import data_access_method.ProxyMethod;

import java.io.IOException;

public class IncidentDataRequester implements IncidentDataRequesterInterface {
	@Override
	public String getData(String urlStr) {
		try {
			System.out.println("Tentative d'obtention avec un fetch.");
			String data = new FetchingMethod().getData(urlStr).toString();
			System.out.println("La methode fetch a reussi.");
			return data;
		} catch (IOException ex) {
			System.out.println("La methode fetch a echoue. \nCause : " + ex.getCause() + "\n");
		}

		try {
			System.out.println("Tentative d'obtention via le proxy.");
			String data = new ProxyMethod().getData(urlStr).toString();
			System.out.println("La methode proxy a reussi.");
			return data;
		} catch (IOException e) {
			System.out.println("La methode proxy a echoue.");
			throw new RuntimeException(e);
		}
	}
}
