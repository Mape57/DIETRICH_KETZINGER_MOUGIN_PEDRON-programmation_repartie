package rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RestaurantDataRequesterInterface extends Remote {
	String getAllRestaurantPosition() throws RemoteException;
	String getRestaurantById(int idResto) throws RemoteException;
}
