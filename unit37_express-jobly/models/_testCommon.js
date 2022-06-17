const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
 
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  // restart id_sequence of jobs
  // method 1
  await db.query("TRUNCATE TABLE jobs RESTART IDENTITY CASCADE");

  // method 2
  // await db.query("DELETE FROM jobs");
  // await db.query("ALTER SEQUENCE jobs_id_seq RESTART WITH 1");

  // method 3
  // await db.query("DELETE FROM jobs");
  // await db.query("SELECT setval('jobs_id_seq', 1, false)");

  await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);
    
  await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('j1', 10000, '0.1', 'c1'),
          ('j2', 20000, '0.2', 'c1'),
          ('j3', 30000, '0', 'c1'),
          ('j4', null, null, 'c1')
    RETURNING id`);

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  await db.query(`
        INSERT INTO applications(username, job_id)
        VALUES ('u1', 1),
                ('u1', 2),
                ('u2', 1)
        RETURNING username, job_id`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};