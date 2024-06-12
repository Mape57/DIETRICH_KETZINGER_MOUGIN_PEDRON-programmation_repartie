package serveur;

import com.sun.net.httpserver.HttpServer;
import handler.GetRestaurantById;
import handler.GetRestaurantLocations;
import rmi.DataRequester;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.rmi.NotBoundException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class ServeurCentral {
	public static DataRequester restaurant;

	public static void main(String[] args) throws IOException, NotBoundException {
		System.out.println("Lancement du serveur...");
		System.out.println("Récupération du RMI");
		Registry registry = LocateRegistry.getRegistry("localhost");
		restaurant = (DataRequester) registry.lookup("restaurant");

		HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
		server.createContext("/restaurants", new GetRestaurantLocations());
		server.createContext("/restaurants/", new GetRestaurantById());

		server.start();
		System.out.println("Serveur lancé");
	}
}
