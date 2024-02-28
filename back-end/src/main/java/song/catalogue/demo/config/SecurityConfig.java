package song.catalogue.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig  {

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
//                        .authenticated())
//                .httpBasic(withDefaults())
//                .formLogin(withDefaults())
//                .csrf().disable();
//        return http.build();
//    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    SecurityFilterChain web(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/admin/**").permitAll()
                ).cors(cors -> cors.disable());

//        http.authorizeHttpRequests()
//        http
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("/endpoint").hasAuthority("USER")
//                        .anyRequest().authenticated()
//                );
        // ...

        return http.build();
    }
}
