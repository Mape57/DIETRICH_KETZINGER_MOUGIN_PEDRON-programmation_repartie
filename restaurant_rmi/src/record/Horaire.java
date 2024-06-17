package record;

import database.RestaurantDB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Horaire {
	private int idHoraire;
	private int idResto;
	private String jour;
	private int hOuverture;
	private int hFermeture;

	private Horaire(int idHoraire, int idResto, String jour, int hOuverture, int hFermeture) {
		this.idHoraire = idHoraire;
		this.idResto = idResto;
		this.jour = jour;
		this.hOuverture = hOuverture;
		this.hFermeture = hFermeture;
	}

	public Horaire(int idResto, String jour, int hOuverture, int hFermeture) {
		this(-1, idResto, jour, hOuverture, hFermeture);
	}

	public static List<Horaire> getHoraire(int idResto, String jour) throws SQLException {
		jour = jour.toUpperCase().charAt(0) + jour.substring(1).toLowerCase();

		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();
		ResultSet rs = s.executeQuery("SELECT * FROM HORAIRES WHERE idResto = " + idResto + " AND jour = '" + jour + "'");
		List<Horaire> horaires = new ArrayList<>();
		while (rs.next()) {
			horaires.add(new Horaire(rs.getInt("idHoraire"), rs.getInt("idResto"), rs.getString("jour"), rs.getInt("hOuverture"), rs.getInt("hFermeture")));
		}
		return horaires;
	}

	public int getHeureOuverture() {
		return this.hOuverture;
	}

	public int getHeureFermeture() {
		return this.hFermeture;
	}
}
