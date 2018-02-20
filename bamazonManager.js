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
        viewInventory();
        break;
      case "View Low Inventory" :
        viewLowInventory();
        break;  
      case "Add to Inventory" :
        addInventory();
        break;
      case "Add New Product" :
        addProduct();
        break;
      case "Exit" : console.log("");
        con.end();
        break;
    }
  })
}

function viewInventory() {
  con.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    managerFunction();
  });
}

function viewLowInventory() {
  con.query("SELECT * FROM products WHERE stock_quantity < 5;", function (err, res) {
    if (err) throw err;
    if (res.length === 0) {
      console.log("No low inventory to report.");
      console.log("");
    } else {
      console.log("");
      console.table(res);
    }
    managerFunction();
  });
}

function addInventory() {
  con.query("SELECT * FROM products;", function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "itemNumber",
        message: "Enter item ID number.",
        validate: function(str) {
          if (res.find(function(ele) {return ele.id == str;}) !== undefined) {
            return true;
          }
        }
      },
      {
        name: "quantity",
        message: "Adding how many to stock?",
        validate: function(str) {
          if (Number.isInteger(parseFloat(str)) && str >= 0) {
            return true;
          }
        }
      }
    ]).then(function(answer) {
      var query = "SELECT ";
        query += "id, ";
        query += "product_name, ";
        query += "stock_quantity ";
      query += "FROM products ";
      query += "WHERE id = ?;";
      con.query(query, [answer.itemNumber], function(err, res) {
        var itemStocked = { name : res[0].product_name, stock : parseInt(res[0].stock_quantity) };
        if (err) throw err;
        con.query("UPDATE products SET stock_quantity = ? WHERE id = ?;", 
          [
            parseInt(res[0].stock_quantity) + parseInt(answer.quantity), 
            answer.itemNumber
          ], 
          function(err, res) {
            if (err) throw err;
            itemStocked.stock += parseInt(answer.quantity);
            // console.log("post update res =", res);
            console.log(`\n${itemStocked.name}s added. New unit count: ${itemStocked.stock}\n`);
            managerFunction();
          }
        )
      })
    })
  })
}

function addProduct() {
  con.query("SELECT department_name, product_name FROM departments;", function(err, res) {
    if (err) throw err;
    var departments = [];
    res.forEach(function(data) {
      departments.push(data.department_name);
    })
    inquirer.prompt([
      {
        name: "productName",
        message: "What is the product name?",
        validate: function(str) {
          if (res.find(function(ele) {return ele.product_name == str;}) == undefined && str !== "") {
            return true;
          }
        }
      },
      {
        type: "list",
        name: "department",
        message: "What department?",
        choices: departments
      },
      {
        name: "price",
        message: "What is the unit price?",
        validate: function(str) {
          if (Number.isInteger(parseFloat(str)*100) && str >= 0) {
            return true;
          }
        }
      },
      {
        name: "quantity",
        message: "How many being stocked?",
        validate: function(str) {
          if (Number.isInteger(parseFloat(str)) && str >= 0) {
            return true;
          }
        }
      }
    ]).then(function(answer) {
      con.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${answer.productName}', '${answer.department}', '${answer.price}', '${answer.quantity}');`, function (err, result) {
        if (err) throw err;
        console.log("\nNew item added!\n");
        managerFunction();
      });
    })    
  })
}

con.connect(function(err) {
  if (err) throw err;
  console.log("");
  managerFunction();
})