package song.catalogue.User;

public class UserSqlConstants {
    static final String INSERT_USER = "INSERT INTO db.user (username, password) VALUES (:username, :password)";

    static final String DELETE_USER = "DELETE db.user WHERE username = :username AND password = :password)";

    static final String SELECT_USER = "SELECT username, password, id FROM db.user WHERE username = :username AND password = :password)";
}
