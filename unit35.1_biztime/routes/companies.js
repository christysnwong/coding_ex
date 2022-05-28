/** Routes for companies */

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

const slugify = require("slugify");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT code, name FROM companies");
    return res.send({ companies: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results1 = await db.query("SELECT * FROM companies WHERE code = $1", [code]);

    if (results1.rows.length === 0) {
      throw new ExpressError(`Cannot find companies with code of ${code}`, 404);
    }

    const results2 = await db.query("SELECT * FROM invoices WHERE comp_code = $1", [code]);

    const results3 = await db.query(`SELECT ind.field FROM industries AS ind 
      INNER JOIN industry_comp_r AS icr ON (ind.code = icr.industry_code) 
      WHERE icr.company_code = $1`, [code]);

    const company = results1.rows[0];
    const invoices = results2.rows;
    const industries = results3.rows;

    company.invoices = invoices.map(invoice => invoice.id);
    company.industries = industries.map(industry => industry.field);

    
    return res.send({  company: company });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const code = slugify(name, {lower: true});

    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) 
      RETURNING code, name, description`, [code, name, description]
    );
    return res.status(201).send({ company: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const results = await db.query(
      "UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description",
      [name, description, code]
    );

    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot update an company with code of ${code}`, 404);
    }
    return res.send({ company: results.rows[0] })
  } catch (e) {
    return next(e);
  }
});

router.delete("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query("DELETE FROM companies WHERE code = $1 RETURNING code", [code]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot find the company with code of ${code}`, 404);
    }
    
    return res.send({ status: "deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;