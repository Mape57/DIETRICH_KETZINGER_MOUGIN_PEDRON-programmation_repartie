package rmi;

import java.rmi.RemoteException;

public interface IncidentDataRequesterInterface extends DataRequesterInterface {
	String getData(String url) throws RemoteException;
}
