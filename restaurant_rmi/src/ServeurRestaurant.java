import rmi.BinderInterface;
import rmi.RestaurantDataRequester;
import rmi.RestaurantDataRequesterInterface;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class ServeurRestaurant {
	public static void main(String[] args) throws NotBoundException, RemoteException {
		System.out.println("Lancement du serveur...");
		RestaurantDataRequester rdr = new RestaurantDataRequester();

		System.out.println("Récupération du registre RMI");
		Registry registry = LocateRegistry.getRegistry("localhost");
		System.out.println("Récupération du binder\n");
		BinderInterface binder = (BinderInterface) registry.lookup("restaurant");

		System.out.println("Enregistrement du restaurant");
		RestaurantDataRequesterInterface restaurant = (RestaurantDataRequesterInterface) UnicastRemoteObject.exportObject(rdr, 0);
		binder.enregistrer(restaurant);
		System.out.println("Enregistrement effectué\n");
		System.out.println("Serveur lancé");
	}
}
