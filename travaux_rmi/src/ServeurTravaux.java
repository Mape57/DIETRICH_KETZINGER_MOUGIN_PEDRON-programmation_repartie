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
		System.out.println("Lancement du serveur...");
		IncidentDataRequester rdr = new IncidentDataRequester();

		System.out.println("Récupération du registre RMI");
		Registry registry = LocateRegistry.getRegistry("localhost");
		System.out.println("Récupération du binder\n");
		BinderInterface binder = (BinderInterface) registry.lookup("travaux");

		System.out.println("Enregistrement du restaurant");
		IncidentDataRequesterInterface restaurant = (IncidentDataRequesterInterface) UnicastRemoteObject.exportObject(rdr, 0);
		binder.enregistrer(restaurant);
		System.out.println("Enregistrement effectué\n");
		System.out.println("Serveur lancé");
	}
}
