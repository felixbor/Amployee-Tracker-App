
-- dropping(deleting) database if it exists-- 
DROP DATABASE IF EXISTS company_db;

-- creaing a new database--
CREATE DATABASE company_db;
USE company_db;
-- creating "Department" table--
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- creating "role" table--
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department (id)
);
-- creating "employee" table--
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)REFERENCES role (id),
    manager_id INT, 
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
