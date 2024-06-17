package rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface IncidentDataRequesterInterface extends Remote {
	String getData() throws RemoteException;
}
