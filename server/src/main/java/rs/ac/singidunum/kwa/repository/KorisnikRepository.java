package rs.ac.singidunum.kwa.repository;

import java.util.Optional;

import rs.ac.singidunum.kwa.model.Korisnik;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

	Optional<Korisnik> findByEmail(String email);

	boolean existsByEmail(String email);

}
