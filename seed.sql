\c petshop;

DROP TABLE IF EXISTS petlist;

CREATE TABLE petlist(
    id serial,
    age integer,
    kind varchar,
    name varchar
);

INSERT INTO petlist (age, kind, name) VALUES (4, 'dog', 'luna');
INSERT INTO petlist (age, kind, name) VALUES (5, 'cat', 'sparkles');