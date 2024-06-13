import rmi.RestaurantDataRequesterInterface;
import rmi.RestaurantDataRequester;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class ServeurRestaurant {
	public static void main(String[] args) throws RemoteException {
		System.out.println("Lancement du serveur RMI...");
		System.out.println("Création de l'objet distant.");
		RestaurantDataRequester rdr = new RestaurantDataRequester();
		RestaurantDataRequesterInterface dr = (RestaurantDataRequesterInterface) UnicastRemoteObject.exportObject(rdr, 0);

		System.out.println("Enregistrement de l'objet distant sur le registre.");
		Registry registry = LocateRegistry.getRegistry();
		registry.rebind("restaurant", dr);

		System.out.println("Serveur RMI lancé.");
	}
}
