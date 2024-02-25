package song.catalogue.user;

public class UserSqlConstants {
    static final String INSERT_USER = "INSERT INTO db.user (username, password, salt) VALUES (:username, :password, :salt)";

    static final String DELETE_USER = "DELETE db.user WHERE username = :username";

    static final String SELECT_USER = "SELECT username, password, salt FROM db.user WHERE username = :username)";
}
