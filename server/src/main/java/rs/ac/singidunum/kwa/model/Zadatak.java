package rs.ac.singidunum.kwa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Zadatak {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long projekatId;

	@NotBlank
	@Size(max = 2000)
	@Column(length = 2000)
	private String opis;

	@Min(0)
	@Max(2)
	private int status;

	@Min(0)
	@Max(2)
	private int prioritet;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProjekatId() {
		return this.projekatId;
	}

	public void setProjekatId(Long projekatId) {
		this.projekatId = projekatId;
	}

	public String getOpis() {
		return this.opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getPrioritet() {
		return this.prioritet;
	}

	public void setPrioritet(int prioritet) {
		this.prioritet = prioritet;
	}

}
