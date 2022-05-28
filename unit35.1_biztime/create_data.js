// create data for tests

const db = require('./db');

async function createData() {
    await db.query("DELETE FROM invoices");
    await db.query("DELETE FROM companies");

    await db.query("SELECT setval('invoices_id_seq', 1, false)");

    await db.query(`INSERT INTO companies (code, name, description)
        VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
            ('ibm', 'IBM', 'Big blue.')`);
    await db.query(`INSERT INTO invoices (comp_Code, amt, paid, add_date, paid_date)
        VALUES ('apple', 100, false, '2022-05-01', null),
            ('apple', 200, true, '2022-05-01', '2022-05-02'),
            ('ibm', 400, false, '2022-05-01', null)
        RETURNING id`);
        
}

module.exports = { createData }