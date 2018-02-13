var mysql = require("mysql");
var inquirer = require("inquirer");

var inventory;

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    console.log("Result: ", JSON.stringify(result));
    inventory = result;
    result.forEach(function(item) {
      console.log(`${item.id} | ${item.product_name}   $${item.price}`);
    });
    
    inquirer.prompt([
      {
        name: "requestID",
        message: "What item number would you like to buy?"
      },
      {
        name: "units",
        message: "How many would you like?"
      }
    ]).then(function(answer) {
      if (answer.units > inventory[answer.requestID-1].stock_quantity) {
        console.log("Sorry, we don't have enough of those in stock!");
      } else {
        con.query(`UPDATE products SET stock_quantity = ${inventory[answer.requestID-1].stock_quantity - answer.units} WHERE id = ${answer.requestID}`, function (err, result) {
          if (err) throw err;
          console.log(`Thank you!\nYour cost is $${inventory[answer.requestID-1].price * answer.units}`);
        })
      }
      con.end();
    })
  });
});

