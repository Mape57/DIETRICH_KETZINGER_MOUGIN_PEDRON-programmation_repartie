DECLARE
v_idResto NUMBER(3);
    v_numTables NUMBER(3);
    v_numPlaces NUMBER(3);
BEGIN
FOR i IN 1..77 LOOP
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
