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
FOR i IN 1..77 LOOP
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
