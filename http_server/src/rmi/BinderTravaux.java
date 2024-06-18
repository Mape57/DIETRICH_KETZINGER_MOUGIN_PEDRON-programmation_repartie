package rmi;

import serveur.ServeurCentral;

public class BinderTravaux implements BinderInterface {
	@Override
	public void enregistrer(DataRequesterInterface dataRequester) {
		ServeurCentral.incident = (IncidentDataRequesterInterface) dataRequester;
		System.out.println("Le serveur de travaux a été enregistré");
	}
}
