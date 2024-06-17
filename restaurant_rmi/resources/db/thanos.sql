drop table reservations;
drop table tables;
drop table horaires;
drop table restaurants;

CREATE TABLE restaurants
(
    idResto     number(3) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    nomResto    VARCHAR2(50)  NOT NULL,
    adr         VARCHAR2(200) NOT NULL,
    coordonnees VARCHAR2(200) NOT NULL,
    note        number(2),
    PRIMARY KEY (idResto)
);

CREATE TABLE horaires
(
    idHoraire  number(3) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    idResto    number(3),
    jour       VARCHAR2(10) CHECK ( jour IN
                                    ('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')) NOT NULL,
    hOuverture number(2)                                                                                       NOT NULL,
    hFermeture number(2)                                                                                       NOT NULL,
    PRIMARY KEY (idHoraire),
    FOREIGN KEY (idResto) REFERENCES restaurants (idResto) ON DELETE CASCADE
);

CREATE TABLE tables
(
    idTable  number(6) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    idResto  number(3),
    numTable number(3) NOT NULL,
    nbPlaces number(3) NOT NULL,
    PRIMARY KEY (idTable),
    FOREIGN KEY (idResto) REFERENCES restaurants (idResto) ON DELETE CASCADE
);

CREATE TABLE reservations
(
    idReserv number(6) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    idTable  number(6),
    nom      VARCHAR2(30) NOT NULL,
    prenom   VARCHAR2(30) NOT NULL,
    nbConviv number(3)    NOT NULL,
    numTel   VARCHAR2(10)   NOT NULL,
    dateRes  TIMESTAMP(0) NOT NULL,
    PRIMARY KEY (idReserv),
    FOREIGN KEY (idTable) REFERENCES tables (idTable) ON DELETE CASCADE
);

drop table prenom;

CREATE TABLE PRENOM (
                        idTest number(3) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
                        nomTest VARCHAR2(50) NOT NULL,
                        PRIMARY KEY (idTest)
);

INSERT INTO prenom (nomTest) VALUES ('Aaron');
INSERT INTO prenom (nomTest) VALUES ('Achille');
INSERT INTO prenom (nomTest) VALUES ('Adélie');
INSERT INTO prenom (nomTest) VALUES ('Adelin');
INSERT INTO prenom (nomTest) VALUES ('Adonis');
INSERT INTO prenom (nomTest) VALUES ('Aedan');
INSERT INTO prenom (nomTest) VALUES ('Aëlle');
INSERT INTO prenom (nomTest) VALUES ('Aénor');
INSERT INTO prenom (nomTest) VALUES ('Babeth');
INSERT INTO prenom (nomTest) VALUES ('Bachir');
INSERT INTO prenom (nomTest) VALUES ('Badiha');
INSERT INTO prenom (nomTest) VALUES ('Badis');
INSERT INTO prenom (nomTest) VALUES ('Badredine');
INSERT INTO prenom (nomTest) VALUES ('Bahia');
INSERT INTO prenom (nomTest) VALUES ('Bahya');
INSERT INTO prenom (nomTest) VALUES ('Balthazar');
INSERT INTO prenom (nomTest) VALUES ('Caitlin');
INSERT INTO prenom (nomTest) VALUES ('Cali');
INSERT INTO prenom (nomTest) VALUES ('Calie');
INSERT INTO prenom (nomTest) VALUES ('Calista');
INSERT INTO prenom (nomTest) VALUES ('Callie');
INSERT INTO prenom (nomTest) VALUES ('Calypso');
INSERT INTO prenom (nomTest) VALUES ('Cameron');
INSERT INTO prenom (nomTest) VALUES ('Camille');
INSERT INTO prenom (nomTest) VALUES ('Dahlia');
INSERT INTO prenom (nomTest) VALUES ('Daisy');
INSERT INTO prenom (nomTest) VALUES ('Dalida');
INSERT INTO prenom (nomTest) VALUES ('Dalil');
INSERT INTO prenom (nomTest) VALUES ('Dalva');
INSERT INTO prenom (nomTest) VALUES ('Dalvin');
INSERT INTO prenom (nomTest) VALUES ('Damian');
INSERT INTO prenom (nomTest) VALUES ('Dana');
INSERT INTO prenom (nomTest) VALUES ('Eden');
INSERT INTO prenom (nomTest) VALUES ('Edie');
INSERT INTO prenom (nomTest) VALUES ('Edmée');
INSERT INTO prenom (nomTest) VALUES ('Edwige');
INSERT INTO prenom (nomTest) VALUES ('Eglantine');
INSERT INTO prenom (nomTest) VALUES ('Eileen');
INSERT INTO prenom (nomTest) VALUES ('Elaia');
INSERT INTO prenom (nomTest) VALUES ('Eléa');
INSERT INTO prenom (nomTest) VALUES ('Fabbio');
INSERT INTO prenom (nomTest) VALUES ('Fabiano');
INSERT INTO prenom (nomTest) VALUES ('Fabricio');
INSERT INTO prenom (nomTest) VALUES ('Fabrizia');
INSERT INTO prenom (nomTest) VALUES ('Fadilah');
INSERT INTO prenom (nomTest) VALUES ('Faeza');
INSERT INTO prenom (nomTest) VALUES ('Fahra');
INSERT INTO prenom (nomTest) VALUES ('Faith');
INSERT INTO prenom (nomTest) VALUES ('Gabin');
INSERT INTO prenom (nomTest) VALUES ('Gabriel');
INSERT INTO prenom (nomTest) VALUES ('Gabrielle');
INSERT INTO prenom (nomTest) VALUES ('Gaël');
INSERT INTO prenom (nomTest) VALUES ('Gaëlig');
INSERT INTO prenom (nomTest) VALUES ('Gaïd');
INSERT INTO prenom (nomTest) VALUES ('Gais');
INSERT INTO prenom (nomTest) VALUES ('Galdric');
INSERT INTO prenom (nomTest) VALUES ('Hackim');
INSERT INTO prenom (nomTest) VALUES ('Hadidja');
INSERT INTO prenom (nomTest) VALUES ('Hadrian');
INSERT INTO prenom (nomTest) VALUES ('Hadrien');
INSERT INTO prenom (nomTest) VALUES ('Haïcé');
INSERT INTO prenom (nomTest) VALUES ('Haiden');
INSERT INTO prenom (nomTest) VALUES ('Haïna');
INSERT INTO prenom (nomTest) VALUES ('Haïvy');
INSERT INTO prenom (nomTest) VALUES ('Iago');
INSERT INTO prenom (nomTest) VALUES ('Ian');
INSERT INTO prenom (nomTest) VALUES ('Ibtissem');
INSERT INTO prenom (nomTest) VALUES ('Ichaï');
INSERT INTO prenom (nomTest) VALUES ('Icham');
INSERT INTO prenom (nomTest) VALUES ('Idalie');
INSERT INTO prenom (nomTest) VALUES ('Idaya');
INSERT INTO prenom (nomTest) VALUES ('Idriss');
INSERT INTO prenom (nomTest) VALUES ('Jackson');
INSERT INTO prenom (nomTest) VALUES ('Jacob');
INSERT INTO prenom (nomTest) VALUES ('Jacynthe');
INSERT INTO prenom (nomTest) VALUES ('Jad');
INSERT INTO prenom (nomTest) VALUES ('Jade');
INSERT INTO prenom (nomTest) VALUES ('Jadène');
INSERT INTO prenom (nomTest) VALUES ('Jaëlys');
INSERT INTO prenom (nomTest) VALUES ('Jahmal');
INSERT INTO prenom (nomTest) VALUES ('Kacy');
INSERT INTO prenom (nomTest) VALUES ('Kaïs');
INSERT INTO prenom (nomTest) VALUES ('Kaleb');
INSERT INTO prenom (nomTest) VALUES ('Kalvin');
INSERT INTO prenom (nomTest) VALUES ('Kalye');
INSERT INTO prenom (nomTest) VALUES ('Kamila');
INSERT INTO prenom (nomTest) VALUES ('Kaouthar');
INSERT INTO prenom (nomTest) VALUES ('Karen');
INSERT INTO prenom (nomTest) VALUES ('Lalie');
INSERT INTO prenom (nomTest) VALUES ('Laly');
INSERT INTO prenom (nomTest) VALUES ('Lancelot');
INSERT INTO prenom (nomTest) VALUES ('Larissa');
INSERT INTO prenom (nomTest) VALUES ('Laureen');
INSERT INTO prenom (nomTest) VALUES ('Laurel');
INSERT INTO prenom (nomTest) VALUES ('Léandre');
INSERT INTO prenom (nomTest) VALUES ('Leeloo');
INSERT INTO prenom (nomTest) VALUES ('Maddy');
INSERT INTO prenom (nomTest) VALUES ('Maden');
INSERT INTO prenom (nomTest) VALUES ('Maé');
INSERT INTO prenom (nomTest) VALUES ('Maegan');
INSERT INTO prenom (nomTest) VALUES ('Maël');
INSERT INTO prenom (nomTest) VALUES ('Maelia');
INSERT INTO prenom (nomTest) VALUES ('Maélie');
INSERT INTO prenom (nomTest) VALUES ('Maëline');
INSERT INTO prenom (nomTest) VALUES ('Nadim');
INSERT INTO prenom (nomTest) VALUES ('Naël');
INSERT INTO prenom (nomTest) VALUES ('Nahi');
INSERT INTO prenom (nomTest) VALUES ('Naïs');
INSERT INTO prenom (nomTest) VALUES ('Natéo');
INSERT INTO prenom (nomTest) VALUES ('Nathael');
INSERT INTO prenom (nomTest) VALUES ('Nathanaël');
INSERT INTO prenom (nomTest) VALUES ('Nathilde');
INSERT INTO prenom (nomTest) VALUES ('Oana');
INSERT INTO prenom (nomTest) VALUES ('Obeline');
INSERT INTO prenom (nomTest) VALUES ('Océan');
INSERT INTO prenom (nomTest) VALUES ('Océane');
INSERT INTO prenom (nomTest) VALUES ('Octave');
INSERT INTO prenom (nomTest) VALUES ('Octavius');
INSERT INTO prenom (nomTest) VALUES ('Ode');
INSERT INTO prenom (nomTest) VALUES ('Odette');
INSERT INTO prenom (nomTest) VALUES ('Pablo');
INSERT INTO prenom (nomTest) VALUES ('Pacey');
INSERT INTO prenom (nomTest) VALUES ('Paco');
INSERT INTO prenom (nomTest) VALUES ('Pacôme');
INSERT INTO prenom (nomTest) VALUES ('Palomée');
INSERT INTO prenom (nomTest) VALUES ('Paola');
INSERT INTO prenom (nomTest) VALUES ('Paolina');
INSERT INTO prenom (nomTest) VALUES ('Pascal');
INSERT INTO prenom (nomTest) VALUES ('Rachel');
INSERT INTO prenom (nomTest) VALUES ('Raffaello');
INSERT INTO prenom (nomTest) VALUES ('Raïna');
INSERT INTO prenom (nomTest) VALUES ('Raiponce');
INSERT INTO prenom (nomTest) VALUES ('Ramata');
INSERT INTO prenom (nomTest) VALUES ('Ramzy');
INSERT INTO prenom (nomTest) VALUES ('Raphaëlle');
INSERT INTO prenom (nomTest) VALUES ('Rayane');
INSERT INTO prenom (nomTest) VALUES ('Sakura');
INSERT INTO prenom (nomTest) VALUES ('Salomé');
INSERT INTO prenom (nomTest) VALUES ('Sandro');
INSERT INTO prenom (nomTest) VALUES ('Saona');
INSERT INTO prenom (nomTest) VALUES ('Sascha');
INSERT INTO prenom (nomTest) VALUES ('Scarlett');
INSERT INTO prenom (nomTest) VALUES ('Séléna');
INSERT INTO prenom (nomTest) VALUES ('Tabitha');
INSERT INTO prenom (nomTest) VALUES ('Tahys');
INSERT INTO prenom (nomTest) VALUES ('Talitha');
INSERT INTO prenom (nomTest) VALUES ('Tallulah');
INSERT INTO prenom (nomTest) VALUES ('Tamara');
INSERT INTO prenom (nomTest) VALUES ('Tania');
INSERT INTO prenom (nomTest) VALUES ('Tao');
INSERT INTO prenom (nomTest) VALUES ('Taylor');
INSERT INTO prenom (nomTest) VALUES ('Ugo');
INSERT INTO prenom (nomTest) VALUES ('Ugolin');
INSERT INTO prenom (nomTest) VALUES ('Ulla');
INSERT INTO prenom (nomTest) VALUES ('Ulrike');
INSERT INTO prenom (nomTest) VALUES ('Ulysse');
INSERT INTO prenom (nomTest) VALUES ('Ulyssia');
INSERT INTO prenom (nomTest) VALUES ('Uma');
INSERT INTO prenom (nomTest) VALUES ('Umberto');
INSERT INTO prenom (nomTest) VALUES ('Vahé');
INSERT INTO prenom (nomTest) VALUES ('Vaiana');
INSERT INTO prenom (nomTest) VALUES ('Valencia');
INSERT INTO prenom (nomTest) VALUES ('Valentin');
INSERT INTO prenom (nomTest) VALUES ('Valentina');
INSERT INTO prenom (nomTest) VALUES ('Valéria');
INSERT INTO prenom (nomTest) VALUES ('Valérian');
INSERT INTO prenom (nomTest) VALUES ('Valéry');
INSERT INTO prenom (nomTest) VALUES ('Waël');
INSERT INTO prenom (nomTest) VALUES ('Wafaa');
INSERT INTO prenom (nomTest) VALUES ('Walden');
INSERT INTO prenom (nomTest) VALUES ('Warren');
INSERT INTO prenom (nomTest) VALUES ('Wendy');
INSERT INTO prenom (nomTest) VALUES ('Whitney');
INSERT INTO prenom (nomTest) VALUES ('Wiland');
INSERT INTO prenom (nomTest) VALUES ('Willem');
INSERT INTO prenom (nomTest) VALUES ('Xabi');
INSERT INTO prenom (nomTest) VALUES ('Xan');
INSERT INTO prenom (nomTest) VALUES ('Xanti');
INSERT INTO prenom (nomTest) VALUES ('Xavier');
INSERT INTO prenom (nomTest) VALUES ('Xavière');
INSERT INTO prenom (nomTest) VALUES ('Ximena');
INSERT INTO prenom (nomTest) VALUES ('Ximun');
INSERT INTO prenom (nomTest) VALUES ('Xuan');
INSERT INTO prenom (nomTest) VALUES ('Yael');
INSERT INTO prenom (nomTest) VALUES ('Yanaël');
INSERT INTO prenom (nomTest) VALUES ('Yannis');
INSERT INTO prenom (nomTest) VALUES ('Yarol');
INSERT INTO prenom (nomTest) VALUES ('Yélena');
INSERT INTO prenom (nomTest) VALUES ('Yoni');
INSERT INTO prenom (nomTest) VALUES ('Yorick');
INSERT INTO prenom (nomTest) VALUES ('Younès');
INSERT INTO prenom (nomTest) VALUES ('Zacharie');
INSERT INTO prenom (nomTest) VALUES ('Zack');
INSERT INTO prenom (nomTest) VALUES ('Zadig');
INSERT INTO prenom (nomTest) VALUES ('Zahia');
INSERT INTO prenom (nomTest) VALUES ('Zeïnab');
INSERT INTO prenom (nomTest) VALUES ('Zelda');
INSERT INTO prenom (nomTest) VALUES ('Zélia');
INSERT INTO prenom (nomTest) VALUES ('Zélian');

drop table NOM2FAMILLE;

CREATE TABLE NOM2FAMILLE (
                             idTest number(3) GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
                             nomTest VARCHAR2(50) NOT NULL,
                             PRIMARY KEY (idTest)
);

INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abad');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abadie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abbadie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('About');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abrial');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abrieu');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abrieux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abriou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Abrioux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Accard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Accart');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Accary');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Achard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Achte');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Achten');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ackermann');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Baby');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bach');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bachelerie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bachellerie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bacon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bacquer');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Baene');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Baeyaert');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagarre');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagart');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagatelle');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnaud');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagne');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagneau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnolet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Bagnot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cabares');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cabaret');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cabaretier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cabarez');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cabé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cafel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cagne');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cagnon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Caine');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Callué');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calluela');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calmels');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calmet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calvet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calzolàio');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Calzolari');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cambon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cambonnet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Cami');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Camin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Caminade');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('D`Origny');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dabadie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dabbadie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dabout');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dagry');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dalayens');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dalbaret');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dalens');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Damis');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dancourt');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dargent');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dartevel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dartevell');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dartevelle');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dartevert');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Darteville');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Datas');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Dathas');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Echalier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Echallier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ecole');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ecot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ecottière');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ecuyer');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Elzeard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Émile');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Enfer');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Enfert');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Englebert');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Esbesoings');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escalié');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escalier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escalière');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escalin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escallier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escallot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escalon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Escotty');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fabri');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fabrini');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fabro');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faia');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faisan');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faisandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faisent');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faissandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faizand');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faizandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faizans');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faizant');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Faucon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconié');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconneau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconnet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Fauconney');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gal');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Galiou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gall');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gallic');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gallo');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Garambois');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaud');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaude');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudineau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudinet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudingnon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gaudinot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Géant');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gelade');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gelé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gelée');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Geley');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gelez');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gellé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Gelon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Haase');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Haese');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hamard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hannet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hanneux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hannier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hannot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hare');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hasard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hase');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hauray');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hauré');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hauret');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hautoit');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Hautot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jaap');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacob');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacobson');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquelin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquemin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquemot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquer');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacques');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jacquot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jakue');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jan');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardez');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Jardinaud');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kannio');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kantzé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kantzler');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kanzler');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kauffman');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kaufman');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kaufmann');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kermaen');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kermenou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kipp');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Koenig');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Konjuradjian');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kovac');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kovalevski');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kovalki');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kovaric');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Kraft');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Krick');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('L`Héritier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('La Cloche');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('La Fay');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labadie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labaume');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labaumie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labelgry');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labergery');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labergri');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labergris');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labergrit');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labergry');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Laberguerie');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Laberguery');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labonne');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Labonnette');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maas');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Mac-Mahon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Macha');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Mac’Martin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Mady');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maen');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maertens');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maes');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maessen');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Maga');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Magat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Mage');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Mageau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Magel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nabos');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadal');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadaud');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadaux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadeaux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nadin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nagy');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nanteuil');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nataf');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Natale');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Natin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Naudin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Navelot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Navier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Navière');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Naviez');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Navion');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Navoizat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Néel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nelias');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Nesle');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oddou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oddoux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odelin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odette');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Odoux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ogé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oger');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ogié');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ogier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olgart');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oliva');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olive');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oliveira');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oliverio');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olivero');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olives');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olivetti');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olivier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Olyff');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Onslow');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Oppe');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pablo');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Padeiro');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pailhès');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paillard');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paille');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paillet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paillou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pailloux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paindavaine');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Palvadeau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Panabière');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Panadero');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pannaye');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paoli');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Papousakês');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Paradot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Parc');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Parcq');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pardon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Pardonnat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quartelat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quemin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quéré');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Querouil');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Querouilh');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quérouille');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Querré');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quessart');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quesse');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quessette');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Quesson');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rabastain');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rabasté');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rabastens');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rabastin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rabastou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragé');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rageade');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Raget');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragey');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragon');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragone');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragonet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragonnaud');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragonneau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragonnet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Ragotin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Raphaël');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Rat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Saivres');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Salvat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Salvi');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Salvini');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Samson');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sancerre');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sancerres');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sancerry');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sansay');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sapato');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sapognikov');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Saul');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Saunion');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauvain');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauvat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauve');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauvée');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauvet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauveur');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Sauvin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Saverat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taboulet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taboulin');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taboullot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taboulot');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taboulou');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tache');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tacheix');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tacher');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tachereau');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tâcheron');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tachet');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tacheux');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tachoires');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tailhandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tailland');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taillandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Taillant');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Tallandier');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vallat');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vallognes');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Valognes');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Acker');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Ackere');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Bruissel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Bruyssel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Den Doorne');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Van Doren');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vanacker');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vanackere');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vanaker');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vandeler');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Varga');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vaujour');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vaujours');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Vedel/Bedel');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Wos');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Yoni');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Zajaczkowski');
INSERT INTO NOM2FAMILLE (nomTest) VALUES ('Zapata');

INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Au Bistronome', '19 Rue Saint-Michel, 54000 Nancy', '48.6961557,6.1782619', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('L’Excelsior', '50 Rue Henri Poincaré, 54000 Nancy', '48.6907672,6.1755009', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('La Maison Dans le Parc', '3 Rue Sainte-Catherine, 54000 Nancy', '48.6942983,6.1852112', 10);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('A La Table du Bon Roi Stanislas', '7 Rue Gustave Simon, 54000 Nancy', '48.6937808,6.1809398', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Le Majeur', '13 Rue Grand Rabbin Haguenauer, 54000 Nancy', '48.6873301,6.1802686', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Monsieur FUJI Sushi & Bubble Tea', '41 Rue Saint-Dizier, 54000 Nancy', '48.6905273,6.1827526', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('BrendOliv', '141 Grande Rue, 54000 Nancy', '48.6987302,6.1778737', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('La Gentilhommiere', '29 Rue des Maréchaux, 54000 Nancy', '48.6941139,6.1809539', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Voyou', '20 Rue Stanislas, 54000 Nancy', '48.6921818,6.1814799', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Les Fourmis Rouges', '36 Bd d Australie, 54000 Nancy', '48.6931072,6.1989394', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Le Potager lorrain', '25 Rue des Maréchaux, 54000 Nancy', '48.6941507,6.1811004', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Le Comptoir St Michel', '2 Rue Saint-Michel, 54000 Nancy', '48.6969090,6.1791816', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Pidélice', '25 Rue Raymond Poincaré, 54000 Nancy', '48.6900782,6.1722263', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('L Eden', '45 Grande Rue, 54000 Nancy', '48.6962453,6.1803899', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('L Arsenal', '24 Pl. de l Arsenal, 54000 Nancy', '48.6969125,6.1776588', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Basilic & Co Nancy', '15 Rue Saint-Dizier, 54000 Nancy', '48.6922688,6.1814873', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Nemo Poke Bowl', '2 Rue Dom Calmet, 54000 Nancy', '48.6917116,6.1813324', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('La Bolée Crêperie Bretonne', '43 Rue des Ponts, 54000 Nancy', '48.6876781,6.1824284', 8);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('Retrogusto', '40 Rue Stanislas, 54000 Nancy', '48.6927858,6.1805851', 9);
INSERT INTO restaurants (nomResto, adr, coordonnees, note) VALUES ('L Atelier 35', '35 Rue des Ponts, 54000 Nancy', '48.9880802,6.1821719', 8);

DECLARE
v_idResto NUMBER(3);
    v_numTables NUMBER(3);
    v_numPlaces NUMBER(3);
BEGIN
FOR i IN 1..20 LOOP
        v_idResto := i;
        v_numTables := DBMS_RANDOM.VALUE(10, 50); -- Nombre aléatoire de tables entre 10 et 50
FOR j IN 1..v_numTables LOOP
            v_numPlaces := DBMS_RANDOM.VALUE(2, 20); -- Nombre aléatoire de places entre 2 et 20
INSERT INTO tables (idResto, numTable, nbPlaces)
VALUES (v_idResto, j, ROUND(v_numPlaces));
END LOOP;
END LOOP;
END;
/

DECLARE
v_idResto NUMBER(3);
    v_jours VARCHAR2(10);
    v_hOuverture NUMBER(2);
    v_hFermeture NUMBER(2);
    v_jourFermeture NUMBER(1);
    v_ttLaJournee NUMBER(1);
BEGIN
FOR i IN 1..20 LOOP
            v_idResto := i;
            v_jourFermeture := ROUND(DBMS_RANDOM.VALUE(1, 7));
            -- Génère un jour de fermeture aléatoire entre 1 et 7
            v_ttLaJournee := ROUND(DBMS_RANDOM.VALUE(1, 4));
            -- Génère un nombre aléatoire entre 1 et 4 pour déterminer si le restaurant est ouvert toute la journée

FOR j IN 1..7 LOOP
                    IF j <> v_jourFermeture THEN
                        v_jours := CASE j
                                       WHEN 1 THEN 'Lundi'
                                       WHEN 2 THEN 'Mardi'
                                       WHEN 3 THEN 'Mercredi'
                                       WHEN 4 THEN 'Jeudi'
                                       WHEN 5 THEN 'Vendredi'
                                       WHEN 6 THEN 'Samedi'
                                       WHEN 7 THEN 'Dimanche'
END;

                        IF (v_ttLaJournee = 1) THEN
                            v_hOuverture := ROUND(DBMS_RANDOM.VALUE(6, 11)); -- Ouverture entre 6h et 11h
                            v_hFermeture := ROUND(DBMS_RANDOM.VALUE(20, 23)); -- Fermeture entre 20h et 23h
INSERT INTO horaires (idResto, jour, hOuverture, hFermeture)
VALUES (v_idResto, v_jours, v_hOuverture, v_hFermeture);
ELSE
                            -- Génère deux créneaux horaires pour chaque jour où le restaurant est ouvert
                            v_hOuverture := ROUND(DBMS_RANDOM.VALUE(6, 11)); -- Ouverture entre 6h et 11h
                            v_hFermeture := ROUND(DBMS_RANDOM.VALUE(12, 15)); -- Fermeture entre 12h et 15h
INSERT INTO horaires (idResto, jour, hOuverture, hFermeture)
VALUES (v_idResto, v_jours, v_hOuverture, v_hFermeture);

v_hOuverture := ROUND(DBMS_RANDOM.VALUE(17, 19)); -- Ouverture entre 17h et 19h
                            v_hFermeture := ROUND(DBMS_RANDOM.VALUE(20, 23)); -- Fermeture entre 20h et 23h
INSERT INTO horaires (idResto, jour, hOuverture, hFermeture)
VALUES (v_idResto, v_jours, v_hOuverture, v_hFermeture);
end if;
END IF;
END LOOP;
END LOOP;
END;

DECLARE
v_idTable NUMBER(6);
    v_nbPlaces NUMBER(3);
    v_nom VARCHAR2(30);
    v_prenom VARCHAR2(30);
    v_numTel VARCHAR2(10);
    v_dateRes TIMESTAMP;
    v_horaireOuv NUMBER(2);
    v_horaireFerm NUMBER(2);
    v_idResto NUMBER(3);
    v_jour VARCHAR2(10);
    v_reservations NUMBER(3);
    v_isOverlap BOOLEAN;
    v_taille number(4);

    FUNCTION GenerateRandomName RETURN VARCHAR2 IS
BEGIN
select count(*) into v_taille from NOM2FAMILLE;
select nomTest into v_nom from NOM2FAMILLE where idTest = round(dbms_random.value(1, v_taille));
RETURN v_nom;
END;

    FUNCTION GenerateRandomSurname RETURN VARCHAR2 IS
BEGIN
select count(*) into v_taille from prenom;
select nomTest into v_prenom from prenom where idTest = round(dbms_random.value(1, v_taille));
RETURN v_prenom;
END;

    FUNCTION GenerateRandomPhone RETURN NUMBER IS
        v_test number;
        v_num number;
        v_retour VARCHAR2(10);
BEGIN
        v_test := DBMS_RANDOM.VALUE;
        v_num := ROUND(DBMS_RANDOM.VALUE(1, 3));
        v_test := TO_CHAR(substr(v_test, 2, 8));
        IF (length(v_test) < 8) THEN
            v_test := v_test || '0';
END IF;
        IF (v_num = 1) THEN
            v_retour := concat('03', v_test);
        ELSIF (v_num = 2) THEN
            v_retour := concat('06', v_test);
ELSE
            v_retour := concat('07', v_test);
END IF;
RETURN v_retour;
END;

    FUNCTION IsOverlap(p_idTable NUMBER, p_dateRes TIMESTAMP) RETURN BOOLEAN IS
        v_count NUMBER;
BEGIN
SELECT COUNT(*)
INTO v_count
FROM reservations
WHERE idTable = p_idTable
  AND TRUNC(dateRes) = TRUNC(p_dateRes)
  AND EXTRACT(HOUR FROM dateRes) = EXTRACT(HOUR FROM p_dateRes);
RETURN v_count > 0;
END;

BEGIN
FOR i IN 1..20 LOOP
            v_idResto := i;

FOR jour IN 1..7 LOOP
                    v_jour := CASE jour
                                  WHEN 1 THEN 'Lundi'
                                  WHEN 2 THEN 'Mardi'
                                  WHEN 3 THEN 'Mercredi'
                                  WHEN 4 THEN 'Jeudi'
                                  WHEN 5 THEN 'Vendredi'
                                  WHEN 6 THEN 'Samedi'
                                  WHEN 7 THEN 'Dimanche'
END;

                    -- Sélectionner les horaires d'ouverture et fermeture
FOR h IN (SELECT hOuverture, hFermeture FROM horaires WHERE idResto = v_idResto AND jour = v_jour) LOOP
                            v_horaireOuv := h.hOuverture;
                            v_horaireFerm := h.hFermeture;

                            -- Générer un nombre aléatoire de réservations pour chaque jour
                            v_reservations := ROUND(DBMS_RANDOM.VALUE(1, 5));

FOR r IN 1..v_reservations LOOP
                                    -- Sélectionner une table aléatoire pour le restaurant
SELECT idTable, nbPlaces
INTO v_idTable, v_nbPlaces
FROM (SELECT idTable, nbPlaces FROM tables WHERE idResto = v_idResto ORDER BY DBMS_RANDOM.VALUE)
WHERE ROWNUM = 1;

-- Générer un nombre de convives aléatoire
v_nbPlaces := LEAST(v_nbPlaces, ROUND(DBMS_RANDOM.VALUE(2, v_nbPlaces)));

                                    -- Générer un nom, prénom et numéro de téléphone aléatoires
                                    v_nom := GenerateRandomName();
                                    v_prenom := GenerateRandomSurname();
                                    v_numTel := GenerateRandomPhone();
                                    v_numTel := concat('0', v_numTel);

                                    -- Générer une date de réservation aléatoire dans l'intervalle d'ouverture
                                    LOOP
v_dateRes := TO_DATE('2024-06-12', 'YYYY-MM-DD') + DBMS_RANDOM.VALUE(0, 30) + (v_horaireOuv + ROUND(DBMS_RANDOM.VALUE(0, (v_horaireFerm - v_horaireOuv)))) / 24;
                                        v_dateRes := TRUNC(v_dateRes, 'HH24'); -- Arrondir à l'heure pleine

                                        -- Vérifier si la date de réservation est dans les heures d'ouverture du restaurant
                                        IF EXTRACT(HOUR FROM v_dateRes) >= v_horaireOuv AND EXTRACT(HOUR FROM v_dateRes) < v_horaireFerm THEN
                                            v_isOverlap := IsOverlap(v_idTable, v_dateRes);
                                            IF NOT v_isOverlap THEN
                                                EXIT;
END IF;
END IF;
END LOOP;

                                    -- Insérer la réservation
INSERT INTO reservations (idTable, nom, prenom, nbConviv, numTel, dateRes)
VALUES (v_idTable, v_nom, v_prenom, v_nbPlaces, v_numTel, v_dateRes);
END LOOP;
END LOOP;
END LOOP;
END LOOP;
END;
/
