CREATE DATABASE IF NOT EXISTS pds_mec;

CREATE TABLE IF NOT EXISTS pds_mec.User (
    email varchar(255) NOT NULL PRIMARY KEY,
    passwordHash varchar(255) NOT NULL,
    profile varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pds_mec.Profile (
    name varchar(255) NOT NULL PRIMARY KEY
);

