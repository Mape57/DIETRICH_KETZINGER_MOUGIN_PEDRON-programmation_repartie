package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class RestaurantDB {
	private static Connection connection = null;

	private RestaurantDB() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url= "jdbc:oracle:thin:@charlemagne.iutnc.univ-lorraine.fr:1521:infodb";
			connection = DriverManager.getConnection(url, "pedron7u", "motdepasse");
		} catch (ClassNotFoundException e) {
			System.out.println("Driver Oracle non trouvé, vérifiez leur installation, sinon suivre le lien suivant.\nhttps://www.oracle.com/fr/database/technologies/appdev/jdbc-downloads.html");
			throw new RuntimeException(e);
		} catch (SQLException e) {
			System.out.println("Erreur lors de la connexion à la base de données");
			throw new RuntimeException(e);
		}
	}

	public synchronized static Connection getConnection () {
		if (connection == null) new RestaurantDB();
		return connection;
	}
}
