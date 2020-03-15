CREATE DATABASE IF NOT EXISTS app_test;

CREATE TABLE IF NOT EXISTS app_test.Profile (
    name varchar(255) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS app_test.User (
    email varchar(255) NOT NULL PRIMARY KEY,
    passwordHash varchar(255) NOT NULL,
    profile varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS app_test.Mechanic (
    userEmail varchar(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (userEmail) REFERENCES User(email)
);

ALTER TABLE app_test.User ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profile`) REFERENCES `profile` (`name`);

INSERT IGNORE INTO app_test.Profile values ("MECHANIC");
