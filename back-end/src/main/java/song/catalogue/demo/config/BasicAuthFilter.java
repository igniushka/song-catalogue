package song.catalogue.demo.config;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import song.catalogue.demo.user.UserModel;
import song.catalogue.demo.user.UserService;


import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

@Component
public class BasicAuthFilter extends GenericFilterBean {

    private final UserService userService;

    @Autowired
    BasicAuthFilter(UserService userService){
        this.userService = userService;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Read header value
        String basicAuth = httpRequest.getHeader("Authorization");
        String prefix = "Basic "; // Prefix to be removed
        if (basicAuth.startsWith(prefix)) {
            String encoded = basicAuth.substring(prefix.length());
            var decoded = new String(Base64.getDecoder().decode(encoded));
            String[] parts = decoded.split(":");
            if (parts.length != 2){
//                raise error
//                return null;
            }
            UserModel user = new UserModel(parts[0], parts[1], null);
            try {

                userService.validateUser(user);
                httpRequest.setAttribute("user", user.username());
                chain.doFilter(request, response);

            } catch (InvalidAlgorithmParameterException e) {
                throw new RuntimeException(e);
            } catch (NoSuchPaddingException e) {
                throw new RuntimeException(e);
            } catch (IllegalBlockSizeException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (BadPaddingException e) {
                throw new RuntimeException(e);
            } catch (InvalidKeySpecException e) {
                throw new RuntimeException(e);
            } catch (InvalidKeyException e) {
                throw new RuntimeException(e);
            }
//            return user.username();
        } else {
//            raise error
//            return null;
        }

    }

}