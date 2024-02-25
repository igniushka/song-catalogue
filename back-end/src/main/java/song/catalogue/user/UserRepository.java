package song.catalogue.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import static song.catalogue.user.UserSqlConstants.*;

@Repository
public class UserRepository  {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final UserRowMapper rowMapper;

    @Autowired
    public UserRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate, UserRowMapper rowMapper){
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.rowMapper = rowMapper;
    }

    public void createUser(String username, String password, String salt){
        var params = new MapSqlParameterSource();
        params.addValue("username",username);
        params.addValue("password", password);
        params.addValue("salt", salt);
        namedParameterJdbcTemplate.update(INSERT_USER, params);
    }

    public UserModel selectUser(String username){
        var params = new MapSqlParameterSource();
        params.addValue("username", username);
        var users = namedParameterJdbcTemplate.query(SELECT_USER, params, rowMapper);
        if (users.isEmpty()){
            return null;
        } else {
            return users.get(0);
        }
    }

    public void deleteUser(String username){
        var params = new MapSqlParameterSource();
        params.addValue("username", username);
        var result = namedParameterJdbcTemplate.update(DELETE_USER, params);
    }
}
