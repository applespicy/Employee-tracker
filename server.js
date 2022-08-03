// dependencies
const inquirer = require("inquirer");
// const ListPrompt = require("inquirer/lib/prompts/list");
const mysql = require("mysql2");




// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Debor11#',
    database: "employee_db"
}
    //   console.log(`connected to employee db.`)
);

// connect the  sql server and database
db.connect(function (err) {
    if (err) throw err;
    console.log("sql connected");

    start();

});

// functionality of App
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "we have infromation on employee, department and role, what would you like to do?",
            choices: ["view", "Add", "update", "Exit"]
        }
    ]).then(function (res) {
        switch (res.start) {
            case "view":
                view();
                break;
            case "Add":
                add();
                break;
            case "update":
                update();
                break;
            case "Exit":
                console.log("All done");
            default:
                console.log('default');

        }
    });

}


//  view function
function view() {
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "select one to view",
            choices: ["Employees", "by department", "by role"],
        }
    ]).then(function (res) {
        switch (res.view) {
            case "Employees":
                viewEmployee();
                break;
            case "by department":
                viewByDepartment();
                break;
            case "by role":
                viewByRole();
            default:
                console.log("default");

        }
    });
}

function viewEmployee() {
    db.query("select* from employee", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewByDepartment() {
    db.query("select* from department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choices",
                type: "list",
                choices: function () {
                    let choiceArr = [];
                    for (i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].name);
                    }
                    return choiceArr;
                },
                message: "select department"
            }
        ]).then(function (answer) {
            db.query("select * from department", [answer.choice], function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            }
            )
        });



    });
}

function viewByRole() {
    db.query("select title from role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choices",
                type: "list",
                choices: function () {
                    let choiceArr = [];
                    for (i = 0; i < res.lenght; i++) {
                        choiceArr.push(res[i].title);
                    }
                    return choiceArr;
                },
                message: "select role"
            }
        ]).then(function () {
            console.log(answer.choice);
            db.query("select * from role", [answer.choice], function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        });
    });
}

function add() {
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "what would like to add?",
            choices: ["department", "employee", "role"]
        }
    ]).then(function (res) {
        switch (res.add) {
            case "department":
                addDepartment();
                break;
            case " role":
                addRole();
                break;
            case "Employee":
                addEmployee();
                break
            default:
                console.log("default");


        }
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "what would you like the department to be?"
        }
    ]).then(function (res) {
        db.query("insert into department(name) values (?)", [res.department], function (err) {
            if (err) throw err;
            console.table("department update with" + res.department);
            start();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "enter role title",

        },
        {
            name: "salary",
            type: "number",
            message: "Enter salary",
            validate: function (value) {
                if (isNAN(value) === false) {
                    return true;
                }
                return false;
            }

        },
        {
            name: "department",
            type: "number",
            message: "enter department id",
            validate: function () {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;

            }
        }


    ]).then(function (res) {
        db.query(
            "insert into role set",
            {
                title: res.role,
                salary: res.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err) throw err;
                console.log("employee updated with" + res.role);
                start();
            }
        )
    })

    function addEmployee() {
        db.query("select * from role", function (err, res) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "fristname",
                    type: "input",
                    message: "Enter your fristname"
                },
                {
                    name: "lastname",
                    type: "input",
                    message: "enter your employee last name"
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        let choiceArr = [];
                        for (i = 0; i < res.lenght; i++) {
                            choiceArr.push(res[i].title)
                        }
                        return choiceArr;
                    },
                    message: "select title"
                },
                {
                    name: "manager",
                    type: "number",
                    validate: function () {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: "Enter manager ID",
                    default: "1"
                }
            ]).then(function (res) {
                db.query("insert into employee", {
                    first_name: res.fristName,
                    last_name: res.lastName,
                    role_id: res.role,
                    manager_id: res.manager
                }
                )
                console.log("employee added sucessfully");
                start();
            });
        });
    }
}

function updateEmployees() {
    db.query("select * from employee", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choices",
                type: "list",
                choices: function () {
                    let choiceArr = [];
                    for (i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].last_name);
                    }
                    return choiceArr;
                },
                message: "select employee to update"
            }
        ]).then(function () {
            const saveName = res.choice;
            db.query("select * from employee", function (err, res) {
                if (err) throw err;
                inquirer.prompt([{
                    name: "role",
                    type: "list",
                    choices: function () {
                        var choiceArr = [];
                        for (i = 0; i < res.lenght; i++) {
                            choiceArr.push(res[i].role.id)
                        }
                        return choiceArr;
                    },
                    message: "select title"
                },
                {
                    name: "manager",
                    type: "number",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: "Enter new manager Id",
                    default: "1"
                }
                ]).then(function (res) {
                    console.log(res);
                    console.log(saveName);
                    db.query("update employee set, where last_name = ?", [
                        {
                            role_id: res.role,
                            manager_id: answer.manager
                        },
                        saveName
                    ]);
                    console.log("employee updated");
                })
            })
        })
    })
}