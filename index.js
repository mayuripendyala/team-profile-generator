const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./src/generateHtml.html');

const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

const teamArray = [];

const addManager = () => {
    return inquirer.prompt([
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
    ])
}

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please provide a project title. (Required)',
        validate: input =>{
            return validateInput(input,'Please provide a project title');
         }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your Github username. (Required)',
        validate: input =>{
           return validateInput(input,'Please enter your Github username.');
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'Please enter the name of the repo. (Required)',
        validate: input =>{
           return validateInput(input,'Please enter the name of the repo.');
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your application. (Required)',
        validate: input =>{
            return validateInput(input,'Provide a description of your application.');
         }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your application. (Required)',
        validate: input =>{
           return validateInput(input,'Please provide information for using your application.');
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Any additional sections you would like to include in your README?',
        choices : [
            {
                name :'Deployed Application',
                checked :false
            },
            {
                name : 'Installation',
                checked : false
            },
            {
                name: 'Screenshots',
                checked: true
            },
            {
                name: 'Built With',
                checked: false
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
            {
                name: 'Credits',
                checked: true
            },
        ]
        
    },
    {
        type: 'input',
        name: 'link',
        message: 'please provide a link to your deployed application.',
        when: ({contents})=> {
                if(contents.indexOf('Link') > -1){
                    return true;
                }
                else {
                    return false;
                }
        },
        validate: input =>{
           return validateInput(input,'please provide a link to your deployed application.');
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please list any required packages for installation of your application.',
        when: ({contents})=> {
            if(contents.indexOf('Installation') > -1){
                return true;
            }
            else {
                return false;
            }
    },
        validate: input =>{
            return validateInput(input,'Please list any required packages for installation of your application.');
        }
    },
    {
        type:'list',
        name: 'license',
        message: 'Please provide license information.',
        choices : ['MIT','GNU','Apache 2.0','ISC'],
        default :0,
        when: ({contents})=> {
            if(contents.indexOf('License') > -1){
                return true;
            }
            else {
                return false;
            }
        },
        validate: input =>{
           return validateInput(input,'Please provide license information.');
        }
    },
    {
        type:'checkbox',
        name:'built with',
        message:'Please select the technologies that your application was built with.',
        choices:['HTML','CSS','SASS','javascript','Node.js','Express.js'],
        default:0,
        when: ({contents})=> {
            if(contents.indexOf('Built with') > -1){
                return true;
            }
            else {
                return false;
            }
        },
        validate: input =>{
           return validateInput(input,'Please select the technologies that your application was built with.');
        }
    },
    {
        type:'input',
        name:'contributing',
        message:'Please enter your guidelines for contributing.',
        when: ({contents})=> {
            if(contents.indexOf('Contributing') > -1){
                return true;
            }
            else {
                return false;
            }
        },
        validate: input =>{
           return validateInput(input,'Please enter your guidelines for contributing.');
        }
    },
    {
        type:'input',
        name:'tests',
        message:'Please enter test information for your application.',
        when: ({contents})=> {
            if(contents.indexOf('Tests') > -1){
                return true;
            }
            else {
                return false;
            }
        },
        validate: input =>{
           return validateInput(input,'Please enter test information for your application.');
        }
    },
    {
        type:'input',
        name:'questions',
        message:'Please provide an email address for others to reach you with questions.',
        when: ({contents})=> {
            if(contents.indexOf('Questions') > -1){
                return true;
            }
            else {
                return false;
            }
        },
        validate: input =>{
            return validateInput(input,'Please provide an email address for others to reach you with questions.');
        }
    }
];


    //funtion to add screenshots recursively
 function  addScreenshots(readmeData) {
        if(!readmeData.screenshots) {
            readmeData.screenshots =[];
        }
        console.log(`
        
        Add New Screenshot
        
        `);
        return inquirer.prompt(screenShotQues)
        .then(screenshotData => {
            readmeData.screenshots.push(screenshotData);

            if(screenshotData.confirmAddScreenshot) {
                return addScreenshots(readmeData);
            }
            else {
                return readmeData;
            }
        })
   }

   const screenShotQues = [
       {
           type: 'input',
           name: 'screenshotLink',
           message: 'Please provide a link for your screenshot. (Required)',
           validate: input =>{
            return validateInput(input,'Please provide a link for your screenshot.');
            }
       },
       {
           type: 'input',
           name: 'screenshotAlt',
           maessage: 'Please provide alt text for your screenshot. (Required)',
           validate: input =>{
            return validateInput(input,'Please provide alt text for your screenshot.');
            }
       },
       {
           type:'input',
           name:'screenshotDesc',
           message: 'Please provide a description of your screenshot. (Optional)'
       },
       {
           type: 'confirm',
           name: 'confirmAddScreenshot',
           message: 'Would you like to add another screenshot?',
           default: false
       }
   ]

  function addCredits(readmeInfo) {

        if(!readmeInfo.credits) {
            readmeInfo.credits = [];
        }
        console.log(`
        
        Add New Credit

        `);

        return inquirer.prompt(creditQues)
        .then(creditData =>{

            readmeInfo.credits.push(creditData);

            if(creditData.confrimAddCredit) {
                return addCredit(readmeInfo);
            }
            else {
                return readmeInfo;
            }
        })
   };

   const creditQues =[
       {
           type: 'input',
           name: 'creditName',
           message: 'Please give your credit a name. (Required)',
           validate: input =>{
            return validateInput(input,'Please give your credit a name.');
            }

       },
       {
           type: 'input',
           name : 'creditLink',
           message : 'Please provide a link for the credit. (Required)',
           validate: input =>{
            return validateInput(input,'Please provide a link for the credit.');
            }
       },
       {
           type: 'confirm',
           name:'confirmAddCredit',
           message: 'Would you like to add another credit?',
           default: false
       }
   ]


function validateInput(input, message){
    if(input){
        return true;
    }
    else {
        console.log(message);
        return false;
    }

}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`,data,err =>{
        if(err) {
            throw err;
        }
        console.log('README created!');
    })
}

// TODO: Create a function to initialize app
function init() {
   return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(response =>{
    if(response.contents.indexOf('Screenshots') > -1){
        return addScreenshots(response);
    }
    else {
        return response;
    }
})
.then(response => {
     if(response.contents.indexOf('Credits')> -1) {
         return addCredits(response);
     }
     else {
         return response;
     }
})
// .then(answers => generateMarkdown(answers))
// .then(generateReadme => writeToFile('README.md', generateReadme))
.catch(err => {
    console.log(err);
});
