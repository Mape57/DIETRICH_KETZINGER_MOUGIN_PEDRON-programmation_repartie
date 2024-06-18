package serveur;

import com.sun.net.httpserver.HttpsServer;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import javax.net.ssl.*;

import com.sun.net.httpserver.HttpServer;
import handler.restaurant.ReservationHandler;
import handler.restaurant.RestaurantByIdHandler;
import handler.restaurant.RestaurantsHandler;
import handler.travaux.TravauxHandler;
import rmi.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.rmi.AlreadyBoundException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.security.KeyStore;
import java.util.Objects;

public class ServeurCentral {
	public static RestaurantDataRequesterInterface restaurant;
	public static IncidentDataRequesterInterface incident;

	public static void main(String[] args) throws IOException, AlreadyBoundException {
		System.out.println("Lancement du serveur...");

		System.out.println("Récupération du registre RMI\n");
		Registry registry = LocateRegistry.getRegistry();

		rebindRestaurant(registry);
		rebindTravaux(registry);

		HttpsServer server = HttpsServer.create(new InetSocketAddress(8080), 0);
		server.setHttpsConfigurator(new HttpsConfigurator(Objects.requireNonNull(createSSLContext())));
		server.createContext("/restaurants/", new RestaurantByIdHandler());
		server.createContext("/restaurants", new RestaurantsHandler());
		server.createContext("/reservation", new ReservationHandler());
		server.createContext("/travaux", new TravauxHandler());
		server.start();

		System.out.println("Serveur lancé");
	}

	private static void rebindRestaurant(Registry registry) {
		try {
			System.out.println("Placement du registre restaurant...");
			BinderRestaurant binderRestaurant = new BinderRestaurant();
			BinderInterface binderRestaurantStub = (BinderInterface) UnicastRemoteObject.exportObject(binderRestaurant, 0);
			registry.rebind("restaurant", binderRestaurantStub);
			System.out.println("Placement du registre restaurant effectué\n");
		} catch (Exception e) {
			System.out.println("Erreur lors du rebind du registre restaurant");
		}
	}

	private static void rebindTravaux(Registry registry) {
		try {
			System.out.println("Placement du registre travaux...");
			BinderTravaux binderTravaux = new BinderTravaux();
			BinderInterface binderTravauxStub = (BinderInterface) UnicastRemoteObject.exportObject(binderTravaux, 0);
			registry.rebind("travaux", binderTravauxStub);
			System.out.println("Placement du registre travaux effectué\n");
		} catch (Exception e) {
			System.out.println("Erreur lors du rebind du registre travaux");
		}
	}

	private static SSLContext createSSLContext() {
		try {
			// Generate a keystore, replace "password" and "myKeyStore.jks" with your actual password and keystore file
			char[] password = "password".toCharArray();
			KeyStore ks = KeyStore.getInstance("JKS");
			FileInputStream fis = new FileInputStream("keystore.jks");
			ks.load(fis, password);

			// Set up the key manager factory
			KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
			kmf.init(ks, password);

			// Set up the trust manager factory
			TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
			tmf.init(ks);

			// Set up the HTTPS context and parameters
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
			return sslContext;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
