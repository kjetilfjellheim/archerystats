
alter table archerystats_v1."user" add column facebookid character varying(100);

CREATE TABLE archerystats_v1.primary_training
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    training character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "order" integer,
    CONSTRAINT primary_training_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE archerystats_v1.primary_training
    OWNER to archerystats;

INSERT INTO archerystats_v1.primary_training(id, training, "order", deprecated) VALUES ('0a38730b-4184-42a0-81a4-48728fae5e1c', 'Stance', 1, false);
INSERT INTO archerystats_v1.primary_training(id, training, "order", deprecated) VALUES ('07fa83b1-9493-4113-88be-80ae6f95209e', 'Backtension', 2, false);
INSERT INTO archerystats_v1.primary_training(id, training, "order", deprecated) VALUES ('809630f1-5259-4c9b-8f4d-c812670f99c3', 'Bowarm pressure', 3, false);
INSERT INTO archerystats_v1.primary_training(id, training, "order", deprecated) VALUES ('591e094d-6e38-4de2-881f-fa0fe2b56325', 'Bowarm loose hold', 4, false);
INSERT INTO archerystats_v1.primary_training(id, training, "order", deprecated) VALUES ('fa24ae53-ec03-4447-9858-2b3a7f1d9860', 'Aiming', 5, false);

