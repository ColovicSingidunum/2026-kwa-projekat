package rs.ac.singidunum.kwa.repository;

import rs.ac.singidunum.kwa.model.Zadatak;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ZadatakRepository extends JpaRepository<Zadatak, Long> {

	@Query("""
			select z from Zadatak z
			where (:projekatId is null or z.projekatId = :projekatId)
			and (:status is null or z.status = :status)
			and (:prioritet is null or z.prioritet = :prioritet)
			""")
	Page<Zadatak> pretrazi(Long projekatId, Integer status, Integer prioritet, Pageable pageable);

	long countByStatus(int status);

}
