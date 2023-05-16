--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-01 19:16:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 3 (class 3079 OID 16447)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16497)
-- Name: benchmarkresult; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.benchmarkresult (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    gameid uuid,
    componentid uuid,
    settings uuid,
    averagefps real,
    zeroonefps real,
    onefps real,
    note character varying(255)
);


ALTER TABLE public.benchmarkresult OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16473)
-- Name: component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    chipvendor character varying(128),
    productvendor character varying(128),
    typeid integer NOT NULL,
    description character varying(255)
);


ALTER TABLE public.component OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16468)
-- Name: componenttypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.componenttypes (
    typeid integer NOT NULL,
    category character varying(255) NOT NULL
);


ALTER TABLE public.componenttypes OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16458)
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(512),
    publisher character varying(255)
);


ALTER TABLE public.game OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16486)
-- Name: gamesettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gamesettings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    gameid uuid,
    resolution character varying(64) NOT NULL,
    tooltip character varying(255) NOT NULL
);


ALTER TABLE public.gamesettings OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32769)
-- Name: benchmarkfull; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.benchmarkfull AS
 SELECT benchmarkresult.id,
    game.id AS gameid,
    component.id AS componentid,
    benchmarkresult.averagefps,
    benchmarkresult.zeroonefps,
    benchmarkresult.onefps,
    game.name AS gamename,
    game.description AS gamedescription,
    game.publisher,
    component.name AS componentname,
    component.chipvendor,
    component.productvendor,
    component.description AS componentdescription,
    componenttypes.category AS componenttype,
    gamesettings.resolution,
    gamesettings.tooltip AS settingstooltip,
    benchmarkresult.note
   FROM ((((public.benchmarkresult
     JOIN public.game ON ((benchmarkresult.gameid = game.id)))
     JOIN public.component ON ((benchmarkresult.componentid = component.id)))
     JOIN public.componenttypes ON ((component.typeid = componenttypes.typeid)))
     JOIN public.gamesettings ON ((benchmarkresult.settings = gamesettings.id)));


ALTER TABLE public.benchmarkfull OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16518)
-- Name: componentdata; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.componentdata AS
 SELECT component.id,
    component.name,
    component.chipvendor,
    component.productvendor,
    component.description,
    componenttypes.category
   FROM (public.component
     JOIN public.componenttypes ON ((component.typeid = componenttypes.typeid)));


ALTER TABLE public.componentdata OWNER TO postgres;

--
-- TOC entry 3225 (class 2606 OID 16502)
-- Name: benchmarkresult benchmarkresult_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benchmarkresult
    ADD CONSTRAINT benchmarkresult_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 16527)
-- Name: component component_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_name_key UNIQUE (name);


--
-- TOC entry 3221 (class 2606 OID 16480)
-- Name: component component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY (id);


--
-- TOC entry 3217 (class 2606 OID 16472)
-- Name: componenttypes componenttypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componenttypes
    ADD CONSTRAINT componenttypes_pkey PRIMARY KEY (typeid);


--
-- TOC entry 3213 (class 2606 OID 16467)
-- Name: game game_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_name_key UNIQUE (name);


--
-- TOC entry 3215 (class 2606 OID 16465)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 16491)
-- Name: gamesettings gamesettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamesettings
    ADD CONSTRAINT gamesettings_pkey PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 16552)
-- Name: benchmarkresult unique_benchmark; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benchmarkresult
    ADD CONSTRAINT unique_benchmark UNIQUE (gameid, componentid, settings);


--
-- TOC entry 3230 (class 2606 OID 16508)
-- Name: benchmarkresult benchmarkresult_componentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benchmarkresult
    ADD CONSTRAINT benchmarkresult_componentid_fkey FOREIGN KEY (componentid) REFERENCES public.component(id);


--
-- TOC entry 3231 (class 2606 OID 16503)
-- Name: benchmarkresult benchmarkresult_gameid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benchmarkresult
    ADD CONSTRAINT benchmarkresult_gameid_fkey FOREIGN KEY (gameid) REFERENCES public.game(id);


--
-- TOC entry 3232 (class 2606 OID 16513)
-- Name: benchmarkresult benchmarkresult_settings_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benchmarkresult
    ADD CONSTRAINT benchmarkresult_settings_fkey FOREIGN KEY (settings) REFERENCES public.gamesettings(id);


--
-- TOC entry 3228 (class 2606 OID 16481)
-- Name: component fk_componenttype; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT fk_componenttype FOREIGN KEY (typeid) REFERENCES public.componenttypes(typeid);


--
-- TOC entry 3229 (class 2606 OID 16492)
-- Name: gamesettings gamesettings_gameid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamesettings
    ADD CONSTRAINT gamesettings_gameid_fkey FOREIGN KEY (gameid) REFERENCES public.game(id);


-- Completed on 2023-04-01 19:16:32

--
-- PostgreSQL database dump complete
--

