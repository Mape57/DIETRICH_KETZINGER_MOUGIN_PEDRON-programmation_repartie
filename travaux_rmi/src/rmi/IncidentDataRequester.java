package rmi;

import data_access_method.FetchingMethod;
import data_access_method.ProxyMethod;

import java.io.IOException;
import java.net.http.HttpConnectTimeoutException;
import java.rmi.RemoteException;

public class IncidentDataRequester implements IncidentDataRequesterInterface {
	@Override
	public String getData() {
		try {
			System.out.println("Tentative d'obtention avec un fetch.");
			String data = new FetchingMethod().getData().toString();
			System.out.println("La methode fetch a reussi.");
			return data;
		} catch (IOException ex) {
			System.out.println("La methode fetch a echoue. \nCause : " + ex.getCause() + "\n");
		}

		try {
			System.out.println("Tentative d'obtention via le proxy.");
			String data = new ProxyMethod().getData().toString();
			System.out.println("La methode proxy a reussi.");
			return data;
		} catch (IOException e) {
			System.out.println("La methode proxy a echoue.");
			throw new RuntimeException(e);
		}
	}
}
