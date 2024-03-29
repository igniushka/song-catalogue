package song.catalogue.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import song.catalogue.demo.security.BasicAuthFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private BasicAuthFilter basicAuthFilter;

    @Bean
    SecurityFilterChain songBasicAuthSecurity(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/**").permitAll().and().addFilterAfter(basicAuthFilter, BasicAuthenticationFilter.class));
        return http.build();
    }
}
