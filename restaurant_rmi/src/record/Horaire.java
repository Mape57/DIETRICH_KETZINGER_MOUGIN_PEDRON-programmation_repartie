package record;

import database.RestaurantDB;
import org.json.JSONObject;

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

		return resultToList(rs);
	}

	public static List<Horaire> getHoraire(int idResto) throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();
		ResultSet rs = s.executeQuery("SELECT * FROM HORAIRES WHERE idResto = " + idResto);

		return resultToList(rs);
	}

	private static List<Horaire> resultToList(ResultSet rs) throws SQLException {
		List<Horaire> horaires = new ArrayList<>();
		while (rs.next()) {
			horaires.add(new Horaire(rs.getInt("idHoraire"), rs.getInt("idResto"), rs.getString("jour"), rs.getInt("hOuverture"), rs.getInt("hFermeture")));
		}
		return horaires;
	}

	public String getJour() {
		return this.jour;
	}

	public int getHeureOuverture() {
		return this.hOuverture;
	}

	public int getHeureFermeture() {
		return this.hFermeture;
	}

	public JSONObject toJSON() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("idHoraire", this.idHoraire);
		jsonObject.put("idResto", this.idResto);
		jsonObject.put("jour", this.jour);
		jsonObject.put("hOuverture", this.hOuverture);
		jsonObject.put("hFermeture", this.hFermeture);
		return jsonObject;
	}
}
