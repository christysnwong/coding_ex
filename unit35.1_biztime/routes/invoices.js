/** Routes for invoices */

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT id, comp_code FROM invoices");
    return res.send({ invoices: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // const results1 = await db.query("SELECT id, amt, paid, add_date, paid_date FROM invoices WHERE id = $1", [id]);
    // const results2 = await db.query("SELECT comp_code FROM invoices WHERE id = $1", [id]);
    // const code = results2.rows[0].comp_code;

    // const results3 = await db.query("SELECT * FROM companies WHERE code = $1", [code]);

    // const invoice = results1.rows[0];
    // invoice.company = results3.rows[0];

    const results = await db.query(
      `SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, 
        c.name, c.code, c.description FROM invoices AS i INNER JOIN companies AS c ON (i.comp_code = c.code) WHERE id = $1`,
      [id]
    );

    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find invoice with id of ${id}`, 404);
    }

    const data = results.rows[0];
    const invoice = {
      id: data.id,
      company: {
        code: data.code,
        name: data.name,
        description: data.description,
      },
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
    };

    return res.send({ invoice: invoice });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [comp_code, amt]
    );
    return res.status(201).send({ invoice: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt, paid } = req.body;
    let paidDate = null;

    const results1 = await db.query("SELECT * FROM invoices WHERE id = $1", [
      id,
    ]);

    if (results1.rows.length === 0) {
      throw new ExpressError(`Cannot update invoice with id of ${id}`, 404);
    }

    let currPaidDate = results1.rows[0].paid_date;

    if (!currPaidDate && paid) {
      paidDate = new Date();
    } else if (!paid) {
      paidDate = null;
    } else {
      paidDate = currPaidDate;
    }

    const results2 = await db.query(
      `UPDATE invoices SET amt = $1, paid = $2, paid_date = $3 
        WHERE id = $4 RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, paid, paidDate, id]
    );

    return res.send({ invoice: results2.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await db.query(
      "DELETE FROM invoices WHERE id = $1 RETURNING id",
      [id]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot find the invoice with id of ${id}`, 404);
    }
    return res.send({ status: "deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
