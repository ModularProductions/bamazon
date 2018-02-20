# bamazon

## Purpose
Bamazon is a MySQL inventory and sales management database utility that uses a 'products' table and a 'departments' table to simulate a store's inventory handling. Three node applications are available to affect the inventory as a customer, manager, or supervisor might.

## Usage
The database may be initialized with `bamazon.sql`, populating it with a few items, departments, and some initial stock and sales figures. Node.js is then used for separate applications.

### bamazonCustomer
`node bamazonCustomer`

The user is presented with a list of products with their price and availability. The user is then asked for the ID number of the desired product, and how many the user would like to purchase. Upon successful completion, the user is returned the total cost of their order, and the item's inventory quantity is updated. If there is not enough inventory to cover the purchase, it is rejected.
- Validates for available ID number and purchase quantity.

### bamazonManager
`node bamazonManager`

The user is presented with list of options.
- "View Products for Sale" will display a list of all products, including department, stock, and sales information.
- "View Low Inventory" will display a list of all products whose inventory count is less than 5.
- "Add to Inventory" will allow the user to choose a product by ID number and increase its stock quantity. Validates for ID number and stock quantity.
- "Add New Product" will allow the user to add a new product by specifying item name, department, unit price, and initial stock quantity. Validates for name (rejects blank or duplicate), price, and stock quantity.

### bamazonSupervisor
`node bamazonSupervisor`

The user is presented with a list of options.
- "View Product Sales By Department" will display all departments, along with their overhead costs, total sales amount of all products in that department, and the total profit of the department (a deduction of the department's overhead from its product sales). Total profit is calculated inside query.
- "Create New Department" will allow the user to add a new department to the database by specifying department name and overhead cost. Validates for name (rejects blank or duplicate) and cost.
