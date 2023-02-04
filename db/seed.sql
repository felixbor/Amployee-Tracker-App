-- values for department table --
INSERT INTO department (department_name)
 VALUES 
('Engineer'),
('Sales'),
('HR'),
('Legal'),
('Logistics')
;

-- values for role table --
INSERT INTO role (title, salary, department_id) 
VALUES 
('Senior Engineer', 140000, 1),
('Engineer', 110000, 1),
('Sales Lead', 95000, 2),
('Sales Midle', 70000, 2),
('Sales Junior', 60000, 2),
('HRD', 105000, 3),
('Lawyer', 180000, 4),
('Head of LD',12500,5),
('Manager of LD',99900,5);



-- values for employee table --
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('David', 'Tong', 1, null),
('Ivan', 'Gura', 2, 1),
('Sidney', 'Wiver', 2, 1),
('Tony', 'Karera', 1, null),
('Gabe', 'Morris', 2, 4),
('Zaira', 'Dakaeva', 3, null),
('Stehpen', 'Rivet', 4, 6),
('Larry', 'Burd', 6, 6),
('Ibiza', 'Energy', 5, null),
('Tonny', 'Cookoch', 7, 2),
('Ibiza', 'Energy', 8, null),
('Tonny', 'Cookoch', 9, 4);


