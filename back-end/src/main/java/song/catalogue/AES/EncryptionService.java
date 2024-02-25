package song.catalogue.AES;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Service;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final int ITERATION_COUNT = 60090;
    private static final int KEY_LENGTH = 256;
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String SECRET_KEY_FACTORY = "PBKDF2WithHmacSHA256";

    private final String secret;

    public EncryptionService(@Value("${AES.secret}") String secret){
        this.secret = secret;
    }

    public String generateSalt(){
        return KeyGenerators.string().generateKey();
    }


    public String encrypt(String input, String salt)
            throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException,
            InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        var secretKey = createSecretKey(salt);
        var ivParameterSpec = createIV();

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec);
        byte[] cipherText = cipher.doFinal(input.getBytes());
        return Base64.getEncoder().encodeToString(cipherText);
    }


    public String decrypt(String input, String salt) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException, InvalidKeySpecException {
        var secretKey = createSecretKey(salt);
        var ivParameterSpec = createIV();

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);
        byte[] plainText = cipher.doFinal(Base64.getDecoder()
                .decode(input));
        return new String(plainText);
    }

    private SecretKey createSecretKey(String salt) throws InvalidKeySpecException, NoSuchAlgorithmException {
        //      create secretKey from secret and salt
        SecretKeyFactory factory = SecretKeyFactory.getInstance(SECRET_KEY_FACTORY);
        KeySpec spec = new PBEKeySpec(secret.toCharArray(), salt.getBytes(), ITERATION_COUNT, KEY_LENGTH);
        return new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
    }

    private IvParameterSpec createIV() {
        //        create initialisation vector
        byte[] initialisationVector = new byte[16];
        new SecureRandom().nextBytes(initialisationVector);
        return  new IvParameterSpec(initialisationVector);
    }

}
