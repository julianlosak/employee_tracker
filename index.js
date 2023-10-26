const inquirer = require('inquirer');
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KingGizzard@2',
  database: 'employee_db',
});

const query = util.promisify(connection.query).bind(connection);

async function init() {
  try {
    await connectToDatabase();
    await createTables();
    await seedData();
    mainMenu();
  } catch (error) {
    console.error('Error:', error);
    connection.end();
  }
}

async function connectToDatabase() {
  connection.connect();
}

async function createTables() {
  const schemaSQL = `
    DROP DATABASE IF EXISTS employee_db;
    CREATE DATABASE employee_db;
    USE employee_db;

    ${require('./db/schema.sql')};
  `;

  await query(schemaSQL);
}

async function seedData() {
  const seedsSQL = `
    ${require('./db/seeds.sql')};
  `;

  await query(seedsSQL);
}

function mainMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    })
    .then((answers) => {
      switch (answers.choice) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
      }
    });
}

function viewAllDepartments() {
  const query = 'SELECT id, name FROM department';

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error:', err);
          return;
      }
      console.log('List of Departments:');
      console.table(results);

      mainMenu();
  });
} 

function viewAllRoles() {
  const query = 'SELECT id, title, salary, department_id FROM role';

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error:', err);
          return;
      }
      console.log('List of Roles:');
      console.table(results);

      mainMenu();
  });
}

function viewAllEmployees() {
  const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error:', err);
          return;
      }
      console.log('List of Employees:');
      console.table(results);

      mainMenu();
  });
}

function addDepartment() {
    inquirer
      .prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      })
      .then((answers) => {
        const query = 'INSERT INTO department (name) VALUES (?)';

        connection.query(query, [answers.name], (err, results) => {
          if (err) {
            console.error('Error:', err);
            return;
          }
  
          console.log(`Department "${answers.name}" added successfully.`);
  
          mainMenu();
        });
      });
  }
  

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

      connection.query(
        query,
        [answers.title, answers.salary, answers.department_id],
        (err, results) => {
          if (err) {
            console.error('Error:', err);
            return;
          }

          console.log(`Role "${answers.title}" added successfully.`);

          mainMenu();
        }
      );
    });
}


function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID for the employee (if applicable):',
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  
        connection.query(
          query,
          [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
          (err, results) => {
            if (err) {
              console.error('Error:', err);
              return;
            }
  
            console.log(`Employee "${answers.first_name} ${answers.last_name}" added successfully.`);
  
            mainMenu();
          }
        );
      });
  }
  

  function updateEmployeeRole() {
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, employees) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      const employeeChoices = employees.map((employee) => ({
        name: employee.full_name,
        value: employee.id,
      }));
  
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update their role:',
            choices: employeeChoices,
          },
          {
            type: 'input',
            name: 'new_role_id',
            message: 'Enter the new role ID for the employee:',
          },
        ])
        .then((answers) => {
          const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  
          connection.query(query, [answers.new_role_id, answers.employee_id], (err, results) => {
            if (err) {
              console.error('Error:', err);
              return;
            }
  
            console.log(`Employee's role updated successfully.`);

            mainMenu();
          });
        });
    });
  }
  

init();
