const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jeremyrawrr7",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});


function init() {
    inquirer
        .prompt({
            name: "initChoice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Deparment",
                // "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                // "Update Employee Manager"
            ]
        }).then(function(answer) {
            switch (answer.initChoice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Employees By Deparment":
                    viewAllEmployeesByDep();
                    break;

                    // case "View All Employees By Manager":
                    //     viewAllEmployeesByManager();
                    //     break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                    // case "Update Employee Manager":
                    //     updateEmployeeManager();
                    //     break;

            }
        })
};


function viewAllEmployees() {

    const query =
        "SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role_Title, role.salary AS Salary, department.name AS Department_Name FROM((role INNER JOIN employee ON role.id = employee.role_id)INNER JOIN department ON role.dep_id = department.id);";

    console.log(query);

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.log("Viewing all Employees on the Database");
        console.table(res);

        init();


    })
}



// -- Displays Employee's first name, last name, Role Title, salary and department --> must show manager name if applicable (bonus)



function viewAllEmployeesByDep() {

    const query =
        "SELECT department.name AS Department_Name, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role_Title, role.salary AS Salary FROM((role INNER JOIN employee ON role.id = employee.role_id)INNER JOIN department ON role.dep_id = department.id) ORDER BY Department_Name;";

    console.log(query);

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.log("Viewing all Employees on the Database");
        console.table(res);

        init();


    })
}