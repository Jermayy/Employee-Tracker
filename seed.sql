USE employee_DB;

-- Departments:
INSERT INTO department (name) VALUES ('Retail');
INSERT INTO department (name) VALUES ('R&D');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Accounting');


-- roles:
INSERT INTO role (title,salary,dep_id) VALUES ('Retail Manager', 80000,1);
INSERT INTO role (title,salary,dep_id) VALUES ('Sales Clerk', 65000,1);

INSERT INTO role (title,salary,dep_id) VALUES ('R&D Manager', 120000,2);
INSERT INTO role (title,salary,dep_id) VALUES ('Senior Developer', 95000,2);
INSERT INTO role (title,salary,dep_id) VALUES ('Developer', 80000,2);

INSERT INTO role (title,salary,dep_id) VALUES ('Marketing Manager', 85000,3);
INSERT INTO role (title,salary,dep_id) VALUES ('Marketing Clerk', 72000,3);

INSERT INTO role (title,salary,dep_id) VALUES ('Senior Accountant', 100000,4);
INSERT INTO role (title,salary,dep_id) VALUES ('Intermediate Accountant', 80000,4);


-- Employees:

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Nichola','Bonham',1, null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Ben','James',2, Null);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Christopher','Allan',3, Null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Alan','Du',4, Null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Sione','Fekitoa',5, Null);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Linda','Heng',6, Null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Viviana','Shin',7, Null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('James','Glaves',7, Null);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Phoebe','Siu',8, Null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Chun','Loo',9, Null);

UPDATE employee SET manager_id = 1 WHERE id = 2;

UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 3 WHERE id = 5;

UPDATE employee SET manager_id = 6 WHERE id = 7;
UPDATE employee SET manager_id = 6 WHERE id = 8;

UPDATE employee SET manager_id = 8 WHERE id = 10;






SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;