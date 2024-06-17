package rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface RestaurantDataRequesterInterface extends Remote {
	String getPossibleReservation(int idResto, int nbConviv, LocalDate date) throws RemoteException;

	String postReservation(int idResto, String nom, String prenom, int nbConviv, String numTel, LocalDateTime date) throws RemoteException;

	String getAllRestaurantPosition() throws RemoteException;

	String getRestaurantById(int idResto) throws RemoteException;
}
