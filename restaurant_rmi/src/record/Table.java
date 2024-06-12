package record;

public class Table {
	private int idTable;
	private int idResto;
	private int numTable;
	private int nbPlaces;

	private Table(int idTable, int idResto, int numTable, int nbPlaces) {
		this.idTable = idTable;
		this.idResto = idResto;
		this.numTable = numTable;
		this.nbPlaces = nbPlaces;
	}

	public Table(int idResto, int numTable, int nbPlaces) {
		this(-1, idResto, numTable, nbPlaces);
	}
}
