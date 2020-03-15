CREATE DATABASE IF NOT EXISTS pds_mec;

CREATE TABLE IF NOT EXISTS pds_mec.Profile (
    name varchar(255) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS pds_mec.User (
    email varchar(255) NOT NULL PRIMARY KEY,
    passwordHash varchar(255) NOT NULL,
    profile varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pds_mec.Mechanic (
    userEmail varchar(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (userEmail) REFERENCES User(email)
);

ALTER TABLE pds_mec.User ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profile`) REFERENCES `profile` (`name`);

INSERT IGNORE INTO pds_mec.Profile values ("MECHANIC");
