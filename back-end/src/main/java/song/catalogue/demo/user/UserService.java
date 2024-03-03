package song.catalogue.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import song.catalogue.demo.security.EncryptionService;
import song.catalogue.demo.exception.DuplicateEntityException;
import song.catalogue.demo.exception.EntityNotFoundException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
public class UserService {
    private final UserRepository repository;
    private final EncryptionService encryptionService;

    @Autowired
    public UserService(UserRepository repository, EncryptionService encryptionService){
        this.repository = repository;
        this.encryptionService = encryptionService;
    }

    public void createUser(UserModel userModel) throws InvalidAlgorithmParameterException,
            NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException,
            BadPaddingException, InvalidKeyException, DuplicateEntityException {
//        check if username is taken
        var existing_user = repository.selectUser(userModel.username());
        if (existing_user == null){
                var salt = encryptionService.generateSalt();
                var encryptedPassword = encryptionService.encrypt(userModel.password(), salt);
//                var encryptedPassword = encryptionService.encrypt(userModel.password());

            repository.createUser(userModel.username(), encryptedPassword, salt);
        } else {
            throw new DuplicateEntityException("Username already exists!");
        }
    }

    public void deleteUser(UserModel userModel) {
        var existing_user = repository.selectUser(userModel.username());
        if (existing_user == null){
            throw new EntityNotFoundException("Username not found!");
        } else {
            repository.deleteUser(userModel.username());
        }
    }

    public void validateUser(UserModel userModel) throws InvalidAlgorithmParameterException, NoSuchPaddingException,
            IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeySpecException,
            EntityNotFoundException, InvalidKeyException {
        var existing_user = repository.selectUser(userModel.username());
        if (existing_user == null){
            throw new EntityNotFoundException("Username not found!");
        } else {
            var decrypted_pass = encryptionService.decrypt(existing_user.password(), existing_user.salt());
             if (!decrypted_pass.equals(userModel.password())){
                 throw new EntityNotFoundException("Invalid password!");
             }
        }
    }

}
