
package song.catalogue.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import song.catalogue.demo.AES.EncryptionService;

@RestController
@RequestMapping("/user")
public class UserResource {
    private final UserService userService;
    private final EncryptionService encryptionService;

    @Autowired
    public UserResource(UserService userService, EncryptionService encryptionService) {
        this.userService = userService;
        this.encryptionService = encryptionService;
    }

//    @PostMapping("admin/create")
//    public ResponseEntity createUser(@RequestBody UserModel userModel){
//        try {
//            userService.createUser(userModel);
//            return null;
//        } catch (DuplicateEntityException e) {
//            return null;
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    @PostMapping("admin/authenticate")
//    public ResponseEntity validateUser(@RequestBody UserModel userModel){
//        try {
//            userService.validateUser(userModel);
//            return null;
//        } catch (DuplicateEntityException e) {
//            return null;
//        } catch (Exception e) {
//            return null;
//        }
//    }

}
