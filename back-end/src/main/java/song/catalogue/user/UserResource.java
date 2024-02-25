
package song.catalogue.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import song.catalogue.AES.EncryptionService;

@RestController
public class UserResource {
    private final UserRepository repository;
    private final EncryptionService encryptionService;

    @Autowired
    public UserResource(UserRepository repository, EncryptionService encryptionService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
    }
}
