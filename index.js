const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./src/generateHTML.js');

const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

const teamArray = [];

const addManager = () => {
    return inquirer.prompt([
        {
            type : 'input',
            name : 'name',
            message: 'who is the manager of this team?',
            validate : nameInput => {
                if(nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter the manager name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name : 'id',
            message: "Please  enter the maneger's Id!",
            validate: nameInput => {
                if(isNaN(nameInput)) {
                    console.log("Please enter the manager's ID!");
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            type : 'input',
            name : 'email',
            message: "Please enter the manager's email",
            validate : email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid) {
                    return true;
                }
                else {
                    console.log("Please enter an email!");
                    return false;
                }

            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message : "Please eneter the manager's  office number",
            validate: input => {
                if(isNaN (input)) {
                    console.log("Please enter an offie number!");
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput =>{
        const { name , id, email,officeNumber } = managerInput;
        const manager = new Manager(name, id, email, officeNumber);
        teamArray.push(manager);
        console.log(manager);

    })
}

const addEmployee = () => {
    console.log(`
    
    Adding Employees to the team
    
    `);

    return inquirer.prompt([
        {
            type : 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices : ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message : "What's the name of the employee ?",
            validate : enteredName => {
                if(enteredName) {
                    return true;
                }
                else {
                    console.log("Please enter an employee's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID!",
            validate: enteredId => {
                if(isNaN(enteredId)){
                    console.log("Please enter the employee's Id!");
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid) {
                    return true;
                }
                else {
                    console.log("Please enter an email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (input) => input.role ==="Engineer",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                }
                else {
                    console.log("Please enter the employee's github username!");
                }
            }
        },
        {
            tyepe: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when:  (input) => input.role === "Intern",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                }
                else {
                    console.log("Please enter the Intern's school!");
                }
            }
        },
        {
            type: 'confirm',
            name :'confirmAddEmployee',
            message : "Would you loke to add more team members?",
            default: false
        }
    ])
    .then(employeeData => {

        let {name, id,email,role,github,school,confirmAddEmployee } = employeeData;

        let employee;

        if(role === "Engineer") {
            employee =new Engineer (name,id,email,github);
            console.log(employee);
        }
        else if(role === "Intern") {
            employee = new Intern (name, id, email, school); 
        }

        teamArray.push(employee);

        if(confirmAddEmployee) {
            return addEmployee(teamArray);
        }else {
            return teamArray;
        }
    })
}

const writeFile = data => {
    fs.writeFile('./dist/index.html', data , error => {

        if(error) {
            console.log(error);
            return;
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html");
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(error => {
        console.log(error);
    });