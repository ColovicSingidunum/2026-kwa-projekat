package rs.ac.singidunum.kwa.security;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.csrf((csrf) -> csrf.disable())
			.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(
					(auth) -> auth.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated())
			.oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
			.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecretKey jwtKljuc(@Value("${kwa.jwt.tajna}") String tajna) {
		return new SecretKeySpec(tajna.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
	}

	@Bean
	JwtDecoder jwtDecoder(SecretKey kljuc) {
		return NimbusJwtDecoder.withSecretKey(kljuc).build();
	}

	@Bean
	JwtEncoder jwtEncoder(SecretKey kljuc) {
		return new NimbusJwtEncoder(new ImmutableSecret<>(kljuc));
	}

}
