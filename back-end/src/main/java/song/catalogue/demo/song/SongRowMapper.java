package song.catalogue.demo.song;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class SongRowMapper implements RowMapper<SongModel> {

    @Override
    public SongModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new SongModel(
                rs.getString("id"),
                rs.getString("name"),
                rs.getString("artist"),
                rs.getString("album"),
                rs.getString("genre"),
                rs.getInt("length"),
                rs.getInt("release_year")
        );
    }
}
