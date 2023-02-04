const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//establishing connection with data base
const DbConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourPassword',
  database: 'company_db',
}
);

DbConnection.connect(err => {
  if (err) throw err;
  console.log("Server is running");
  StartApp()
});
// establishing  start app function that starts prompts
StartApp =()=>{
  inquirer.prompt({
    message: 'What would you like to do today? for exit Press ^C',
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
        AddEmployee();
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


// view all department function

const AllDepartments=()=>{ 
  DbConnection.query('SELECT * FROM department',function(err,result){
    console.table(result)
    StartApp()
  })
  console.log("view department")
}


// view all roles function
const AllRoles=()=>{ 
  DbConnection.query(`SELECT role.id ,
  role.title AS JOB_TITLE, department.department_name, role.salary
 FROM role 
 JOIN  department 
 ON role.department_id= department.id`,function(err,result){
  console.table(result),
  StartApp()
})
  
//console.log("view Roles")
}

// view all employees function

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
    console.log("view Employees")
      StartApp()
  })
      
    }

    // add department function
const AddDepartment=()=>{ 
  inquirer.prompt(
    {
  name: 'department_name',
  type: "input",
  message: 'Please enter the name of the department you intend to add to the  company database.',
  
  validate: department_name => {
    if (department_name) return true; 
    console.log(' Please enter department name. Field cannot be empty'); return false;
}
})
.then(response => {
    DbConnection.query(`INSERT INTO  Department (department_name)
    VALUES (?)`,`${response.department_name}`,
    function(err,result){
      if (err) throw err;
    console.log(`Department  ${response.department_name} is added!`)
    console.log('Please see updated list of departments!')
    AllDepartments()
  })
});

}


// add role function
const AddRole=()=>{  
  inquirer.prompt([
      {   name: 'Role',
          type: 'text',
          message: 'Please add name of the role you wwant to add',
          validate: Role => {
              if (Role) return true;
               console.log('Please enter a role.The feild cannnot be ampty'); return false;
          }
      },    
      {
          name: 'salary',
          type: 'number',
          message: 'What is the salary of this employee? (please enter annual salary amount)',
          validate: salary => {
              if (salary && salary >= 0) return true; console.log('No salary information was entered. Please enter a figure.'); return false;
          }
      },
      {
       
         name: 'departmentId',
         type: 'number',
          message: 'What is the department id of this employee? (e.g. 3)',
          validate: departmentData => {
              if (departmentData && departmentData >= 0) return true; console.log('No department id was entered. Please enter a whole number.'); return false;
          }
      }
      
  ]).then(response => {
    DbConnection.query(
        `INSERT INTO role (role.title, role.salary, role.department_id) values(?,?,?)`,
        [response.Role, response.salary, response.departmentId],
        function(err, res) {
            if (err) throw err;
            console.log("See updated list of roles");
            AllRoles();
        }
    );
})

 }

// add employee function
 const AddEmployee=()=>{
  inquirer.prompt([
    {
        name: "first_name",
        type: "input",
        message: "Please enter the first name of the employee you want to add to the database."
    },
    {
        name: "last_name",
        type: "input",
        message: "Please enter the last name of the employee you want to add to the database."
    },
    {
        name: "role_id",
        type: "number",
        message: "Please enter the role id  corresponding to employee you want to add to the database.please indicate number."
    },
    {
        name: "manager_id",
        type: "number",
        message: "Please enter the manager's id corresponding to the employee you want to add to the database. please indicate number."
    }

]).then(function (response) {
    DbConnection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
        if (err) throw err;
        console.log('The new employee has been  successfully added to the  company database');
        StartApp()
        });
    })
};
     
// update employee role function
const UpdateEmpRole=()=>{ 
  inquirer.prompt([
    {
        name: "last_name",
        type: "input",
        message: "Please enter the last name of the employee you want update in the database."
    },
    {
        name: "role_id",
        type: "number",
        message: "Please enter the new role id number corrresponding to employee you want to update in the  company database. Enter the number"
    }
]).then(function (response) {
    DbConnection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [response.role_id,response.last_name ], function (err, res) {
        if (err) throw err;
        console.log(`The new role  for empoyee  :${response.last_name} has been successfully  added to the  company database.`);
        StartApp()
      });
    })
}
      
  
//  view employees grouped by department function
const EmpByDepartment =()=>{
  DbConnection.query(`SELECT  department.department_name, 
  concat(first_name, ' ', last_name) as FullNAme  FROM employee 
 JOIN role ON role.id = employee.role_id 
 JOIN department ON role.department_id = department.id`,function(err,result){
    console.table(result)
    console.log("view Employees")
      StartApp()
  
})
} 


// View budget by department
const DepartmentBudget =()=>{
  DbConnection.query(`SELECT
  department.department_name,
 sum(role.salary) as Budget
 FROM employee
 left JOIN role
 ON role.id = employee.role_id
 left JOIN department
 ON role.department_id = department.id
 group by department.department_name`,
  function(err,result){
    if (err) throw err;
    console.table(result)
     StartApp()
  }) 
 // console.log("EmpByDepartment")
 
} 
