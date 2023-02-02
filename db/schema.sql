DROP DATABASE IF EXISTS oscorp_db;
CREATE DATABASE oscorp_db;

USE oscorp_db;

CREATE TABLE Departments (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE Roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  role_dept_id INT,
  FOREIGN KEY (role_dept_id) REFERENCES Departments(dept_id),
  PRIMARY KEY (role_id)
);

CREATE TABLE Employees (
  emp_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role_id INT,
  manager_id INT,
  FOREIGN KEY (emp_role_id) REFERENCES Roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES Employees(emp_id),
  PRIMARY KEY (emp_id)
);
