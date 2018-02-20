DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
	id INT(10) AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    product_name VARCHAR(50),
    department_name VARCHAR(50),
	price DECIMAL(7,2),
    stock_quantity INT(5),
    product_sales DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE departments (
	department_id INT(10) AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (department_id),
    department_name VARCHAR(50),
    overhead_costs DECIMAL(10,2)
);
    
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
	("10' XLR", "Cables", "12.99", "57"),
    ("25' XLR", "Cables", "20.99", "43"),
    ("XLRM to XLRM adapter", "Adapters", "3.99", "17"),
    ("TRSM to XLRF adapter", "Adapters", "3.99", "28"),
    ("Shure SM58", "Microphones", "99.95", "20"),
    ("Sennheiser C5", "Microphones", "149.99", "16"),
    ("Behringer DI20", "DI Boxes", "24.99", "3"),
    ("Behringer X32", "Mixers", "2399.99", "1"),
    ("dbx 231", "Signal Processors", "299.95", "15"),
    ("Pioneer DDJ-SX2", "DJ Gear", "999.00", "0"),
    ("Sennheiser HD280", "Headphones", "99.95", "17");
    
INSERT INTO departments (department_name, overhead_costs) VALUES
	("Cables", "3000.00"),
    ("Speakers", "2500.00"),
    ("Microphones", "4000.00"),
    ("Mixers", "1500.00"),
    ("DJ Gear", "2000.00"),
    ("DI Boxes", "400.00"),
    ("Headphones", "600.00"),
    ("Adapters", "500.00"),
	("Signal Processors", "1000.00");

UPDATE products SET product_sales = "129.99" WHERE id = 1;
UPDATE products SET product_sales = "41.98" WHERE id = 2;
UPDATE products SET product_sales = "79.69" WHERE id = 3;
UPDATE products SET product_sales = "99.95" WHERE id = 5;
UPDATE products SET product_sales = "149.95" WHERE id = 6;
UPDATE products SET product_sales = "999.00" WHERE id = 10;
UPDATE products SET product_sales = "199.90" WHERE id = 11;

SELECT * FROM products;
#SELECT * FROM departments;

