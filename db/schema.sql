-- psql -U postgres -f db/schema.sql
-- psql -U postgres -f db/seed.sql

DROP DATABASE IF EXISTS yogaposes_dev;
CREATE DATABASE yogaposes_dev;

\c yogaposes_dev;

DROP TABLE IF EXISTS yogaposes;

CREATE TABLE yogaposes (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 level TEXT,
 sanskrit TEXT,
 instructions TEXT NOT NULL,
 benefits VARCHAR,
 website TEXT NOT NULL,
 image_link TEXT,
 is_favorite BOOLEAN
);