package record;

import database.RestaurantDB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Restaurant {
	private int idResto;
	private String nomResto;
	private String adr;
	private String coordonnees;
	private int note;

	private Restaurant(int idResto, String nomResto, String adr, String coordonnees, int note) {
		this.idResto = idResto;
		this.nomResto = nomResto;
		this.adr = adr;
		this.coordonnees = coordonnees;
		this.note = note;
	}

	public Restaurant(String nomResto, String adr, String coordonnees, int note) {
		this(-1, nomResto, adr, coordonnees, note);
	}

	public static List<Restaurant> getAll() throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement rs = connection.createStatement();
		ResultSet result = rs.executeQuery("SELECT * FROM RESTAURANTS");

		List<Restaurant> restaurants = new ArrayList<>();
		while (result.next()) {
			restaurants.add(new Restaurant(result.getInt("idResto"), result.getString("nomResto"), result.getString("adr"), result.getString("coordonnees"), result.getInt("note")));
		}
		return restaurants;
	}

	public static Restaurant getById(int idResto) throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement rs = connection.createStatement();
		ResultSet result = rs.executeQuery("SELECT * FROM RESTAURANTS WHERE idResto = " + idResto);

		if (!result.next()) return null;
		return new Restaurant(result.getInt("idResto"), result.getString("nomResto"), result.getString("adr"), result.getString("coordonnees"), result.getInt("note"));
	}

	public int getIdResto() {
		return idResto;
	}

	public String getNomResto() {
		return this.nomResto;
	}

	public String getAdr() {
		return this.adr;
	}

	public String getCoordonnees() {
		return this.coordonnees;
	}

	public int getNote() {
		return this.note;
	}
}
