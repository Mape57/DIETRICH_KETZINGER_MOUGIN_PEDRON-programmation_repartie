package record;

import database.RestaurantDB;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

	public boolean save() throws SQLException {
		if (this.idResto != -1) return false;

		Connection connection = RestaurantDB.getConnection();
		Statement s = connection.createStatement();

		s.executeUpdate("INSERT INTO RESTAURANTS (NOMRESTO, ADR, COORDONNEES, NOTE) VALUES ('" + nomResto + "', '" + adr + "', '" + coordonnees + "', " + note + ")");
		ResultSet rs = s.executeQuery("SELECT MAX(IDRESTO) FROM RESTAURANTS");
		rs.next();
		this.idResto = rs.getInt(1);
		return true;
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

	public static List<LocalDateTime> getReservationPossible(int idResto, int nbConviv, LocalDate date) throws SQLException {
		List<Horaire> horaires = Horaire.getHoraire(idResto, date.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.FRANCE));

		List<LocalDateTime> heures = new ArrayList<>();

		for (Horaire horaire : horaires) {
			int heureDebut = horaire.getHeureOuverture();
			int heureFin = horaire.getHeureFermeture();
			while (heureDebut < heureFin) {
				LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(heureDebut, 0));
				if (Table.getTableLibreFromRestaurant(idResto, nbConviv, dateTime) != null) heures.add(dateTime);
				heureDebut += Reservation.DUREE_RESERVATION;
			}
		}

		return heures;
	}

	public static Restaurant getById(int idResto) throws SQLException {
		Connection connection = RestaurantDB.getConnection();
		Statement rs = connection.createStatement();
		ResultSet result = rs.executeQuery("SELECT * FROM RESTAURANTS WHERE idResto = " + idResto);

		if (!result.next()) return null;
		return new Restaurant(result.getInt("idResto"), result.getString("nomResto"), result.getString("adr"), result.getString("coordonnees"), result.getInt("note"));
	}

	public int getIdResto() {
		return this.idResto;
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

	public JSONObject toJSON() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("idResto", this.idResto);
		jsonObject.put("nomResto", this.nomResto);
		jsonObject.put("adr", this.adr);
		jsonObject.put("coordonnees", this.coordonnees);
		jsonObject.put("note", this.note);
		return jsonObject;
	}
}
