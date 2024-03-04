package song.catalogue.demo.song;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SongModel(
        @JsonProperty("id") String id,
        @JsonProperty("name") String name,
        @JsonProperty("artist") String artist,
        @JsonProperty("album") String album,
        @JsonProperty("genre") String genre,
        @JsonProperty("length") int length,
        @JsonProperty("year") int year
) {
}
