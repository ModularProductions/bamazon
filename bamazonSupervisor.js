var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

function supervisorFunction() {
  console.log("");
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose option:",
      choices: [
        
      ]
    }
  ])
}