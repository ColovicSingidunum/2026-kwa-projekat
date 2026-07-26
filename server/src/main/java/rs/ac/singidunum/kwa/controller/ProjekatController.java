package rs.ac.singidunum.kwa.controller;

import jakarta.validation.Valid;
import rs.ac.singidunum.kwa.model.Projekat;
import rs.ac.singidunum.kwa.model.Strana;
import rs.ac.singidunum.kwa.repository.ProjekatRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/projekti")
public class ProjekatController {

	private final ProjekatRepository projekti;

	public ProjekatController(ProjekatRepository projekti) {
		this.projekti = projekti;
	}

	@GetMapping
	Strana<Projekat> lista(Pageable pageable) {
		return Strana.od(this.projekti.findAll(pageable));
	}

	@GetMapping("/{id}")
	Projekat jedan(@PathVariable Long id) {
		return this.projekti.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Projekat dodaj(@Valid @RequestBody Projekat projekat) {
		projekat.setId(null);
		return this.projekti.save(projekat);
	}

	@PutMapping("/{id}")
	Projekat izmeni(@PathVariable Long id, @Valid @RequestBody Projekat projekat) {
		if (!this.projekti.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		projekat.setId(id);
		return this.projekti.save(projekat);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void obrisi(@PathVariable Long id) {
		if (!this.projekti.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		this.projekti.deleteById(id);
	}

}
