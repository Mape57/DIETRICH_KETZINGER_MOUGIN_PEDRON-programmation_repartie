package record;

import database.RestaurantDB;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Reservation {
	private int idReserv;
	private int idTable;
	private String nom;
	private String prenom;
	private int nbConviv;
	private String numTel;
	private LocalDateTime dateRes;
	public static final int DUREE_RESERVATION = 1;

	private Reservation(int idReservation, int idTable, String nom, String prenom, int nbConviv, String numTel, LocalDateTime dateRes) {
		this.idReserv = idReservation;
		this.idTable = idTable;
		this.nom = nom;
		this.prenom = prenom;
		this.nbConviv = nbConviv;
		this.numTel = numTel;
		this.dateRes = dateRes;
	}

	public Reservation(int idTable, String nom, String prenom, int nbConviv, String numTel, LocalDateTime dateRes) {
		this(-1, idTable, nom, prenom, nbConviv, numTel, dateRes);
	}

	public static boolean isTableLibre(int idTable, LocalDateTime date) throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String dateStr = date.format(formatter);

		return !s.executeQuery("SELECT IDRESERV FROM RESERVATIONS WHERE IDTABLE = " + idTable + " AND to_date('" + dateStr + "', 'YYYY-MM-DD HH24:MI:SS') BETWEEN dateRes AND DATERES + INTERVAL '" + (DUREE_RESERVATION * 60 - 1) + "' MINUTE").next();
	}

	public boolean save() throws SQLException {
		if (this.idReserv != -1) return false;

		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String dateStr = dateRes.format(formatter);

		s.executeUpdate("INSERT INTO RESERVATIONS (IDTABLE, NOM, PRENOM, NBCONVIV, NUMTEL, DATERES) VALUES (" + idTable + ", '" + nom + "', '" + prenom + "', " + nbConviv + ", '" + numTel + "', to_date('" + dateStr + "', 'YYYY-MM-DD HH24:MI:SS'))");
		ResultSet rs = s.executeQuery("SELECT MAX(IDRESERV) FROM RESERVATIONS");
		rs.next();
		this.idReserv = rs.getInt(1);
		return true;
	}

	public JSONObject toJSON() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("idReserv", idReserv);
		jsonObject.put("idTable", idTable);
		jsonObject.put("nom", nom);
		jsonObject.put("prenom", prenom);
		jsonObject.put("nbConviv", nbConviv);
		jsonObject.put("numTel", numTel);
		jsonObject.put("dateRes", dateRes.toString());
		return jsonObject;
	}
}
