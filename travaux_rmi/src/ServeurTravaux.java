import rmi.BinderInterface;
import rmi.IncidentDataRequester;
import rmi.IncidentDataRequesterInterface;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class ServeurTravaux {
	public static void main(String[] args) throws RemoteException, NotBoundException {
		IncidentDataRequester rdr = new IncidentDataRequester();

		Registry registry = LocateRegistry.getRegistry("localhost");
		BinderInterface binder = (BinderInterface) registry.lookup("travaux");

		IncidentDataRequesterInterface restaurant = (IncidentDataRequesterInterface) UnicastRemoteObject.exportObject(rdr, 0);
		binder.enregistrer(restaurant);
	}
}
