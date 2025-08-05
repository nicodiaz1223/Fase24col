--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-04 19:07:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id bigint NOT NULL,
    usuario_id bigint
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16409)
-- Name: carrito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carrito_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carrito_id_seq OWNER TO postgres;

--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 221
-- Name: carrito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;


--
-- TOC entry 224 (class 1259 OID 16422)
-- Name: carrito_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito_item (
    id bigint NOT NULL,
    cantidad integer,
    producto_id bigint,
    carrito_id bigint
);


ALTER TABLE public.carrito_item OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16421)
-- Name: carrito_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carrito_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carrito_item_id_seq OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 223
-- Name: carrito_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carrito_item_id_seq OWNED BY public.carrito_item.id;


--
-- TOC entry 226 (class 1259 OID 16439)
-- Name: pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido (
    id bigint NOT NULL,
    fecha timestamp without time zone,
    total double precision,
    direccion_envio character varying(255),
    forma_pago character varying(255),
    usuario_id bigint
);


ALTER TABLE public.pedido OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16438)
-- Name: pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedido_id_seq OWNER TO postgres;

--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 225
-- Name: pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;


--
-- TOC entry 228 (class 1259 OID 16453)
-- Name: pedido_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido_item (
    id bigint NOT NULL,
    cantidad integer,
    precio_unitario double precision,
    subtotal double precision,
    producto_id bigint,
    pedido_id bigint
);


ALTER TABLE public.pedido_item OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16452)
-- Name: pedido_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedido_item_id_seq OWNER TO postgres;

--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 227
-- Name: pedido_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_item_id_seq OWNED BY public.pedido_item.id;


--
-- TOC entry 220 (class 1259 OID 16401)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id bigint NOT NULL,
    nombre character varying(255),
    descripcion character varying(255),
    precio double precision,
    stock integer,
    categoria character varying(255),
    imagen_url character varying(255)
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16400)
-- Name: producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_id_seq OWNER TO postgres;

--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 219
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_seq OWNED BY public.producto.id;


--
-- TOC entry 218 (class 1259 OID 16390)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id bigint NOT NULL,
    nombre character varying(255),
    correo character varying(255),
    contrasena character varying(255),
    rol character varying(255),
    direccion character varying(255)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 4769 (class 2604 OID 16413)
-- Name: carrito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 16425)
-- Name: carrito_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_item ALTER COLUMN id SET DEFAULT nextval('public.carrito_item_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 16442)
-- Name: pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 16456)
-- Name: pedido_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_item ALTER COLUMN id SET DEFAULT nextval('public.pedido_item_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 16404)
-- Name: producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id SET DEFAULT nextval('public.producto_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 16393)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 4943 (class 0 OID 16410)
-- Dependencies: 222
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito (id, usuario_id) FROM stdin;
\.


--
-- TOC entry 4945 (class 0 OID 16422)
-- Dependencies: 224
-- Data for Name: carrito_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito_item (id, cantidad, producto_id, carrito_id) FROM stdin;
\.


--
-- TOC entry 4947 (class 0 OID 16439)
-- Dependencies: 226
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido (id, fecha, total, direccion_envio, forma_pago, usuario_id) FROM stdin;
\.


--
-- TOC entry 4949 (class 0 OID 16453)
-- Dependencies: 228
-- Data for Name: pedido_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido_item (id, cantidad, precio_unitario, subtotal, producto_id, pedido_id) FROM stdin;
\.


--
-- TOC entry 4941 (class 0 OID 16401)
-- Dependencies: 220
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (id, nombre, descripcion, precio, stock, categoria, imagen_url) FROM stdin;
\.


--
-- TOC entry 4939 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nombre, correo, contrasena, rol, direccion) FROM stdin;
1	Juan Pérez	juan.perez@example.com	password123	cliente	\N
2	María García	maria.garcia@example.com	securepass	cliente	\N
3	Admin Principal	admin@tienda.com	admin1234	admin	\N
4	Carlos López	carlos.lopez@example.com	mypassword	cliente	\N
5	Ana Martínez	ana.martinez@example.com	anapass567	cliente	\N
12	Juan Carrillo	Juan.Carrillo@bd.edu.co	JuanCarrillo0*	CLIENTE	Villavicencio
\.


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 221
-- Name: carrito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_id_seq', 1, false);


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 223
-- Name: carrito_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_item_id_seq', 1, false);


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 225
-- Name: pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_id_seq', 1, false);


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 227
-- Name: pedido_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_item_id_seq', 1, false);


--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 219
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_seq', 1, false);


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 12, true);


--
-- TOC entry 4782 (class 2606 OID 16427)
-- Name: carrito_item carrito_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_item
    ADD CONSTRAINT carrito_item_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 16415)
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 16458)
-- Name: pedido_item pedido_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_item
    ADD CONSTRAINT pedido_item_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 16446)
-- Name: pedido pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 16408)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 16399)
-- Name: usuario usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);


--
-- TOC entry 4776 (class 2606 OID 16397)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4788 (class 2606 OID 16433)
-- Name: carrito_item carrito_item_carrito_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_item
    ADD CONSTRAINT carrito_item_carrito_id_fkey FOREIGN KEY (carrito_id) REFERENCES public.carrito(id);


--
-- TOC entry 4789 (class 2606 OID 16428)
-- Name: carrito_item carrito_item_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_item
    ADD CONSTRAINT carrito_item_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(id);


--
-- TOC entry 4787 (class 2606 OID 16416)
-- Name: carrito carrito_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


--
-- TOC entry 4791 (class 2606 OID 16464)
-- Name: pedido_item pedido_item_pedido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_item
    ADD CONSTRAINT pedido_item_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedido(id);


--
-- TOC entry 4792 (class 2606 OID 16459)
-- Name: pedido_item pedido_item_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_item
    ADD CONSTRAINT pedido_item_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(id);


--
-- TOC entry 4790 (class 2606 OID 16447)
-- Name: pedido pedido_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


-- Completed on 2025-08-04 19:07:10

--
-- PostgreSQL database dump complete
--

