
const server = require('../../server.js');
const supertest = require('supertest');
const request = supertest(server);
const db = require("../../model");

beforeAll(db.createAll)

describe('ICMS Endpoints', () => {
    it("POST /icms/ward creates a new ward", async () => {
        const res = (await request.post('/icms/ward')
            .send({ "name": "test" }));
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('data.name', "test");
    })

    it("GET /icms/ward returns a list of wards", async () => {
        const res = await request.get("/icms/ward");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('data');
    })
})