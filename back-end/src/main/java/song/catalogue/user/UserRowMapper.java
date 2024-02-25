package song.catalogue.user;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class UserRowMapper implements RowMapper<UserModel> {

    @Override
    public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UserModel(
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("salt"));
    }
}
