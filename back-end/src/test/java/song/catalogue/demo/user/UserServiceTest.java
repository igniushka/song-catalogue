package song.catalogue.demo.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import song.catalogue.demo.exception.DuplicateEntityException;
import song.catalogue.demo.security.EncryptionService;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.doThrow;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository repository;
    @Mock
    private EncryptionService encryptionService;
    @InjectMocks
    private UserService userService;
    private static final String USERNAME = "username";
    private static final String PASSWORD = "password";
    private static final String ENCODED_PASSWORD = "cGFzc3dvcmQ=";
    private static final String SALT = "salt";

    @Test
    public void createUserSuccess() throws InvalidAlgorithmParameterException, NoSuchPaddingException,
            IllegalBlockSizeException, NoSuchAlgorithmException,
            InvalidKeySpecException, BadPaddingException, InvalidKeyException {

//        given
        UserModel userModel = new UserModel(USERNAME, PASSWORD, null);
        when(repository.selectUser(eq(USERNAME))).thenReturn(null);
        when(encryptionService.generateSalt()).thenReturn(SALT);
        when(encryptionService.encrypt(eq(PASSWORD), eq(SALT))).thenReturn(ENCODED_PASSWORD);

//        when
        userService.createUser(userModel);

//        then
        verify(repository).selectUser(eq(USERNAME));
        verify(encryptionService).generateSalt();
        verify(encryptionService).encrypt(eq(PASSWORD), eq(SALT));
        verify(repository).createUser(eq(USERNAME), eq(ENCODED_PASSWORD), eq(SALT));
    }

    @Test
    public void createDuplicateUser() {

//        given
        UserModel userModel = new UserModel(USERNAME, PASSWORD, null);
        when(repository.selectUser(eq(USERNAME))).thenReturn(userModel);

//        then
        assertThrows(DuplicateEntityException.class, () -> {
//        when
            userService.createUser(userModel);
        });

//        then
        verify(repository).selectUser(eq(USERNAME));
    }

    @Test
    public void createUserEncryptionError() throws InvalidAlgorithmParameterException, NoSuchPaddingException,
            IllegalBlockSizeException, NoSuchAlgorithmException,
            InvalidKeySpecException, BadPaddingException, InvalidKeyException {

//        given
        UserModel userModel = new UserModel(USERNAME, PASSWORD, null);
        when(repository.selectUser(eq(USERNAME))).thenReturn(null);
        when(encryptionService.generateSalt()).thenReturn(SALT);
        doThrow(BadPaddingException.class).when(encryptionService).encrypt(eq(PASSWORD), eq(SALT));

//        then
        assertThrows(BadPaddingException.class, () -> {
//        when
            userService.createUser(userModel);
        });

//        then
        verify(repository).selectUser(eq(USERNAME));
        verify(encryptionService).generateSalt();
        verify(encryptionService).encrypt(eq(PASSWORD), eq(SALT));
    }

}
