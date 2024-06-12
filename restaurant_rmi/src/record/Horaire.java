package record;

public class Horaire {
	private int idHoraire;
	private int idResto;
	private String jour;
	private int hOuverture;
	private int hFermeture;

	private	Horaire(int idHoraire, int idResto, String jour, int hOuverture, int hFermeture) {
		this.idHoraire = idHoraire;
		this.idResto = idResto;
		this.jour = jour;
		this.hOuverture = hOuverture;
		this.hFermeture = hFermeture;
	}

	public Horaire(int idResto, String jour, int hOuverture, int hFermeture) {
		this(-1, idResto, jour, hOuverture, hFermeture);
	}
}
