
package song.catalogue.demo.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import song.catalogue.demo.exception.DuplicateEntityException;
import song.catalogue.demo.exception.EntityNotFoundException;

@RestController
@RequestMapping("admin/user")
public class AdminUserResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminUserResource.class);

    private final UserService userService;

    @Autowired
    public AdminUserResource(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody UserModel userModel){
        try {
            userService.createUser(userModel);
            return ResponseEntity.ok("User created successfully.");
        } catch (DuplicateEntityException e) {
            var message = "User with username '%s' already exists.".formatted(userModel.username());
            LOGGER.error(message);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
        } catch (Exception e) {
            var message = "An error occurred white trying to create user.";
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

        @PostMapping("/authenticate")
    public ResponseEntity<String> validateUser(@RequestBody UserModel userModel){
        try {
            userService.validateUser(userModel);
            return ResponseEntity.ok("User authenticated.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        } catch (Exception e) {
            var message = "An error occurred white trying to authenticate user.";
            LOGGER.error(message, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

}
