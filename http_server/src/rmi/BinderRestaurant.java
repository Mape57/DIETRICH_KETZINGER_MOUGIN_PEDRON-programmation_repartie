package rmi;

import serveur.ServeurCentral;

import java.rmi.RemoteException;

public class BinderRestaurant implements BinderInterface {
	@Override
	public void enregistrer(DataRequesterInterface dataRequester) throws RemoteException {
		ServeurCentral.restaurant = (RestaurantDataRequesterInterface) dataRequester;
		System.out.println("Le serveur de restaurant a été enregistré");
	}
}
