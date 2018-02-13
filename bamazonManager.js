var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

function managerFunction() {
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose option:",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    }
  ]).then(function(answer) {
    switch (answer.option) {
      case "View Products for Sale" : 
        con.query("SELECT * FROM products", function (err, result) {
          if (err) throw err;
          result.forEach(function(item) {
            console.log(`${item.id} | ${item.product_name}   $${item.price}, ${item.stock_quantity}`);
          })
        });
        managerFunction();
        break;
      case "View Low Inventory" :
        con.query("SELECT * FROM products", function (err, result) {
          if (err) throw err;
          var lowInv = false;
          result.forEach(function(item) {
            if (item.stock_quantity < 5) {
              console.log(`${item.id} | ${item.product_name}   $${item.price}, ${item.stock_quantity}`);
              lowInv = true;
            }
          })
          if (!lowInv) {
            console.log("No low inventory to report.");
          }
        });
        managerFunction();
        break;  
      case "Add to Inventory" :
        
        
      case "Exit" : con.end(); break;
    }
    con.end();
  })
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  managerFunction();
})
