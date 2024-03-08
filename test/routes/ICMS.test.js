
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
    });

    it("GET /icms/ward returns a list of wards", async () => {
        const res = await request.get("/icms/ward");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('data');
    });

    it("PATCH /icms/ward/:id renames ward", async () => {
        let res = await request.post('/icms/ward').send({ name: "test 1234" });
        expect(res.body).toHaveProperty('data.id');
        expect(res.body).toHaveProperty('data.name', "test 1234");

        let id = res.body.data.id;
        res = await request.patch(`/icms/ward/${id}`).send({ name: "new name" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data.name", "new name");
    });

    it("DELETE /icms/ward/:id deletes the ward", async () => {
        let res = await request.post('/icms/ward').send({ name: "delete test" });
        expect(res.body).toHaveProperty('data.id');
        expect(res.body).toHaveProperty('data.name', "delete test");

        let id = res.body.data.id;
        res = await request.delete(`/icms/ward/${id}`);

        expect(res.statusCode).toBe(200);

    });
})