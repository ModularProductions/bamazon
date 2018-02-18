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
    ("Behringer DI20", "DI Boxes", "24.99", "22"),
    ("Behringer X32", "Mixers", "2399.99", "12"),
    ("dbx 231", "Signal Processors", "299.95", "15"),
    ("Pioneer DDJ-SX2", "DJ Gear", "999.00", "4"),
    ("Sennheiser HD280", "Headphones", "99.95", "17");