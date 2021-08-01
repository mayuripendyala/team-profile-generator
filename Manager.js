const employee = require('./Employee');


class Manage extends Employee{

    constructor(name , id, email,officeNumber) {
        super(name, id, email);
        this.officeNumber =officeNumber;
    }

    getRole() {
        return 'Manager';
    }

}

module.exports = Manager;