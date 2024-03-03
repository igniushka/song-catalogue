package song.catalogue.demo.song;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/song")
public class SongResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(song.catalogue.demo.song.SongResource.class);
    private final SongRepository repository;

    @Autowired
    public SongResource(SongRepository repository) {
        this.repository = repository;
    }
    @PostMapping
    public ResponseEntity<String> createSong(@RequestBody SongModel song, @RequestAttribute("user") String user){
        try {
            repository.createSong(user, song);
            return ResponseEntity.ok("Song created.");
        } catch (Exception e) {
            var message = "An error occurred white trying to create song for user %s.".formatted(user);
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateSong(@RequestBody SongModel song, @RequestAttribute("user") String user){
        try {
            repository.updateSong(user, song);
            return ResponseEntity.ok("Song updated.");
        } catch (Exception e) {
            var message = "An error occurred white trying to update song %s for user %s.".formatted(song.id(), user);
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

    @GetMapping
    public ResponseEntity getAllUserSongs(@RequestAttribute("user") String user){
        try {
            var songs =  repository.getAllUserSongs(user);
            return ResponseEntity.ok().body(songs);
        } catch (Exception e) {
            var message = "An error occurred white trying to retrieve songs for user %s.".formatted(user);
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

    @DeleteMapping("/{song_id}")
    public ResponseEntity deleteSong(@PathVariable String song_id, @RequestAttribute("user") String user){
        try {
            repository.deleteSong(user, song_id);
            return ResponseEntity.ok().body(song_id);
        } catch (Exception e) {
            var message = "An error occurred white trying to delete song %s for user %s.".formatted(song_id, user);
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

}
