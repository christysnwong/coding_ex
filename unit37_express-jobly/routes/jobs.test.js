"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: "j4",
    salary: 40000,
    equity: "0.4",
    companyHandle: "c3"
  };

  test("ok for admin", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: {
        id: 4,
        ...newJob
      }
    });
  });

  test("unauthorized error for other users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({})
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "j99",
        salary: "99999",
        equity: "0.5",
        companyHandle: "c1"
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs: [
        {
          id: 1,
          title: "j1",
          salary: 10000,
          equity: "0.1",
          companyName: "C1",
          companyHandle: "c1"
        },
        {
          id: 2,
          title: "j2",
          salary: 20000,
          equity: "0.2",
          companyName: "C1",
          companyHandle: "c1"
        },
        {
          id: 3,
          title: "j3",
          salary: 30000,
          equity: "0",
          companyName: "C1",
          companyHandle: "c1"
        },
      ],
    });
  });

  test("find jobs with query string title only 1", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({title: "1"});

    expect(resp.body).toEqual({
      jobs: [
        {
          id: 1,
          title: "j1",
          salary: 10000,
          equity: "0.1",
          companyName: "C1",
          companyHandle: "c1"
        },
      ],
    });
  });

  test("find jobs with query string title (insensitive case) only 2", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({title: "j"});

    expect(resp.body).toEqual({
      jobs: [
        {
          id: 1,
          title: "j1",
          salary: 10000,
          equity: "0.1",
          companyName: "C1",
          companyHandle: "c1"
        },
        {
          id: 2,
          title: "j2",
          salary: 20000,
          equity: "0.2",
          companyName: "C1",
          companyHandle: "c1"
        },
        {
          id: 3,
          title: "j3",
          salary: 30000,
          equity: "0",
          companyName: "C1",
          companyHandle: "c1"
        },
      ],
    });
  });

  test("find jobs with query strings minSalary & hasEquity = true", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({minSalary: 20000, hasEquity: true});

    expect(resp.body).toEqual({
      jobs: [
        {
          id: 2,
          title: "j2",
          salary: 20000,
          equity: "0.2",
          companyName: "C1",
          companyHandle: "c1"
        },
      ],
    });
  });

  test("fails: with invalid filter", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({ title: "j4", minSalary: "abc" });

    expect(resp.statusCode).toEqual(400);
  });

  
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/1`);
    expect(resp.body).toEqual({
      job: {
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
        }
      },
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/99`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
  test("works for admin only", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        title: "j1-editted",
        salary: 10001
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      job: {
        id: 1,
        title: "j1-editted",
        salary: 10001,
        equity: "0.1",
        companyHandle: "c1"
      },
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app).patch(`/jobs/1`).send({
      title: "j1-editted"
    })
    .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/jobs/1`).send({
      title: "j1-editted"
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such company", async function () {
    const resp = await request(app)
      .patch(`/jobs/99`)
      .send({
        title: "j99-editted",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on id change attempt", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        handle: "new",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        title: 1234,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
  test("works for admin only", async function () {
    const resp = await request(app)
      .delete(`/jobs/3`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "3" });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
      .delete(`/jobs/3`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/jobs/3`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such company", async function () {
    const resp = await request(app)
      .delete(`/jobs/99`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
