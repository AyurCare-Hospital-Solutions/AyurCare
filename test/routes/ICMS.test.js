const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);

describe('ICMS Endpoints', () => {
    it("POST /api/icms/ward creates a new ward", async () => {
        const res = (await request.post('/api/icms/ward')
            .send({ "name": "test" }));
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data.name', "test");
    });

    it("GET /api/icms/ward returns a list of wards", async () => {
        const res = await request.get("/api/icms/ward");
        expect(res.statusCode).toBe(200);
    });

    it("PATCH /api/icms/ward/:id renames ward", async () => {
        let res = await request.post('/api/icms/ward').send({ name: "test 1234" });
        expect(res.body).toHaveProperty('data.id');
        expect(res.body).toHaveProperty('data.name', "test 1234");

        let id = res.body.data.id;
        res = await request.patch(`/api/icms/ward/${id}`).send({ name: "new name" });

        expect(res.statusCode).toBe(204);
    });

    it("DELETE /api/icms/ward/:id deletes the ward", async () => {
        let res = await request.post('/api/icms/ward').send({ name: "delete test" });
        expect(res.body).toHaveProperty('data.id');
        expect(res.body).toHaveProperty('data.name', "delete test");

        let id = res.body.data.id;
        res = await request.delete(`/api/icms/ward/${id}`);
        expect(res.statusCode).toBe(204);

        res = await request.delete(`/api/icms/ward/${id}`);
        expect(res.statusCode).toBe(404);

    });
})