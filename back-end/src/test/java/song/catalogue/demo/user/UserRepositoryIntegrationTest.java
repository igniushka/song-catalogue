package song.catalogue.demo.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
@AutoConfigureWebTestClient
@ActiveProfiles("dev")
@ExtendWith(SpringExtension.class)
public class UserRepositoryIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testCreateUserSuccess() {
//      given
        var USERNAME = "username";
        var PASSWORD = "password";
        var SALT = "salt";

//      when
        userRepository.createUser(USERNAME, PASSWORD, SALT);

//      then
        var insertedUser = userRepository.selectUser(USERNAME);
        assertThat(insertedUser.username()).isEqualTo(USERNAME);
        assertThat(insertedUser.password()).isEqualTo(PASSWORD);
        assertThat(insertedUser.salt()).isEqualTo(SALT);
    }

    @Test
    public void testCreateDuplicateUser() {
//      given
        var USERNAME = "username";
        var PASSWORD = "password";
        var SALT = "salt";

//      when
        userRepository.createUser(USERNAME, PASSWORD, SALT);

//      then
        assertThrows(DuplicateKeyException.class, () -> {
            userRepository.createUser(USERNAME, PASSWORD, SALT);
        });
    }

    @Test
    public void testSelectNonExistentUser() {
//      given
//      no user is inserted

//      when
        var user = userRepository.selectUser("username");
//      then
        assertNull(user);
    }
}
