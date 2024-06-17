package rmi;

import serveur.ServeurCentral;

import java.rmi.RemoteException;

public class BinderTravaux implements BinderInterface {
	@Override
	public void enregistrer(DataRequesterInterface dataRequester) {
		ServeurCentral.incident = (IncidentDataRequesterInterface) dataRequester;
	}
}
