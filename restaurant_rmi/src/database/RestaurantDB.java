package database;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class RestaurantDB {
	private static Connection connection = null;

	private RestaurantDB() {
		Properties prop = getProperty();

		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			connection = DriverManager.getConnection(prop.getProperty("url"), prop.getProperty("user"), prop.getProperty("password"));
		} catch (ClassNotFoundException e) {
			System.out.println("Driver Oracle non trouvé, vérifiez leur installation, sinon suivre le lien suivant.\nhttps://www.oracle.com/fr/database/technologies/appdev/jdbc-downloads.html");
		} catch (SQLException e) {
			System.out.println("Erreur lors de la connexion à la base de données");
			e.printStackTrace();
		}
	}

	private Properties getProperty() {
		Properties prop = new Properties();
		String fileName = "resources/.conf";
		try (FileInputStream fis = new FileInputStream(fileName)) {
			prop.load(fis);
		} catch (FileNotFoundException e) {
			System.out.println("Fichier de configuration introuvable");
		} catch (IOException e) {
			System.out.println("Erreur lors de la lecture du fichier de configuration");
			e.printStackTrace();
		}
		return prop;
	}

	public synchronized static Connection getConnection() {
		if (connection == null) new RestaurantDB();
		return connection;
	}
}
