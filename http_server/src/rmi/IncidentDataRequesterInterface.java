package rmi;

import java.io.Serializable;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface IncidentDataRequesterInterface extends DataRequesterInterface {
	String getData() throws RemoteException;
}
