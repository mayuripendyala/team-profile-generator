const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./src/generateHtml.html');

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
            validate : nameInpur => {
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
            message: "Please  enter the maneger's Id,",
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
            name : 'officeNumber',
            message: "Please enter the manager's office number",
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
        }
    ])
    .then(managerInput =>{
        const { name , id, email,officeNumber } = managerInput;
        const manager = new Manager(name, id, email, officeNumber);
        teamArray.push(manager);
        console.log(manager);

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