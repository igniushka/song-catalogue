package song.catalogue.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;

@SpringBootApplication
public class DemoApplication {

//	public static SecretKey generateKey(int n) throws NoSuchAlgorithmException {
//		KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
//		keyGenerator.init(n);
//        return keyGenerator.generateKey();
//	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
