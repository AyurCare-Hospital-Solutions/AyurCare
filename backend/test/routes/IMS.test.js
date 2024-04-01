const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);

describe('IMS Endpoints testing', () => {
    //medicine api test
    const medicineSample = {
        medicineName: "Test Medicine",
        inHouse: true,
        buffer: 10,
        unit: "liter",
    }

    // --> get medicine data
    it("GET /api/ims/medicine returns a list of medicine", async () => {
        const res = await request.get("/api/ims/medicine");
        expect(res.statusCode).toBe(200);
    });
    // --> add medicine data to database
    it("POST /api/ims/medicine/addMedicine is add Medicine to database", async () => {
        const res = await request.post("/api/ims/medicine/addMedicine")
            .send(medicineSample);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty("medicine");
    })
    // --> update medicine data in database
    it("PUT api/ims//medicine/updateMedicine/:id update medicine details in database", async ()=>{
        // first need to create instance in DB
        let res = await request.post("/api/ims/medicine/addMedicine")
            .send(medicineSample);
        // lets update
        res = await request.put(`/api/ims/medicine/updateMedicine/${res.body.data.medicine.id}`)
            .send(medicineSample);
        expect(res.statusCode).toBe(200);
    })
    // --> delete medicine data in database
    it("POST api/ims/medicine/deleteMedicine", async ()=>{
        // first need to create instance in DB
        let res = await request.post("/api/ims/medicine/addMedicine")
            .send(medicineSample);
        const id = res.body.data.medicine.id;
        // lets delete
        res = await request.post(`/api/ims/medicine/deleteMedicine`)
            .send({id});
        expect(res.statusCode).toBe(204);
    })
})