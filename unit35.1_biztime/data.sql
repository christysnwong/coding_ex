

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS industry_comp_r;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);


CREATE TABLE industries (
    id serial PRIMARY KEY,
    code text NOT NULL UNIQUE, 
    field text NOT NULL UNIQUE
);


CREATE TABLE industry_comp_r (
    id serial PRIMARY KEY,
    industry_code text NOT NULL,
    company_code text NOT NULL
);


INSERT INTO  industries (code, field)
  VALUES ('acct', 'Accounting'),
         ('hr', 'Human Resources'),
         ('it', 'Information Technology'),
         ('ent', 'Entertainment');

INSERT INTO industry_comp_r (industry_code, company_code)
  VALUES ('it', 'apple'),
        ('ent', 'apple'),
        ('it', 'ibm');

