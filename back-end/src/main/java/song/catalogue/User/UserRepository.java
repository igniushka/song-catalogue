package song.catalogue.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import song.catalogue.common.AbstractRepository;
import static song.catalogue.User.UserSqlConstants.INSERT_USER;
import static song.catalogue.User.UserSqlConstants.SELECT_USER;

@Repository
public class UserRepository extends AbstractRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    public UserRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate){
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    public void createUser(UserModel user){
        var params = new MapSqlParameterSource();
        params.addValue("username", user.username());
        params.addValue("password", user.password());
        namedParameterJdbcTemplate.update(INSERT_USER, params);
    }

    public void selectUser(UserModel user){
        var params = new MapSqlParameterSource();
        params.addValue("username", user.username());
        params.addValue("password", user.password());
        var result = namedParameterJdbcTemplate.update(SELECT_USER, params);
    }

}
