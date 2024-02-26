package song.catalogue.demo.user;


import com.fasterxml.jackson.annotation.JsonProperty;

public record UserModel(
        @JsonProperty("username") String username,
        @JsonProperty("password")String password,
        String salt) {}
