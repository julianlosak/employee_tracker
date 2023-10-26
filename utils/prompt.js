// Import path for database connection
const db = require('../config/connection');

// Main menu prompt
const menuPrompt = [
  {
    type: 'list',
    name: 'choices',
    message: 'What would you like to do?',
    choices: [
      { name: 'View All Departments', value: 'ALL_DEPARTMENTS' },
      { name: 'View All Roles', value: 'ALL_ROLES' },
      { name: 'View All Employees', value: 'ALL_EMPLOYEES' },
      { name: 'Add a Department', value: 'ADD_DEPARTMENT' },
      { name: 'Add a Role', value: 'ADD_ROLE' },
      { name: 'Add an Employee', value: 'ADD_EMPLOYEE' },
      { name: 'Update an Employee Role', value: 'UPDATE_EMPLOYEE' },
      { name: 'Exit', value: 'EXIT' },
    ],
  },
];

// Question to add a department
const addDepartmentPrompt = {
  type: 'input',
  name: 'department_name',
  message: "Name the new department.",
};

// Questions for adding roles
const addRolePrompt = async (departmentChoices) => {
  const departments = await departmentChoices();
  return [
    {
      type: 'input',
      name: 'role_title',
      message: 'What is the role title?',
    },
    {
      type: 'list',
      name: 'role_department',
      message: 'What department will it fall in?',
      choices: departments,
    },
    {
      type: 'input',
      name: 'role_salary',
      message: "What's the roles salary?",
    },
  ];
};

// Questions for adding employees
const addEmployeePrompt = async (roleChoices, employeeManager) => {
  const roles = await roleChoices();
  const managers = await employeeManager();
  return [
    {
      type: 'input',
      name: 'employee_firstName',
      message: "First Name",
    },
    {
      type: 'input',
      name: 'employee_lastName',
      message: "Last Name",
    },
    {
      type: 'list',
      name: 'employee_role',
      message: "What is the employee's role?",
      choices: roles,
    },
    {
      type: 'list',
      name: 'employee_manager',
      message: "Who is the employee's manager?",
      choices: managers,
    },
  ];
};

// Questions to update an existing employee
const updateEmployeePrompt = async (employeeChoice, roleChoices) => {
  const employees = await employeeChoice();
  const roles = await roleChoices();
  return [
    {
      type: 'list',
      name: 'employee',
      message: 'Select the employee to update their role:',
      choices: employees,
    },
    {
      type: 'list',
      name: 'employee_role',
      message: "Enter the new role ID for the employee:",
      choices: roles,
    },
  ];
};

module.exports = { menuPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt };
