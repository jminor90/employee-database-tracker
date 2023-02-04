const main = async () => {

const inquirer = require('inquirer');
const db = await require('./db/connection');


/*
Present Following Options:
View All Deparments, !
View All Roles, !
View All Employees, !

Add a Department,!
Add a Role, !
Add an Employee, ?
Update Employee Role ?
*/


const questions = [
  {
      name: "initialQuestions",
      type: "list",
      message: 
`What would you like to do?
---------------------------
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


const init = async () => {
  
  const initFunction = await inquirer.prompt(questions)

  await handleInitChoice (initFunction)

  // .catch(console.error('Error!'))
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


const viewDeparments = async () => {
  [ rows, fields ] = await db.query('SELECT * FROM Departments;')
  console.table(rows, [`dept_id`, `dept_name`])
  init();
}


const viewRoles = async () => {
  [ rows, fields ] = await db.query('SELECT * FROM Roles;')
  console.table(rows)
  init();
}


const viewEmployees = async() => {
  [rows, fields] = await db.query('SELECT * FROM Employees;')
  console.table(rows)
  init();
}


const addDepartment = async() => {
  const addDepartmentQ = [
    {
      message: 'What Department would you like to add?',
      type: 'input',
      name: 'addDepartmentData'
    }
  ]

  const data = await inquirer.prompt(addDepartmentQ)

  query = await db.query(`INSERT INTO Departments (dept_name) VALUES (?)`, data.addDepartmentData , function (err,result) {
    if (err) throw err;
    console.log(result)
  },
  console.log(`Succesfully Added ${data.addDepartmentData} to the Database`),
  init()
  )
}

const addRole = async() => {
  let departmentArray = [];
  // makeDepartmentArray();
  const [rows] = await db.query("SELECT * FROM Departments")
  for(i = 0; i < rows.length; i++) {
    departmentArray.push(rows[i].dept_id + "-" + rows[i].dept_name)
  }
  
  // console.log(rows)
  // console.log(departmentArray)
  const addRoleQ = [
    {
      message: 'What Role would you like to add?',
      type: 'input',
      name: 'addRoleData'
    },
    {
      message: `What's the Salary of the Role?`,
      type: 'input',
      name: 'addSalaryData'
    },
    {
      message: `Which Department does the role belong to?`,
      type: 'list',
      choices: departmentArray,
      name: 'addDepartmentData'
    }
  ]
  
  const data = await inquirer.prompt(addRoleQ)

  await db.query(`INSERT INTO Roles (role_title, role_salary, role_dept_id) VALUES ('${data.addRoleData}', '${data.addSalaryData}', '${data.addDepartmentData[0].split('-')}');`,)
  console.log( `Succesfully Added ${data.addRoleData}`),
  init()
}

const addEmployee = async() => {
  let roleArray =[];
  const [roleRows] = await db.query("SELECT * FROM Roles;")
  for(i = 0; i < roleRows.length; i++) {
    roleArray.push(roleRows[i].role_id+"-"+roleRows[i].role_title)
  }

  // also push NO Manager to equal NULL 
  let managerArray = []
  const [managerRows] = await db.query("SELECT * FROM Employees;")
  for(i = 0; i < managerRows.length; i++) {
    managerArray.push(managerRows[i].emp_id+"-"+`${managerRows[i].first_name} ${managerRows[i].last_name}`)
  }
  managerArray.push('None')
  // console.log(rows)
  // console.log(managerArray)

  const addEmployeeQ = [
    {
      message:`What is the Employee's First Name?`,
      type: `input`,
      name: `addEmpFirstName`
    },
    {
      message: `What is the Employee's Last Name?`,
      type: `input`,
      name: `addEmpLastName`
    },
    {
      message: `What is the Employee's Role?`,
      type: `list`,
      choices: roleArray,
      name: `addEmpRole`
    },
    {
      message: `Select a manager for employee`,
      type: `list`,
      choices: managerArray,
      name: `addManager`
    }
  ]

  const data = await inquirer.prompt(addEmployeeQ)

  if (data.addManager === 'None') {
    await db.query(`INSERT INTO Employees (first_name, last_name, emp_role_id, manager_id) VALUES ('${data.addEmpFirstName}', '${data.addEmpLastName}', '${data.addEmpRole[0].split('-')}', NULL);`,)

  } else {
    await db.query(`INSERT INTO Employees (first_name, last_name, emp_role_id, manager_id) VALUES ('${data.addEmpFirstName}', '${data.addEmpLastName}', '${data.addEmpRole[0].split('-')}', '${data.addManager[0].split('-')}' );`,)

  }

  console.log( `Succesfully Added ${data.addEmpFirstName} ${data.addEmpLastName} `),
  init()
}


// Like the Add Employee function. this will require 2 loops, First loop will be the employees Array, but Not sure how to get the second loop going without conflict errors.
function addEmpRole() {
  console.log("Add Employee_Role Function...not built")
  init();
};


init();

}
main();