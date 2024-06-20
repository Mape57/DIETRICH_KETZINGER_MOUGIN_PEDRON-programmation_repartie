package rmi;

import serveur.ServeurCentral;

public class BinderTravaux implements BinderInterface {
	@Override
	public void enregistrer(DataRequesterInterface dataRequester) {
		ServeurCentral.distant = (IncidentDataRequesterInterface) dataRequester;
		System.out.println("Le serveur de travaux a été enregistré");
	}
}
