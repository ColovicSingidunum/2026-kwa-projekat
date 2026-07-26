package rs.ac.singidunum.kwa.controller;

import rs.ac.singidunum.kwa.repository.ProjekatRepository;
import rs.ac.singidunum.kwa.repository.ZadatakRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatistikaController {

	private final ProjekatRepository projekti;

	private final ZadatakRepository zadaci;

	public StatistikaController(ProjekatRepository projekti, ZadatakRepository zadaci) {
		this.projekti = projekti;
		this.zadaci = zadaci;
	}

	public record Statistika(long projekti, long zadaci, long novo, long uToku, long zavrseno) {
	}

	@GetMapping("/api/statistika")
	Statistika statistika() {
		return new Statistika(this.projekti.count(), this.zadaci.count(), this.zadaci.countByStatus(0),
				this.zadaci.countByStatus(1), this.zadaci.countByStatus(2));
	}

}
