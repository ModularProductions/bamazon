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

function customerFunction() {
  var query = "SELECT id, ";
  query += "product_name, ";
  query += "CONCAT('$', price) AS price, ";
  query += "CASE stock_quantity ";
    query += "WHEN 0 THEN 'out of stock' ";
    query += "ELSE 'in stock' END ";
  query += "AS availability ";
  query += "FROM products;"
  con.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
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
      var query = "SELECT id, ";
      query += "stock_quantity, ";
      query += "price, ";
      query += "product_sales ";
      query += "FROM products "
      query += `WHERE id = ${answer.requestID};`
      con.query(query, function(err, res) {
        if (err) throw err;
        if (answer.units > res[0].stock_quantity) {
          console.log("\nSorry, we don't have enough of those in stock!\n");
        } else {
          var query = `UPDATE products `;
          query += "SET stock_quantity = ?, ";
          query += "product_sales = ? ";
          query += "WHERE id = ?;";
          con.query(query, 
            [
              res[0].stock_quantity - answer.units, 
              res[0].product_sales + answer.units * res[0].price, 
              answer.requestID
            ], 
            function (err, result) {
            if (err) throw err;
            console.log(`\nThank you!\nYour cost is $${res[0].price * answer.units}\n`);
          })
        }
        con.end();
      })
    })
  });
}

con.connect(function(err) {
  if (err) throw err;
  customerFunction();
});

