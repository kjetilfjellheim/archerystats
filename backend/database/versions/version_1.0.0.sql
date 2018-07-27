--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 10.4

-- Started on 2018-07-26 18:21:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 16389)
-- Name: archerystats_v1; Type: SCHEMA; Schema: -; Owner: archerystats
--

CREATE SCHEMA archerystats_v1;


ALTER SCHEMA archerystats_v1 OWNER TO archerystats;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 16418)
-- Name: bow; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1.bow (
    id character varying(100) NOT NULL,
    id_user character varying NOT NULL,
    bowname character varying NOT NULL
);


ALTER TABLE archerystats_v1.bow OWNER TO archerystats;

--
-- TOC entry 186 (class 1259 OID 24580)
-- Name: competition; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1.competition (
    id character varying(100) NOT NULL,
    date date NOT NULL,
    id_param character varying(100) NOT NULL,
    value numeric(8,3) NOT NULL,
    id_user character varying(100),
    training boolean DEFAULT false
);


ALTER TABLE archerystats_v1.competition OWNER TO archerystats;

--
-- TOC entry 187 (class 1259 OID 24583)
-- Name: competition_param; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1.competition_param (
    id character varying(100) NOT NULL,
    parameter character varying(100) NOT NULL,
    distance integer,
    "order" integer
);


ALTER TABLE archerystats_v1.competition_param OWNER TO archerystats;

--
-- TOC entry 185 (class 1259 OID 16445)
-- Name: diary; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1.diary (
    id character varying(100) NOT NULL,
    date date NOT NULL,
    comment character varying(2000) NOT NULL,
    spt integer,
    id_user character varying(100) NOT NULL,
    minutes integer
);


ALTER TABLE archerystats_v1.diary OWNER TO archerystats;

--
-- TOC entry 183 (class 1259 OID 16395)
-- Name: round; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1.round (
    id character varying(100) NOT NULL,
    id_user character varying(100) NOT NULL,
    shoot_date date NOT NULL,
    round integer NOT NULL,
    miss_scored boolean NOT NULL,
    perfect_scored boolean NOT NULL,
    badshot_scored boolean NOT NULL,
    id_bow character varying(100) NOT NULL,
    miss integer,
    perfect integer,
    badshot integer,
    horizontal_left integer,
    horizontal_center integer,
    horizontal_right integer,
    vertical_high integer,
    vertical_center integer,
    vertical_low integer,
    distance integer
);


ALTER TABLE archerystats_v1.round OWNER TO archerystats;

--
-- TOC entry 182 (class 1259 OID 16390)
-- Name: user; Type: TABLE; Schema: archerystats_v1; Owner: archerystats
--

CREATE TABLE archerystats_v1."user" (
    id character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE archerystats_v1."user" OWNER TO archerystats;

--
-- TOC entry 2016 (class 2606 OID 16425)
-- Name: bow bow_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.bow
    ADD CONSTRAINT bow_pkey PRIMARY KEY (id);


--
-- TOC entry 2026 (class 2606 OID 24587)
-- Name: competition_param competition_param_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.competition_param
    ADD CONSTRAINT competition_param_pkey PRIMARY KEY (id);


--
-- TOC entry 2022 (class 2606 OID 24589)
-- Name: competition competition_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.competition
    ADD CONSTRAINT competition_pkey PRIMARY KEY (id);


--
-- TOC entry 2019 (class 2606 OID 16452)
-- Name: diary diary_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.diary
    ADD CONSTRAINT diary_pkey PRIMARY KEY (id);


--
-- TOC entry 2014 (class 2606 OID 16399)
-- Name: round shoot_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.round
    ADD CONSTRAINT shoot_pkey PRIMARY KEY (id);


--
-- TOC entry 2009 (class 2606 OID 16394)
-- Name: user users_pkey; Type: CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2017 (class 1259 OID 16431)
-- Name: fki_fk_bow; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_bow ON archerystats_v1.bow USING btree (id_user);


--
-- TOC entry 2010 (class 1259 OID 16442)
-- Name: fki_fk_bow2; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_bow2 ON archerystats_v1.round USING btree (id_bow);


--
-- TOC entry 2023 (class 1259 OID 24595)
-- Name: fki_fk_competition; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_competition ON archerystats_v1.competition USING btree (id_param);


--
-- TOC entry 2020 (class 1259 OID 16458)
-- Name: fki_fk_diary_user; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_diary_user ON archerystats_v1.diary USING btree (id_user);


--
-- TOC entry 2011 (class 1259 OID 16410)
-- Name: fki_fk_user; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_user ON archerystats_v1.round USING btree (id_user);


--
-- TOC entry 2024 (class 1259 OID 24601)
-- Name: fki_fk_user_competition; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX fki_fk_user_competition ON archerystats_v1.competition USING btree (id_user);


--
-- TOC entry 2012 (class 1259 OID 16417)
-- Name: idx_date; Type: INDEX; Schema: archerystats_v1; Owner: archerystats
--

CREATE INDEX idx_date ON archerystats_v1.round USING hash (shoot_date);


--
-- TOC entry 2030 (class 2606 OID 16426)
-- Name: bow fk_bow; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.bow
    ADD CONSTRAINT fk_bow FOREIGN KEY (id_user) REFERENCES archerystats_v1."user"(id);


--
-- TOC entry 2028 (class 2606 OID 16432)
-- Name: round fk_bow; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.round
    ADD CONSTRAINT fk_bow FOREIGN KEY (id_bow) REFERENCES archerystats_v1.bow(id);


--
-- TOC entry 2029 (class 2606 OID 16437)
-- Name: round fk_bow2; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.round
    ADD CONSTRAINT fk_bow2 FOREIGN KEY (id_bow) REFERENCES archerystats_v1.bow(id);


--
-- TOC entry 2032 (class 2606 OID 24590)
-- Name: competition fk_competition; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.competition
    ADD CONSTRAINT fk_competition FOREIGN KEY (id_param) REFERENCES archerystats_v1.competition_param(id);


--
-- TOC entry 2031 (class 2606 OID 16453)
-- Name: diary fk_diary_user; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.diary
    ADD CONSTRAINT fk_diary_user FOREIGN KEY (id_user) REFERENCES archerystats_v1."user"(id);


--
-- TOC entry 2027 (class 2606 OID 16405)
-- Name: round fk_user; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.round
    ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES archerystats_v1."user"(id);


--
-- TOC entry 2033 (class 2606 OID 24596)
-- Name: competition fk_user_competition; Type: FK CONSTRAINT; Schema: archerystats_v1; Owner: archerystats
--

ALTER TABLE ONLY archerystats_v1.competition
    ADD CONSTRAINT fk_user_competition FOREIGN KEY (id_user) REFERENCES archerystats_v1."user"(id);


--
-- TOC entry 2159 (class 0 OID 0)
-- Dependencies: 8
-- Name: SCHEMA archerystats_v1; Type: ACL; Schema: -; Owner: archerystats
--

REVOKE ALL ON SCHEMA archerystats_v1 FROM PUBLIC;
REVOKE ALL ON SCHEMA archerystats_v1 FROM archerystats;
GRANT ALL ON SCHEMA archerystats_v1 TO archerystats;


--
-- TOC entry 2160 (class 0 OID 0)
-- Dependencies: 184
-- Name: TABLE bow; Type: ACL; Schema: archerystats_v1; Owner: archerystats
--

REVOKE ALL ON TABLE archerystats_v1.bow FROM PUBLIC;
REVOKE ALL ON TABLE archerystats_v1.bow FROM archerystats;
GRANT ALL ON TABLE archerystats_v1.bow TO archerystats;


--
-- TOC entry 2161 (class 0 OID 0)
-- Dependencies: 185
-- Name: TABLE diary; Type: ACL; Schema: archerystats_v1; Owner: archerystats
--

REVOKE ALL ON TABLE archerystats_v1.diary FROM PUBLIC;
REVOKE ALL ON TABLE archerystats_v1.diary FROM archerystats;
GRANT ALL ON TABLE archerystats_v1.diary TO archerystats;


--
-- TOC entry 2162 (class 0 OID 0)
-- Dependencies: 183
-- Name: TABLE round; Type: ACL; Schema: archerystats_v1; Owner: archerystats
--

REVOKE ALL ON TABLE archerystats_v1.round FROM PUBLIC;
REVOKE ALL ON TABLE archerystats_v1.round FROM archerystats;
GRANT ALL ON TABLE archerystats_v1.round TO archerystats;


--
-- TOC entry 2163 (class 0 OID 0)
-- Dependencies: 182
-- Name: TABLE "user"; Type: ACL; Schema: archerystats_v1; Owner: archerystats
--

REVOKE ALL ON TABLE archerystats_v1."user" FROM PUBLIC;
REVOKE ALL ON TABLE archerystats_v1."user" FROM archerystats;
GRANT ALL ON TABLE archerystats_v1."user" TO archerystats;


--
-- TOC entry 1654 (class 826 OID 16443)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: archerystats_v1; Owner: archerystats
--

ALTER DEFAULT PRIVILEGES FOR ROLE archerystats IN SCHEMA archerystats_v1 REVOKE ALL ON TABLES  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE archerystats IN SCHEMA archerystats_v1 REVOKE ALL ON TABLES  FROM archerystats;
ALTER DEFAULT PRIVILEGES FOR ROLE archerystats IN SCHEMA archerystats_v1 GRANT ALL ON TABLES  TO archerystats;


-- Completed on 2018-07-26 18:21:53

--
-- PostgreSQL database dump complete
--

