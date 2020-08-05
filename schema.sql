DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;
USE employee_DB;



CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
CONSTRAINT employee_pk PRIMARY KEY(id)
);

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dep_name VARCHAR(30) NULL,
CONSTRAINT department_pk PRIMARY KEY(id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL NULL,
CONSTRAINT role_pk PRIMARY KEY(id)
);
----------------------------------------------------------------
ALTER TABLE role
   ADD CONSTRAINT FK_department_role FOREIGN KEY (depID)
      REFERENCES department (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;