const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const DbConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Crbkta',
  database: 'company_db',
}
);

DbConnection.connect(err => {
  if (err) throw err;
  console.log("Server is running");
  StartApp()
});

StartApp =()=>{
  inquirer.prompt({
    message: 'What would you like to do today?',
    name: 'menu',
    type: 'list',
    choices: [ 
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role',
      'View employees grouped by department',
      'View budget by department',
      'Exit',
    ],
  })
  .then(response => {
      switch (response.menu) {
      case 'View all departments':
       AllDepartments();
        break;
      case 'View all roles':
        AllRoles();
        break;
      case 'View all employees':
        AllEmployees();
        break;
      case 'Add a department':
        AddDepartment();
        break;
      case 'Add a role':
        AddRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update employee role':
        UpdateEmpRole();
        break;
      case 'View employees grouped by department':
        EmpByDepartment();
        break;
      case 'View budget by department':
        DepartmentBudget();
        break;
      case "Exit":
        DbConnection.end();
        break;
      default:
        DbConnection.end();
    }
  });
};




const AllDepartments=()=>{ 
  DbConnection.query('SELECT * FROM department',function(err,result){
    console.table(result)
    StartApp()
  })
  console.log("view department")
}
const AllRoles=()=>{ 
  DbConnection.query(`SELECT role.id ,
  role.title AS JOB_TITLE, department.department_name, role.salary
 FROM role 
 JOIN  department 
 ON role.department_id= department.id`,function(err,result){
  console.table(result)
})
  StartApp()
//console.log("view Roles")
}
const AllEmployees=()=>{ 
  DbConnection.query(`SELECT employee.id,
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
  ORDER By employee.id`,function(err,result){
    console.table(result)
  })
      console.log("view Employees")
      StartApp()
    }

const AddDepartment=()=>{ inquirer.prompt({
  message: 'Please enter the name of the department you intend to add to the  company database.',
  name: 'department_name',
  type: "input",
})
.then(response => {
    DbConnection.query(`INSERT INTO  Department (department_name)
    VALUES (?)`,`${response.department_name}`,function(err,result){
    console.log(result)
    console.log('Please see updated list of departments!')
    AllDepartments()

  })
});



 
      console.log("add Department")
      StartApp()
}
const AddRole=()=>{ 

     console.log("add Role")
     StartApp()
 }
const UpdateEmpRole=()=>{ 
       console.log("update employee role")
       StartApp()
}
const EmpByDepartment =()=>{
  DbConnection.query(`SELECT  department.department_name, concat(first_name, ' ', last_name) as FullNAme  FROM employeeleft JOIN role ON role.id = employee.role_idleft JOIN department ON role.department_id = department.id`,function(err,result){
    console.table(result)
  }) 
 // console.log("EmpByDepartment")
  StartApp()
} 
const DepartmentBudget =()=>{
  console.log("Budget")
} 