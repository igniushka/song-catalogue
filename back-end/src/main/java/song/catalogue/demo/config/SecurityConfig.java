package song.catalogue.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

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
    SecurityFilterChain web(HttpSecurity http) throws Exception {
        http.csrf().disable();
//        http.cors();
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/admin/**").permitAll()
                );

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