package song.catalogue.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import song.catalogue.demo.user.UserModel;
import song.catalogue.demo.user.UserService;

import java.io.IOException;
import java.util.Base64;

@Component
public class BasicAuthFilter extends GenericFilterBean {

    private final UserService userService;
    private final String adminSecret;

    @Autowired
    BasicAuthFilter(UserService userService, @Value("${admin.secret}") String adminSecret) {
        this.userService = userService;
        this.adminSecret = adminSecret;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws ServletException, IOException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        try {
            // Read header value
            String basicAuth = httpRequest.getHeader("Authorization");
            String prefix = "Basic "; // Prefix to be removed
            if (basicAuth.startsWith(prefix)) {
                String encoded = basicAuth.substring(prefix.length());
                var decoded = new String(Base64.getDecoder().decode(encoded));
                String[] parts = decoded.split(":");
                if (parts.length != 2) {
                    logger.error("Bad admin secret");
                    setUnauthorisedResponse(httpResponse);
                    return;
                }
                if (parts[0].equals("admin")) {
                    if (!parts[1].equals(adminSecret)) {
                        logger.error("Bad admin secret");
                        setUnauthorisedResponse(httpResponse);
                        return;
                    } else {
                        httpRequest.setAttribute("user", "admin");
                    }
                } else {
                    UserModel user = new UserModel(parts[0], parts[1], null);
                    try {
                        userService.validateUser(user);
                        httpRequest.setAttribute("user", user.username());
                    } catch (Exception e) {
                        logger.error("an error occurred while trying to authorise", e);
                        setUnauthorisedResponse(httpResponse);
                        return;
                    }
                }
            } else {
                logger.error("Bad basic auth");
                setUnauthorisedResponse(httpResponse);
                return;
            }
        } catch (Exception e) {
            setUnauthorisedResponse(httpResponse);
            return;
        }
        chain.doFilter(request, response);
    }

    private void setUnauthorisedResponse(HttpServletResponse httpResponse) {
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

}