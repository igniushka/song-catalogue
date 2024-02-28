package song.catalogue.demo.song;

public class SongSqlConstants {
    static final String INSERT_SONG = "INSERT INTO public.song (username, name, artist, album, genre, release_year, " +
            "length) VALUES (:username, :name, :artist, :album, :genre, :release_year, :length)";

    static final String DELETE_SONG = "DELETE FROM public.song WHERE id = :id::uuid and username = :username";

    static final String UPDATE_SONG = "UPDATE public.song SET name = :name, artist = :artist, album = :album," +
            "genre = :genre, release_year = :release_year, length = :length WHERE id = :id::uuid AND username = :username";

    static final String GET_ALL_SONGS_FOR_USER ="SELECT id, name, artist, album, genre, release_year, length " +
            "FROM public.song WHERE username = :username";
}
