"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
      title: "j5",
      salary: 50000,
      equity: "0.05",
      companyHandle: "c2",
    };
  
    test("works", async function () {
      let job = await Job.create(newJob);
      expect(job).toEqual(
        {
            id: 5,
            title: "j5",
            salary: 50000,
            equity: "0.05",
            companyHandle: "c2",
        },
      );

      const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
             FROM jobs
             WHERE title = 'j5'`);
      expect(result.rows[0]).toEqual(
        {
            id: 5,
            title: "j5",
            salary: 50000,
            equity: "0.05",
            company_handle: "c2",
        },
      );
    });

});


/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "j1",
        salary: 10000,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: 2,
        title: "j2",
        salary: 20000,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: 3,
        title: "j3",
        salary: 30000,
        equity: "0",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: 4,
        title: "j4",
        salary: null,
        equity: null,
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: with filter - title", async function () {
    let jobs = await Job.findAll({ title: 1 });
    expect(jobs).toEqual([
      {
        id: 1,
        title: "j1",
        salary: 10000,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: with filter - minSalary", async function () {
    let jobs = await Job.findAll({ minSalary: 30000 });
    expect(jobs).toEqual([
      {
        id: 3,
        title: "j3",
        salary: 30000,
        equity: "0",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: with filter - equity", async function () {
    let jobs = await Job.findAll({ hasEquity: true });
    expect(jobs).toEqual([
      {
        id: 1,
        title: "j1",
        salary: 10000,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: 2,
        title: "j2",
        salary: 20000,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: with filter - minSalary & equity", async function () {
    let jobs = await Job.findAll({ minSalary: 20000, hasEquity:true });
    expect(jobs).toEqual([
      {
        id: 2,
        title: "j2",
        salary: 20000,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get(1);
    expect(job).toEqual({
      id: 1,
      title: "j1",
      salary: 10000,
      equity: "0.1",
      company: {
        handle: "c1",
        name: "C1",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
      },
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  let updateData = {
    title: "j1-editted",
    salary: 10001,
    equity: "0.11",
  };
  test("works", async function () {
    let job = await Job.update(1, updateData);
    expect(job).toEqual({
      id: 1,
      companyHandle: "c1",
      ...updateData,
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, {
        title: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const res = await db.query(
        "SELECT id FROM jobs WHERE id=$1", [1]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
