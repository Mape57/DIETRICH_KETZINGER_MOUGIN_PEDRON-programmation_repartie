package record;

import database.RestaurantDB;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;

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

	public static Table getTableLibreFromRestaurant(int idResto, int nbConviv, LocalDateTime date) throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();
		ResultSet rs = s.executeQuery("SELECT * FROM TABLES WHERE IDRESTO = " + idResto + " AND NBPLACES >= " + nbConviv + " ORDER BY NBPLACES");

		while (rs.next()) {
			if (Reservation.isTableLibre(rs.getInt("IDTABLE"), date)) {
				return new Table(rs.getInt("IDTABLE"), rs.getInt("IDRESTO"), rs.getInt("NUMTABLE"), rs.getInt("NBPLACES"));
			}
		}
		return null;
	}

	public int getIdTable() {
		return idTable;
	}

	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		json.put("idTable", idTable);
		json.put("idResto", idResto);
		json.put("numTable", numTable);
		json.put("nbPlaces", nbPlaces);
		return json;
	}
}
