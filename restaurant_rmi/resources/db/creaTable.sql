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