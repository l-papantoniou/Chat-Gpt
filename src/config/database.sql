CREATE DATABASE company;

--set extention for uuid generate
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);


--insert into users
--bcrypted salt password 10 times
INSERT INTO users (email, password)
VALUES ('user@gmail.com', '1111');