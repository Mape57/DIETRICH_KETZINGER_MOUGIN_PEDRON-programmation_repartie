package rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface BinderInterface extends Remote {
	void enregistrer(DataRequesterInterface dataRequester) throws RemoteException;
}
