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
    password: "",
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
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Remove Department",
                "Remove Role",
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
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;
                case "Remove Role":
                    removeRole();
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
        "SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role_Title, role.salary AS Salary, department.name AS Department_Name FROM((role INNER JOIN employee ON role.id = employee.role_id)INNER JOIN department ON role.dep_id = department.id);";

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
        "SELECT * FROM department ORDER BY id;";

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
        "SELECT * FROM role ORDER BY dep_id;";

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


function addDepartment() {
    inquirer
        .prompt([{
            name: "newDepartment",
            type: "input",
            message: "Enter name of new Department:",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter new department name:");
                }
            }
        }]).then(function(userInput) {
            connection.query(
                "INSERT INTO department SET ?", {
                    name: userInput.newDepartment,
                },
                function(err, userInput) {
                    if (err) {
                        throw err;
                    }
                    console.log(`Added new Department: ${userInput.newDepartment}`);
                    viewAllDep();
                }
            );

            init();

        });
}

function addRole() {
    inquirer
        .prompt([{
                name: "newRoleTitle",
                type: "input",
                message: "Enter name of new Role:",
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter new role name:");
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "Enter Salary of new role (Integers only eg. 100000)",
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter salary");
                    }
                }
            },
            {
                name: "roleDepID",
                type: "input",
                message: "Enter id of department new role falls under:",
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter id of department new role falls under:");
                    }
                }
            }
        ]).then(function(userInput) {
            connection.query(
                "INSERT INTO role SET ?", {
                    title: userInput.newRoleTitle,
                    salary: userInput.salary,
                    dep_id: userInput.roleDepID,

                },
                function(err, userInput) {
                    if (err) {
                        throw err;
                    }
                    console.log(`Added new Role: ${userInput.newRoleTitle}`);
                    viewAllRoles();
                }
            );

            init();

        });
}






// ------Remove Items --------


function removeEmployee() {
    inquirer.prompt([{
        name: "employeeDelete",
        type: "input",
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


function removeDepartment() {
    inquirer.prompt([{
        name: "departmentDelete",
        type: "input",
        message: "enter the ID of the department you would like to Delete :",
        validate: (input) => {
            if (input) {

                return true;
            } else {
                console.log("Department ID must be a number");
                // input type validation not fully implemented
            }
        }
    }]).then(function(input) {
        const query = "DELETE FROM department WHERE id = ";
        const userInput = input.departmentDelete;
        connection.query(
            query + userInput,
            function(err, userInput) {
                if (err) {
                    throw err;
                }
                console.log(`Deleting Employee ID: ${userInput.departmentDelete}`);
                viewAllDep();
            })
    })
};


function removeRole() {
    inquirer.prompt([{
        name: "roleDelete",
        type: "input",
        message: "enter the ID of the role you would like to Delete :",
        validate: (input) => {
            if (input) {

                return true;
            } else {
                console.log("role ID must be a number");
                // input type validation not fully implemented
            }
        }
    }]).then(function(input) {
        const query = "DELETE FROM role WHERE id = ";
        const userInput = input.roleDelete;
        connection.query(
            query + userInput,
            function(err, userInput) {
                if (err) {
                    throw err;
                }
                console.log(`Deleting Employee ID: ${userInput.roleDelete}`);
                viewAllRoles();
            })
    })
};



// ----- Update Items -----





function updateEmployeeRole() {
    inquirer
        .prompt([{
                name: "editEmployee",
                type: "input",
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
                name: "newEmployeeRole",
                type: "input",
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