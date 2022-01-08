// Using Inheritance

class Employee {
    constructor(id, firstName, lastName, rate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.rate = rate;
    }

}

class SalariedEmployee extends Employee {
    constructor(id, firstName, lastName, rate) {
        super(id, firstName, lastName, rate);
    }

    computePayroll() {
        return this.rate;
    }

}

class HourlyEmployee extends Employee {
    constructor(id, firstName, lastName, rate) {
        super(id, firstName, lastName, rate);
        this.totalHours = 0;
        this.otHours = 0;
        this.numWeeks = 4;
        
    }

    addHoursForWeek(hours) {
        this.totalHours += hours;
        return this.totalHours;
    }

    computePayroll() {
        if (this.totalHours > this.numWeeks * 40) {
            this.otHours = this.totalHours - (this.numWeeks * 40);
        }
        return (this.numWeeks * 40 + this.otHours * 1.5) * this.rate;
    }

}

class CommissionedEmployee extends Employee {
    constructor(id, firstName, lastName, rate, commissionRate) {
        super(id, firstName, lastName, rate);
        this.commissionRate = commissionRate;
        this.totalSales = 0;
    }

    addSale(sale) {
        this.totalSales += sale;
        return this.totalSales;
    }

    computePayroll() {
        return this.rate + (this.totalSales * this.commissionRate / 100);
    }
}


//
// Create & initialize employees
//

let employees = [];

// Maria earns a fixed salary of 3,000/month. Her employee ID is 123.
let maria = new SalariedEmployee(123, 'Maria', 'Lopez', 3000);
employees.push(maria);

// Helmut is paid 20/hour. His ID is 328.
let helmut = new HourlyEmployee(328, 'Helmut', 'Zimmerman', 20);
employees.push(helmut);

// Agnes earns 1,500/month and a 10% commission on sales.
let agnes = new CommissionedEmployee(225, 'Agnes', 'Norgaard', 1500, 10);
employees.push(agnes);



//
// Record activity for the month
//

// Maria has a fixed monthly salary so there's nothing to record

// Helmut worked overtime two weeks this month
helmut.addHoursForWeek(40);
helmut.addHoursForWeek(45);
helmut.addHoursForWeek(50);
helmut.addHoursForWeek(40);

// Agnes made two sales this month
agnes.addSale(10000);
agnes.addSale(25000);


//
// Report payroll
//

console.log('=== February Payroll ===');
for (let emp of employees) {
    console.log( `${ emp.fullName }: €${ emp.computePayroll() }` );
}


