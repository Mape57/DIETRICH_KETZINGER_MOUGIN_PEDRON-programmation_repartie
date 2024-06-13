DECLARE
v_idResto NUMBER(3);
    v_jours VARCHAR2(10);
    v_hOuverture NUMBER(2);
    v_hFermeture NUMBER(2);
    v_jourFermeture NUMBER(1);
    v_ttLaJournee NUMBER(1);
BEGIN
FOR i IN 1..77 LOOP
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
