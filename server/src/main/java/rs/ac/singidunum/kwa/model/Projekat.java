package rs.ac.singidunum.kwa.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Projekat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String naziv;

	@NotBlank
	@Size(max = 2000)
	@Column(length = 2000)
	private String opis;

	@NotNull
	private LocalDate rokRealizacije;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return this.opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public LocalDate getRokRealizacije() {
		return this.rokRealizacije;
	}

	public void setRokRealizacije(LocalDate rokRealizacije) {
		this.rokRealizacije = rokRealizacije;
	}

}
