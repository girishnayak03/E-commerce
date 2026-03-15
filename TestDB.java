import java.sql.Connection;
import java.sql.DriverManager;

public class TestDB {
    public static void main(String[] args) throws Exception {
        String[] passwords = {"postgres", "root", "admin", "1234", "password", ""};
        for (String p : passwords) {
            try {
                Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", p);
                System.out.println("SUCCESS: " + p);
                return;
            } catch (Exception e) {
                System.out.println("FAIL: '" + p + "' - " + e.getMessage());
            }
        }
    }
}
