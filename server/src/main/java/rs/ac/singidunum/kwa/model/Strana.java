package rs.ac.singidunum.kwa.model;

import java.util.List;

import org.springframework.data.domain.Page;

public record Strana<T>(List<T> sadrzaj, long ukupno, int broj, int velicina) {

	public static <T> Strana<T> od(Page<T> strana) {
		return new Strana<>(strana.getContent(), strana.getTotalElements(), strana.getNumber(), strana.getSize());
	}

}
