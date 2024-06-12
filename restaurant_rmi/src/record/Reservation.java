package record;

import java.time.LocalTime;

public class Reservation {
	private int idReservation;
	private int idTable;
	private String nom;
	private String prenom;
	private int nbConviv;
	private String numTel;
	private LocalTime dateRes;

	private Reservation(int idReservation, int idTable, String nom, String prenom, int nbConviv, String numTel, LocalTime dateRes) {
		this.idReservation = idReservation;
		this.idTable = idTable;
		this.nom = nom;
		this.prenom = prenom;
		this.nbConviv = nbConviv;
		this.numTel = numTel;
		this.dateRes = dateRes;
	}

	public Reservation(int idTable, String nom, String prenom, int nbConviv, String numTel, LocalTime dateRes) {
		this(-1, idTable, nom, prenom, nbConviv, numTel, dateRes);
	}
}
