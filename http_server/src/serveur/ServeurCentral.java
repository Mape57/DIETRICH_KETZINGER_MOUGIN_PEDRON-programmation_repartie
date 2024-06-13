package serveur;

import com.sun.net.httpserver.HttpServer;
import handler.restaurant.GetRestaurantById;
import handler.restaurant.GetRestaurantLocations;
import handler.travaux.GetTravaux;
import rmi.IncidentDataRequesterInterface;
import rmi.RestaurantDataRequesterInterface;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class ServeurCentral {
	public static RestaurantDataRequesterInterface restaurant;
	public static IncidentDataRequesterInterface incident;

	public static void main(String[] args) throws IOException, NotBoundException {
		System.out.println("Lancement du serveur...");

		try {
			setupRestaurant();
		} catch (RemoteException | NotBoundException e) {
			System.out.println("Erreur lors de la récupération du RMI restaurant");
		}

		try {
			setupIncident();
		} catch (RemoteException | NotBoundException e) {
			System.out.println("Erreur lors de la récupération du RMI travaux");
		}

		System.out.println("Création du serveur HTTP");
		HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
		server.createContext("/restaurants", new GetRestaurantLocations());
		server.createContext("/restaurants/", new GetRestaurantById());
		server.createContext("/travaux", new GetTravaux());
		server.start();

		System.out.println("Serveur lancé");
	}

	private static void setupRestaurant() throws RemoteException, NotBoundException {
		System.out.println("Récupération du RMI restaurant");
		Registry registryRestaurant = LocateRegistry.getRegistry("localhost");
		restaurant = (RestaurantDataRequesterInterface) registryRestaurant.lookup("restaurant");
		System.out.println("Récupération du RMI restaurant effectuée\n");
	}

	private static void setupIncident() throws RemoteException, NotBoundException {
		System.out.println("Récupération du RMI travaux");
		Registry registryTravaux = LocateRegistry.getRegistry("localhost");
		incident = (IncidentDataRequesterInterface) registryTravaux.lookup("incident");
		System.out.println("Récupération du RMI travaux effectuée\n");
	}
}
