var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

function supervisorFunction() {
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose option:",
      choices: [
        "View Product Sales By Department",
        "Create New Department",
        "Exit"
      ]
    }
  ]).then(function(answer) {
    switch (answer.option) {
      case "View Product Sales By Department": 
        viewSales();
        break;
      case "Create New Department":
        createDepartment();
        break;
      case "Exit":
        console.log("");
        con.end();
        break;
    } 
  })
}

function viewSales() {
  console.log("");
  var query = "SELECT departments.department_id, ";
  query += "departments.department_name, ";
  query += "FORMAT(departments.overhead_costs,2) AS overhead_costs, ";
  query += "FORMAT(SUM(IFNULL(products.product_sales,0)),2) AS product_sales, ";
  query += "FORMAT(SUM(IFNULL(products.product_sales,0))-overhead_costs,2) AS total_profit ";
  query += "FROM departments ";
  query += "LEFT JOIN products ON departments.department_name = products.department_name ";
  query += "GROUP BY departments.department_name ";
  query += "ORDER BY department_id;"
  con.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    supervisorFunction();
  })
}

function createDepartment() {
  console.log("");
  inquirer.prompt([
    {
      name: "departmentName",
      message: "What is the department name?"
    },
    {
      name: "overhead",
      message: "What is the overhead cost?"
    }
  ]).then(function(answer) {
    con.query(`INSERT INTO departments (department_name,overhead_costs) VALUES ('${answer.departmentName}', '${answer.overhead}');`, function (err, result) {
      if (err) throw err;
      console.log("\nNew department added!\n");
      supervisorFunction();
    });
  })
}

con.connect(function(err) {
  if (err) throw err;
  console.log("");
  supervisorFunction();
})