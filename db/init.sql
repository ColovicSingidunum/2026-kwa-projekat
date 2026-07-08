SET NAMES utf8mb4;

CREATE TABLE korisnik (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    lozinka VARCHAR(255) NOT NULL,
    ime VARCHAR(255) NOT NULL,
    prezime VARCHAR(255) NOT NULL
);

CREATE TABLE projekat (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(255) NOT NULL,
    opis VARCHAR(2000) NOT NULL,
    rok_realizacije DATE NOT NULL
);

CREATE TABLE zadatak (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    projekat_id BIGINT NOT NULL,
    opis VARCHAR(2000) NOT NULL,
    status INT NOT NULL CHECK (status BETWEEN 0 AND 2),
    prioritet INT NOT NULL CHECK (prioritet BETWEEN 0 AND 2),
    FOREIGN KEY (projekat_id) REFERENCES projekat (id) ON DELETE CASCADE
);

INSERT INTO korisnik (email, lozinka, ime, prezime) VALUES
    ('aleksandar@kwa.rs', '$2y$10$skOElXwVcMOhEPKXoFs67.zItMbNOm5/lnErsooaT.9duw2fBdRLS', 'Aleksandar', 'Čolović'),
    ('marko@kwa.rs', '$2y$10$skOElXwVcMOhEPKXoFs67.zItMbNOm5/lnErsooaT.9duw2fBdRLS', 'Marko', 'Marković');

INSERT INTO projekat (naziv, opis, rok_realizacije) VALUES
    ('Veb prodavnica', 'Onlajn prodavnica sa korpom, plaćanjem i praćenjem porudžbina.', '2026-11-30'),
    ('Mobilna aplikacija za dostavu', 'Aplikacija za naručivanje hrane sa praćenjem kurira u realnom vremenu.', '2027-02-15'),
    ('Interni portal', 'Portal za zaposlene: vesti, dokumenti i evidencija odsustava.', '2026-10-10'),
    ('Migracija na oblak', 'Prebacivanje postojeće infrastrukture na Kubernetes klaster.', '2026-12-20');

INSERT INTO zadatak (projekat_id, opis, status, prioritet) VALUES
    (1, 'Dizajnirati šemu baze podataka za proizvode i porudžbine', 2, 2),
    (1, 'Implementirati katalog proizvoda sa pretragom', 1, 2),
    (1, 'Napraviti korpu za kupovinu', 1, 1),
    (1, 'Integrisati plaćanje karticom', 0, 2),
    (1, 'Slanje e-pošte o statusu porudžbine', 0, 0),
    (2, 'Prijava korisnika putem telefona', 2, 1),
    (2, 'Mapa sa pozicijom kurira', 1, 2),
    (2, 'Ocenjivanje restorana', 0, 0),
    (2, 'Push obaveštenja o dostavi', 0, 1),
    (3, 'Objavljivanje vesti sa uređivačem teksta', 2, 0),
    (3, 'Zahtev za godišnji odmor sa odobravanjem', 1, 1),
    (3, 'Pretraga dokumenata po nazivu i tipu', 0, 1),
    (4, 'Popis postojećih servisa i zavisnosti', 2, 2),
    (4, 'Napisati Helm chart-ove za servise', 1, 2),
    (4, 'Podesiti nadzor i alarmiranje', 0, 1),
    (4, 'Testirati oporavak nakon otkaza čvora', 0, 0);
