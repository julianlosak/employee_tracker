const mysql = require('mysql2');
const figlet = require("figlet")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
},
console.log(figlet.textSync('Employee Tracker\n', {
  font: "Standard",
  horizontalLayout: "fitted",
  verticalLayout: "fitted",
  width: 75,
  whitespaceBreak: true,
}))
);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

module.exports = db