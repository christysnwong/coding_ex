process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');


let chips = { name: "Chips", price: 2.99 }

beforeEach(function() {
    items.push(chips);
})

afterEach(function() {
    items.length = 0;
})


describe("GET /items", () => {
    test('Get all items', async() => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [chips] })
    })
})


describe("GET /items/:name", () => {
    test('Get item by name', async() => {
        const res = await request(app).get(`/items/${chips.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: chips });
    })
    test('Responds with 404 for invalid item', async() => {
        const res = await request(app).get(`/items/freezies`);
        expect(res.statusCode).toBe(404);
    })
})


describe('POST /items', () => {
    test('Create an item', async() => {
        const res = await request(app).post('/items').send({ name: 'Coke', price: 0.99});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { name: 'Coke', price: 0.99 }});
        
    })
    test('Responds with 400 if name is missing', async() => {
        const res = await request(app).post('/items').send({ name: '', price: 0.99 });
        expect(res.statusCode).toBe(400);
    })

})

describe('/PATCH /items/:name', () => {
    test('Updating an item name', async() => {
        const res = await request(app).patch(`/items/${chips.name}`).send({ name: 'Chips', price: 1.99});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: 'Chips', price: 1.99 }});
    })
    test('Responds with 404 for invalid name', async() => {
        const res = await request(app).patch(`/items/Milk`).send({ name: 'Milk', price: 4.99});
        expect(res.statusCode).toBe(404);
    })

})


describe('/DELETE /items/:name', () => {
    test('Deleting an item', async() => {
        const res = await request(app).delete(`/items/${chips.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' })
    })
    test('Responds with 404 for deleting invalid item', async() => {
        const res = await request(app).delete(`/items/Yogurt`);
        expect(res.statusCode).toBe(404);
    })

})

