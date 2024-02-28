package song.catalogue.demo.user;

public class UserSqlConstants {
    static final String INSERT_USER = "INSERT INTO public.user (username, password, salt) VALUES (:username, :password, :salt)";

    static final String DELETE_USER = "DELETE public.user WHERE username = :username";

    static final String SELECT_USER = "SELECT username, password, salt FROM public.user WHERE username = :username";
}
