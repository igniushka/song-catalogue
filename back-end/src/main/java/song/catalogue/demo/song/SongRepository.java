package song.catalogue.demo.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SongRepository  {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SongRowMapper rowMapper;

    @Autowired
    public SongRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate, SongRowMapper rowMapper){
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.rowMapper = rowMapper;
    }

    public void createSong(String user, SongModel song){
        var params = new MapSqlParameterSource();
        params.addValue("username",user);
        params.addValue("name", song.name());
        params.addValue("artist", song.artist());
        params.addValue("genre", song.genre());
        params.addValue("album", song.album());
        params.addValue("release_year", song.year());
        params.addValue("length", song.length());
        namedParameterJdbcTemplate.update(SongSqlConstants.INSERT_SONG, params);
    }

    public void updateSong(String user, SongModel song){
        var params = new MapSqlParameterSource();
        params.addValue("username",user);
        params.addValue("id", song.id());
        params.addValue("name", song.name());
        params.addValue("artist", song.artist());
        params.addValue("genre", song.genre());
        params.addValue("album", song.album());
        params.addValue("release_year", song.year());
        params.addValue("length", song.length());
        namedParameterJdbcTemplate.update(SongSqlConstants.UPDATE_SONG, params);
    }

    public void deleteSong(String user, String song_id){
        var params = new MapSqlParameterSource();
        params.addValue("username", user);
        params.addValue("id", song_id);
        namedParameterJdbcTemplate.update(SongSqlConstants.DELETE_SONG, params);
    }

    public List<SongModel> getAllUserSongs(String user){
        var params = new MapSqlParameterSource();
        params.addValue("username", user);
        return namedParameterJdbcTemplate.query(SongSqlConstants.GET_ALL_SONGS_FOR_USER, params, rowMapper);
    }
}
