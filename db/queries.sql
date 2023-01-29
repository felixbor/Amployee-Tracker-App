---view AllDepartments--
SELECT * FROM department


-- view AllRoles--
SELECT role.id ,
 role.title AS JOB_TITLE, department.department_name, role.salary
FROM role 
JOIN  department 
ON role.department_id= department.id

--view ALLEmployees--
SELECT employee.id,
concat(employee.first_name, ' ',
employee.last_name) as Employee_Name,
role.title as Title,
department.department_name as Department,
role.salary as Salary,
CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
ORDER By employee.id

--add deparment--
INSERT INTO  Department (department_name)
   VALUES (?)

-- add role--



/* group employee by department*/
SELECT
department.department_name,
concat(first_name, ' ', last_name) as FullNAme
FROM employee
left JOIN role
  ON role.id = employee.role_id
 left JOIN department
  ON role.department_id = department.id;
/*budget by department */
  SELECT
 department.department_name,
sum(role.salary)
FROM employee
left JOIN role
  ON role.id = employee.role_id
 left JOIN department
  ON role.department_id = department.id
  group by department.department_name