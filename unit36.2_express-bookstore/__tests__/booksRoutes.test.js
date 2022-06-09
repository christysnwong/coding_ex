// process.env.NODE_ENV = "test"

const { Test } = require("supertest");
const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

beforeEach(async function () {
    await db.query("DELETE FROM books");

    let book1 = await Book.create({
        "isbn": "0000000001",
        "amazon_url": "http://a.co/abcdef1",
        "author": "Test1 Test",
        "language": "english",
        "pages": 100,
        "publisher": "Test Press",
        "title": "Testing is the Best",
        "year": 2022
    });
});

afterEach(async function() {
    await db.query("DELETE FROM books");
})

afterAll(async function () {
    await db.end();
});


describe("GET /books/", function() {
    test("can get all books", async function() {
        let res = await request(app)
            .get("/books/");
        
        expect(res.body.books).toHaveLength(1);
        expect(res.body.books[0]).toHaveProperty("isbn");
        expect(res.body).toEqual({
            books: [
                {
                    "isbn": "0000000001",
                    "amazon_url": "http://a.co/abcdef1",
                    "author": "Test1 Test",
                    "language": "english",
                    "pages": 100,
                    "publisher": "Test Press",
                    "title": "Testing is the Best",
                    "year": 2022
                }
            ]
        })

    });
})


describe("POST /books/", function() {
    test("can post book", async function() {
        let res = await request(app)
            .post("/books/")
            .send({
                "isbn": "0000000002",
                "amazon_url": "http://a.co/abcdef2",
                "author": "Test2 Test",
                "language": "english",
                "pages": 100,
                "publisher": "Test Press",
                "title": "Testing is the Best 2",
                "year": 2022
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            book: {
                "isbn": "0000000002",
                "amazon_url": "http://a.co/abcdef2",
                "author": "Test2 Test",
                "language": "english",
                "pages": 100,
                "publisher": "Test Press",
                "title": "Testing is the Best 2",
                "year": 2022
            }
        })
    })

    test("cannot post a book with invalid data", async function() {
        let res = await request(app)
            .post("/books/")
            .send({
                "isbn": "0000000003",
                "amazon_url": 123,
                "author": "Test2 Test",
                "language": "english",
                "pages": 100,
                "publisher": "Test Press",
                "title": "Testing is the Best 2",
                "year": 2022
            });
            expect(res.statusCode).toEqual(400);
    })

    test("cannot post a book with duplicate isbn", async function() {
        let res = await request(app)
            .post("/books/")
            .send({
                "isbn": "0000000001",
                "amazon_url": "http://a.co/abcdef1",
                "author": "Test1 Test",
                "language": "english",
                "pages": 100,
                "publisher": "Test Press",
                "title": "Testing is the Best",
                "year": 2022
            });
            expect(res.statusCode).toEqual(500);
    })

})


describe("GET /books/[isbn]", function() {
    test("can get a specific book", async function() {
        let res = await request(app)
            .get("/books/0000000001");
        
        expect(res.body).toEqual({
            book: {
                    "isbn": "0000000001",
                    "amazon_url": "http://a.co/abcdef1",
                    "author": "Test1 Test",
                    "language": "english",
                    "pages": 100,
                    "publisher": "Test Press",
                    "title": "Testing is the Best",
                    "year": 2022
            }
        })
    });

    test("cannot get a non-existed book", async function() {
        let res = await request(app)
            .get("/books/1");

        expect(res.statusCode).toEqual(404);
        
    })


})


describe("PUT /books/[isbn]", function() {
    test("can edit a book", async function() {
        let res = await request(app)
            .put("/books/0000000001")
            .send({
                "amazon_url": "http://a.co/abcdef1",
                "author": "Test1 Test",
                "language": "english",
                "pages": 999,
                "publisher": "Test Press",
                "title": "Testing is the Best 1",
                "year": 1999
            });

        expect(res.body.book.pages).toEqual(999);
        expect(res.body.book.title).toBe("Testing is the Best 1");
        expect(res.body).toEqual({
            book: {
                "isbn": "0000000001",
                "amazon_url": "http://a.co/abcdef1",
                "author": "Test1 Test",
                "language": "english",
                "pages": 999,
                "publisher": "Test Press",
                "title": "Testing is the Best 1",
                "year": 1999
            }
        })
    })

    test("cannot edit a book with invalid data", async function() {
        let res = await request(app)
            .put("/books/0000000001")
            .send({
                "amazon_url": 123,
                "author": "Test1 Test",
                "language": "english",
                "pages": 999,
                "publisher": "Test Press",
                "title": "Testing is the Best 1",
                "year": 1999
            });

            expect(res.statusCode).toEqual(400);
    })


    test("cannot edit a non-existed book", async function() {
        let res = await request(app)
            .put("/books/1")
            .send({
                "amazon_url": "http://a.co/abcdef1",
                "author": "Test1 Test",
                "language": "english",
                "pages": 999,
                "publisher": "Test Press",
                "title": "Testing is the Best 1",
                "year": 1999
            });

        expect(res.statusCode).toEqual(404);
        
    })

    
})

describe("DELETE /books/[isbn]", function() {
    test("can delete a book", async function() {
        let res = await request(app)
            .delete("/books/0000000001")
            .send({
                "isbn": "0000000001",
                "amazon_url": "http://a.co/abcdef1",
                "author": "Test1 Test",
                "language": "english",
                "pages": 100,
                "publisher": "Test Press",
                "title": "Testing is the Best",
                "year": 2022
            });

        expect(res.body).toEqual({ message: "Book deleted" })
    })

    test("cannot delete a non-existed book", async function() {
        let res = await request(app)
            .delete("/books/1");

        expect(res.statusCode).toEqual(404);
        
    })

})