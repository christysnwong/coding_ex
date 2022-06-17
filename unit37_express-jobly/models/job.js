"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company handle }
   *
   * Returns { id, title, salary, equity, company handle }
   *
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
      `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [title, salary, equity, companyHandle]
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs based on filters - title, minSalary, hasEquity
   *
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   * */

  static async findAll({ title, minSalary, hasEquity } = {}) {
    let subquery = "";
    let queryValues = [];
    let queryString = [];

    if (title) {
      queryValues.push(`%${title}%`);
      queryString.push(`title ILIKE $${queryValues.length}`);
    }

    if (minSalary) {
      queryValues.push(minSalary);
      queryString.push(`salary >= $${queryValues.length}`);
    }

    if (hasEquity) {
      queryString.push(`equity > 0`);
    }

    if (queryString.length > 0) {
      subquery += " WHERE " + queryString.join(" AND ");
    }

    // select all jobs
    const jobsRes = await db.query(
        `SELECT j.id,
                j.title,
                j.salary,
                j.equity,
                j.company_handle AS "companyHandle",
                c.name AS "companyName"
            FROM jobs AS j
            LEFT JOIN companies AS c
            ON j.company_handle = c.handle` + subquery,
        queryValues,
    );
    return jobsRes.rows;
  }

  /** Given a job id, return data about the job.
   *
   * Returns { title, salary, equity, company name, company }
   *   where company is { handle, name, description, num_employees, logo_url }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    // search for a job with the id
    const jobsRes = await db.query(
      `SELECT j.id,
                    j.title,
                    j.salary,
                    j.equity,
                    j.company_handle AS "companyHandle"
            FROM jobs AS j
            LEFT JOIN companies AS c
            ON j.company_handle = c.handle
            WHERE id = $1`,
      [id]
    );

    const job = jobsRes.rows[0];

    if (!job) throw new NotFoundError(`No job with id ${id}`);

    const company = await db.query(
      `SELECT handle,
                    name,
                    description,
                    num_employees AS "numEmployees",
                    logo_url AS "logoUrl"
            FROM companies
            WHERE handle = $1`,
      [job.companyHandle],
    );

    delete job.companyHandle;
    job.company = company.rows[0];

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity, company_handle}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      companyHandle: "company_handle",
    });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                          title,
                          salary,
                          equity,
                          company_handle AS "companyHandle"`;

    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job with id ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job is not found.
   **/

  static async remove(id) {
    const result = await db.query(
        `DELETE
            FROM jobs
            WHERE id = $1
            RETURNING id`,
        [id],
    );
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No job with id ${id}`);
  }
}

module.exports = Job;
