package song.catalogue.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class JdbcConfig {

//    @Bean
//    public RestTemplate restTemplate(
//            @Value("${restTemplate.readTimeout}") int readTimeout,
//            @Value("${restTemplate.connectionTimeout}") int connectionTimeout,
//            RestTemplateBuilder restTemplateBuilder) {
//
//    }

    @Bean
    public DataSource dataSource(
            @Value("${datasource.url}") String url,
            @Value("${datasource.username}") String username,
            @Value("${datasource.password}") String password,
            @Value("${datasource.driver}") String driverClass
    ) {
        return DataSourceBuilder.create()
                        .url(url)
                .username(username)
                .password(password)
                .driverClassName(driverClass)
                .build();
    }
}
