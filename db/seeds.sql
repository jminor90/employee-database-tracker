INSERT INTO Departments (dept_name)
VALUES ("Engineering"), -- 1
      ("Finance"), -- 2
      ("Legal"), -- 3
      ("Sales"); -- 4

INSERT INTO Roles (role_title, role_salary, role_dept_id)
VALUES ("Engineer", 55000, 1), -- 1
      ("Accountant", 65000, 2), -- 2
      ("Lawyer", 75000, 3), -- 3
      ("Sales-Person", 45000, 4); -- 4

INSERT INTO Employees (first_name, last_name, emp_role_id, manager_id)
VALUES ("Otto", "Octavius", 1, 1), -- Engineer
      ("Norman","Osborn", 1, 2), -- Engineer
      ("Maxwell","Dillon", 4, NULL), -- Sales
      ("Adrian","Toomes", 3, NULL), -- Lawyer
      ("Quentin","Beck", 2, NULL), -- Accountant
      ("Flint","Marko", 4, NULL); -- Sales
