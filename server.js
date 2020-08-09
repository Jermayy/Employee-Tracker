const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { async } = require("rxjs");
const { connect } = require("http2");

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
                "View All Deparments",
                "View All Roles",
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

                case "View All Deparments":
                    viewAllDep();
                    break;

                case "View All Roles":
                    viewAllRoles();
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



function viewAllDep() {

    const query =
        "SELECT * FROM department;";

    console.log(query);

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.log("Viewing all departments on the Database");
        console.table(res);

        init();


    })
}

function viewAllRoles() {

    const query =
        "SELECT * FROM role;";

    console.log(query);

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.log("Viewing all roles on the Database");
        console.table(res);

        init();


    })
}






function addEmployee() {
    inquirer
        .prompt([{
                name: "newEmployeeFirst",
                type: "input",
                message: "Enter new employee first name:",
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter new employee's first name:");
                    }
                }
            },
            {
                name: "newEmployeeLast",
                type: "input",
                message: "Enter new employee last name:",
                validate: (input) => {
                    if (input) {
                        return true;


                    } else {
                        console.log("Please enter new employee's last name:");

                    }
                }
            },
            {
                name: "newEmployeeRole",
                type: "input",
                message: "Enter Employee Role ID",
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter new employee's role id:");

                    }
                }


            }
        ]).then(function(userInput) {
            connection.query(
                "INSERT INTO employee SET ?", {
                    first_name: userInput.newEmployeeFirst,
                    last_name: userInput.newEmployeeLast,
                    role_id: userInput.newEmployeeRole,
                    manager_id: null
                },
                function(err, userInput) {
                    if (err) {
                        throw err;
                    }
                    console.table(userInput);
                }
            );

            init();

        });
}


function removeEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "employeeDelete",
        message: "enter the ID of the employee you would like to Delete :",
        validate: (input) => {
            if (input) {

                return true;
            } else {
                console.log("Employee ID must be a number");
                // input type validation not fully implemented
            }
        }
    }]).then(function(input) {
        const query = "DELETE FROM employee WHERE id = ";
        const userInput = input.employeeDelete;
        connection.query(
            query + userInput,
            function(err, userInput) {
                if (err) {
                    throw err;
                }
                console.log(`Deleting Employee ID: ${userInput.employeeDelete}`);
                viewAllEmployees();
            })
    })
};



function updateEmployeeRole() {
    inquirer
        .prompt([{
                type: "input",
                name: "editEmployee",
                message: "enter employee ID to change their role:",
                validate: (input) => {
                    if (input) {

                        return true;
                    } else {
                        console.log("Employee ID must be a number");
                        // input type validation not fully implemented
                    }
                }
            },
            {
                type: "input",
                name: "newEmployeeRole",
                message: "enter new role ID for employee:",
                validate: (input) => {
                    if (input) {

                        return true;
                    } else {
                        console.log("Employee ID must be a number");
                        // input type validation not fully implemented
                    }
                }
            }
        ]).then(function(input) {


            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [input.newEmployeeRole, input.editEmployee], (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(`Updating Employee ID: ${input.editEmployee} role to Role ID ${input.newEmployeeRole}`);
                viewAllEmployees();
            })
        })

}








// ------------------------------ Retrieve Existing Information from Database --------------------------------
// async function getRoles() {
//     let query = "SELECT title FROM role";
//     const rows = await connection.query(query, function(err, res) {
//         if (err) throw err;

//         let roles = [];
//         for (const row of res) {
//             roles.push(row.title);
//         }

//         return roles;

//     });


// }