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
		RestaurantDataRequester rdr = new RestaurantDataRequester();

		Registry registry = LocateRegistry.getRegistry("localhost");
		BinderInterface binder = (BinderInterface) registry.lookup("restaurant");

		RestaurantDataRequesterInterface restaurant = (RestaurantDataRequesterInterface) UnicastRemoteObject.exportObject(rdr, 0);
		binder.enregistrer(restaurant);
	}
}
