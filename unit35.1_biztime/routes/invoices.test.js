process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const { createData } = require("../create_data");

beforeEach(createData);

afterAll(async () => {
  await db.end();
});

describe("GET /", function () {
  test("Returns list of invoices", async function () {
    const res = await request(app).get("/invoices");
    expect(res.body).toEqual({
      invoices: [
        { id: 1, comp_code: "apple" },
        { id: 2, comp_code: "apple" },
        { id: 3, comp_code: "ibm" },
      ],
    });
  });
});

describe("GET /1", function () {
  test("Return invoice info", async function () {
    const response = await request(app).get("/invoices/1");
    expect(response.body).toEqual({
      invoice: {
        id: 1,
        amt: 100,
        add_date: "2022-05-01T07:00:00.000Z",
        paid: false,
        paid_date: null,
        company: {
          code: "apple",
          name: "Apple Computer",
          description: "Maker of OSX.",
        },
      },
    });
  });

  test("Return 404 for non-existing invoice", async function () {
    const res = await request(app).get("/invoices/0");
    expect(res.status).toEqual(404);
  });
});

describe("POST /", function () {
  test("Add an invoice", async function () {
    const res = await request(app).post("/invoices").send({ amt: 400, comp_code: "ibm" });

    expect(res.body).toEqual({
      invoice: {
        id: 4,
        comp_code: "ibm",
        amt: 400,
        add_date: expect.any(String),
        paid: false,
        paid_date: null,
      },
    });
  });
});

describe("PUT /", function () {
  test("Update an invoice", async function () {
    const response = await request(app).put("/invoices/1").send({ amt: 123, paid: false });

    expect(response.body).toEqual({
      invoice: {
        id: 1,
        comp_code: "apple",
        paid: false,
        amt: 123,
        add_date: expect.any(String),
        paid_date: null,
      },
    });
  });

  test("Return 404 for non-existing invoice", async function () {
    const res = await request(app).put("/invoices/10").send({ amt: 100 });

    expect(res.status).toEqual(404);
  });

  test("Return 500 for missing data", async function () {
    const res = await request(app).put("/invoices/1").send({});

    expect(res.status).toEqual(500);
  });
});

describe("DELETE /", function () {
  test("Delete an invoice", async function () {
    const res = await request(app).delete("/invoices/1");

    expect(res.body).toEqual({ status: "deleted" });
  });

  test("Return 404 for non-existing invoices", async function () {
    const res = await request(app).delete("/invoices/10");

    expect(res.status).toEqual(404);
  });
});
