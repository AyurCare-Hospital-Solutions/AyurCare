const server = require("../../server");
const supertest = require("supertest");
const request = supertest(server);

describe("HRMS Endpoints", () => {
  it("GET /api/hrms/leave returns a list of leave requests", async () => {
    const res = await request.get("/api/hrms/leave");
    expect(res.statusCode).toBe(200);
  });
});
