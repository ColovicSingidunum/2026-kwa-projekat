package rs.ac.singidunum.kwa.controller;

import jakarta.validation.Valid;
import rs.ac.singidunum.kwa.model.Strana;
import rs.ac.singidunum.kwa.model.Zadatak;
import rs.ac.singidunum.kwa.repository.ProjekatRepository;
import rs.ac.singidunum.kwa.repository.ZadatakRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/zadaci")
public class ZadatakController {

	private final ZadatakRepository zadaci;

	private final ProjekatRepository projekti;

	public ZadatakController(ZadatakRepository zadaci, ProjekatRepository projekti) {
		this.zadaci = zadaci;
		this.projekti = projekti;
	}

	@GetMapping
	Strana<Zadatak> lista(@RequestParam(required = false) Long projekatId,
			@RequestParam(required = false) Integer status, @RequestParam(required = false) Integer prioritet,
			Pageable pageable) {
		return Strana.od(this.zadaci.pretrazi(projekatId, status, prioritet, pageable));
	}

	@GetMapping("/{id}")
	Zadatak jedan(@PathVariable Long id) {
		return this.zadaci.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Zadatak dodaj(@Valid @RequestBody Zadatak zadatak) {
		proveriProjekat(zadatak);
		zadatak.setId(null);
		return this.zadaci.save(zadatak);
	}

	@PutMapping("/{id}")
	Zadatak izmeni(@PathVariable Long id, @Valid @RequestBody Zadatak zadatak) {
		if (!this.zadaci.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		proveriProjekat(zadatak);
		zadatak.setId(id);
		return this.zadaci.save(zadatak);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void obrisi(@PathVariable Long id) {
		if (!this.zadaci.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		this.zadaci.deleteById(id);
	}

	private void proveriProjekat(Zadatak zadatak) {
		if (!this.projekti.existsById(zadatak.getProjekatId())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projekat ne postoji.");
		}
	}

}
