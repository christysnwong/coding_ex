process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const { createData } = require('../create_data')


beforeEach(createData);

afterAll(async() => {
    await db.end()
})

describe("GET /", () => {
    test('Get all companiess', async() => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ 
            "companies": [
                {code: "apple", name: "Apple Computer"},
                {code: "ibm", name: "IBM"},
            ]
        })
    })
});

describe("GET /apple", function () {

    test("Returns apple's info", async function () {
      const res = await request(app).get("/companies/apple");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
          {
            "company": {
              code: "apple",
              name: "Apple Computer",
              description: "Maker of OSX.",
              invoices: [1, 2],
              industries: ["Information Technology", "Entertainment"]
            }
          }
      );
    });
  
    test("Returns 404 for non-existing company", async function () {
      const res = await request(app).get("/companies/abcdefg");
      expect(res.status).toEqual(404);
    })
});


describe("POST /", function () {

  test("Adding a company", async function () {
    const response = await request(app).post("/companies").send({name: "Capcom", description: "Game Producer"});

    expect(response.body).toEqual(
        {
          "company": {
            code: "capcom",
            name: "Capcom",
            description: "Game Producer",
          }
        }
    );
  });

  test("Return 500 for conflict", async function () {
    const res = await request(app).post("/companies").send({name: "Apple", description: "Apple"});

    expect(res.status).toEqual(500);
  })
});


describe("PUT /", function () {

  test("Uppdate company", async function () {
    const response = await request(app).put("/companies/apple")
    .send({name: "Apple2", description: "Editted description"});

    expect(response.body).toEqual(
        {
          "company": {
            code: "apple",
            name: "Apple2",
            description: "Editted description",
          }
        }
    );
  });

  test("Return 404 for non-existing company", async function () {
    const res = await request(app).put("/companies/abcde").send({name: "aBCDe"});

    expect(res.status).toEqual(404);
  });

  test("Return 500 for missing data", async function () {
    const res = await request(app)
        .put("/companies/ibm")
        .send({});

    expect(res.status).toEqual(500);
  })
});


describe("DELETE /", function () {

  test("Deletes a company", async function () {
    const res = await request(app).delete("/companies/apple");

    expect(res.body).toEqual({"status": "deleted"});
  });

  test("Returns 404 for non-existing company", async function () {
    const res = await request(app).delete("/companies/abcde");

    expect(res.status).toEqual(404);
  });
});



