const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);

describe('IMS Endpoints testing', () => {
    //medicine api test
    it("GET /api/ims/medicine returns a list of medicine", async () => {
        const res = await request.get("/api/ims/medicine");
        expect(res.statusCode).toBe(200);
    });

})