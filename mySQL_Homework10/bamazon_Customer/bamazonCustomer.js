var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    showItemsForSale();
});

function showItemsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.table(res);
        selectItem(res); 
    });
}

function selectItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would like to purchase? [To Quit, Enter Q]",
            validate: function(val) {
                return !NaN(val) || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val) {
        checkIfExit(val);
        var choiceID = parseInt(val);
        var product = checkIfInList(choiceID, inventory);
    })
    if(product) {
        selectQuantity(product);
    }
    else {
        console.log("Sorry, but the item you selected is not in our inventory.")
        showItemsForSale();
    }
}

function selectQuantity(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase? [To Quit, Enter Q]",
            validate: function(val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val) {
        checkIfExit(val);
        var quantity = parseInt(val);

        if (quantity > product.stock_quantity) {
            console.log("\nSorry, that is more than what is available in stock.");
            showItemsForSale();
        }
        else {
            completePurchase(product, quantity);
        }
    })
}

function completePurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            if(err) {
                console.log("Sorry, something went wrong with your order. Please contact a customer service specialist for assistance!");
            }
            console.log("Thank you! Your order is now with our warehouse. Please await an email confirmation in your inbox!");
            showItemsForSale();
        }
    )
}

function checkIfExit(userChoice) {
    if(userChoice.toLowerCase() === "q") {
        console.log("Thanks for stopping by. We hope to see you again!");
        process.exit(0);
    }
}

function checkIfInList(choiceID, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if(inventory[i].item_id === choiceID) {
            return inventory[i];
        }
    }
    return null;
}

