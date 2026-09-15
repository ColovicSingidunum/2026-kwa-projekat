package rs.ac.singidunum.kwa.repository;

import rs.ac.singidunum.kwa.model.Projekat;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjekatRepository extends JpaRepository<Projekat, Long> {

	Page<Projekat> findByNazivContainingIgnoreCaseOrOpisContainingIgnoreCase(String naziv, String opis,
			Pageable pageable);

}
