package rs.ac.singidunum.kwa.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import rs.ac.singidunum.kwa.model.Korisnik;
import rs.ac.singidunum.kwa.repository.KorisnikRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final KorisnikRepository korisnici;

	private final PasswordEncoder encoder;

	private final JwtEncoder jwt;

	public AuthController(KorisnikRepository korisnici, PasswordEncoder encoder, JwtEncoder jwt) {
		this.korisnici = korisnici;
		this.encoder = encoder;
		this.jwt = jwt;
	}

	public record Prijava(@NotBlank String email, @NotBlank String lozinka) {
	}

	public record AuthOdgovor(String token, Korisnik korisnik) {
	}

	@PostMapping("/login")
	AuthOdgovor login(@Valid @RequestBody Prijava prijava) {
		Korisnik korisnik = this.korisnici.findByEmail(prijava.email())
			.filter((k) -> this.encoder.matches(prijava.lozinka(), k.getLozinka()))
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
		return new AuthOdgovor(token(korisnik), korisnik);
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	AuthOdgovor register(@Valid @RequestBody Korisnik korisnik) {
		if (this.korisnici.existsByEmail(korisnik.getEmail())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT);
		}
		korisnik.setId(null);
		korisnik.setLozinka(this.encoder.encode(korisnik.getLozinka()));
		return new AuthOdgovor(token(korisnik), this.korisnici.save(korisnik));
	}

	private String token(Korisnik korisnik) {
		Instant sada = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
			.subject(korisnik.getEmail())
			.issuedAt(sada)
			.expiresAt(sada.plus(8, ChronoUnit.HOURS))
			.build();
		JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
		return this.jwt.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
	}

}
