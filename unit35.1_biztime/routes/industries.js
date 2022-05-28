/** Routes for industries */

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
      const results = await db.query("SELECT code, field FROM industries");
      return res.send({ industries: results.rows });
    } catch (e) {
      return next(e);
    }
});


router.post("/", async (req, res, next) => {
    try {
      const { code, field } = req.body;
  
      const results = await db.query(
        "INSERT INTO industries (code, field) VALUES ($1, $2) RETURNING code, field",
        [code, field]
      );
      return res.status(201).send({ industry: results.rows[0] });
    } catch (e) {
      return next(e);
    }
});


router.post("/:code", async (req, res, next) => {
    try {
      const { code } = req.params;
      const { company_code } = req.body;

      const results1 = await db.query("SELECT code FROM industries WHERE code = $1", [code]);      
      const results2 = await db.query("SELECT code FROM companies WHERE code = $1", [company_code]);

      if (results1.rows.length === 0) {
        throw new ExpressError(`Cannot find industries with code of ${code}`, 404);
      }

      if (results2.rows.length === 0) {
        throw new ExpressError(`Cannot find companies with code of ${company_code}`, 404);
      }
  
      const results3 = await db.query(
        "INSERT INTO industry_comp_r (industry_code, company_code) VALUES ($1, $2) RETURNING industry_code, company_code",
        [code, company_code]
      );
      return res.status(201).send({ relationship: results3.rows[0] });
        // return res.status(201).send({ relationship: results1.rows[0] })
    } catch (e) {
      return next(e);
    }
});

module.exports = router;