abstract class Department {
    protected employees: string[] = [];

    // this replaces the need to specify properties
    constructor(private readonly id: string, private name: string) { }

    static createEmployee(name: string) {
        return {name: name};
    }

    // by sending this:Department, we are forcing typescript to check that any object calling the describe method is actually fulfills a Department object
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT");
    }

    describe(this: ITDepartment) {
        console.log(`Administrators: ${this.admins}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    private constructor(id: string, private reports:string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if(this.instance) 
            return this.instance;

        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error("Please pass in a valid report");
        }
        this.addEmployee(value);
    }

    describe() {
        console.log("Implementing the abstract method");
    }

    addEmployee(name: string) {
        if(name === 'Max')
            return;
        else
            this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports.length);
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee("Jackson");
console.log(employee1);

const it = new ITDepartment("1", ["Administrator", "John"]);
it.addEmployee("Max");
it.addEmployee("Zixin");
it.describe();
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();
accounting.addReport("Internal Audit");
accounting.describe();
accounting.printReports();

// access getter method
console.log(accounting.mostRecentReport);

// access setter method
accounting.mostRecentReport = "Report added via Setter";

// const accountingCopy = { name: 'm', describe: accounting.describe };
// accountingCopy.describe();