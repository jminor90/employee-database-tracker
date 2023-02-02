const inquirer = require('inquirer');
const db = require('./db/connection');

/*
Present Following Options:
View All Deparments, !
View All Roles, !
View All Employees, !

Add a Department,
Add a Role,
Add an Employee,
Update Employee Role

*/


const questions = [
  {
      name: "initialQuestions",
      type: "list",
      message: 
`-----
What would you like to do?
-----
`,
      choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update Employee Role",
          "Exit",
      ]
  }];


function init() {
  inquirer
  .prompt(questions)
  .then(answer => {
    handleInitChoice(answer)
  })
  .catch(console.error('Error!'))
}

function handleInitChoice(answer){

  switch (answer.initialQuestions) {
    case "View All Departments":
      viewDeparments();
      break;

    case "View All Roles":
      viewRoles();
      break;

    case "View All Employees":
      viewEmployees();
      break;

    case "Add a Department":
      addDepartment();
      break;

    case "Add a Role":
      addRole();
      break;

    case "Add an Employee":
      addEmployee();
      break;

    case "Update Employee Role":
      addEmpRole();
      break;

    default:
      console.info("Good Bye!");
      process.exit()

    
    }
}

function viewDeparments() {
  db.query('SELECT * FROM Departments;', function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  init();
};

function viewRoles() {
  db.query('SELECT * FROM Roles;', function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  init();
};

function viewEmployees() {
  db.query('SELECT * FROM Employees;', function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  init();
};

function addDepartment() {
  const addDepartmentQ = [
    {
      message: 'What Department would you like to add?',
      type: 'input',
      name: 'addDepartmentData'
    }
  ]

  const data = addDepartmentQ.addDepartmentData
  inquirer
  .prompt(addDepartmentQ)
  .then(
    console.log(data)
  ).then (
    
  )
  .catch(console.error('Error!'))


  // console.log("Add Department Function...not built")
  init();
};

function addRole() {
  console.log("Add Role Function...not built")
  init();
};

function addEmployee() {
  console.log("Add Employee Function...not built")
  init();
};

function addEmpRole() {
  console.log("Add Employee_Role Function...not built")
  init();
};


init();