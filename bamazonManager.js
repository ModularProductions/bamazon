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
  console.log("");
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
      case "Exit" : console.log(""); con.end(); break;
    }
  })
}

function viewInventory() {
  con.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    console.log("");
    result.forEach(function(item) {
      console.log(`${item.id} | ${item.product_name}   $${item.price}, ${item.stock_quantity}`);
    })
    managerFunction();
  });
}

function viewLowInventory() {
  con.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    var lowInv = false;
    console.log("");
    result.forEach(function(item) {
      if (item.stock_quantity < 5) {
        console.log(`${item.id} | ${item.product_name}   $${item.price}, ${item.stock_quantity}`);
        lowInv = true;
      }
    })
    if (!lowInv) {
      console.log("No low inventory to report.");
      console.log("");
    }
    managerFunction();
  });
}

function addInventory() {
  inquirer.prompt([
    {
      name: "itemNumber",
      message: "Enter item number: "
    },
    {
      name: "quantity",
      message: "How many added to stock?"
    }
  ]).then(function(answer) {
    var itemStocked = { id: answer.itemNumber };
    con.query(`SELECT id, product_name, stock_quantity FROM products`, function(err, result) {
      if (err) throw err;
      itemStocked.name = result[answer.itemNumber-1].product_name;
      itemStocked.quantity = p;
      con.query("UPDATE products SET ? WHERE ?", 
        [
          {
            stock_quantity : itemStocked.quantity
          },
          {
            id : answer.itemNumber
          }
        ], function(err, result) {
        if (err) throw err;
        console.log(`\n${itemStocked.name}s added. New unit count: ${itemStocked.quantity}`);
        managerFunction();
      })
    })
  })
}

function addProduct() {
  inquirer.prompt([
    {
      name: "productName",
      message: "What is the product name?"
    },
    {
      name: "departmentName",
      message: "What department?"
    },
    {
      name: "price",
      message: "What is the unit price?"
    },
    {
      name: "quantity",
      message: "How many being stocked?"
    }
  ]).then(function(answer) {
    con.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${answer.productName}', '${answer.departmentName}', '${answer.price}', '${answer.quantity}');`, function (err, result) {
      if (err) throw err;
      console.log("\nNew item added!");
      managerFunction();
    });
  })
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  managerFunction();
})