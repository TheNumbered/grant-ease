import supertest from "supertest";
import { vi } from "vitest";
import app from "../../../app";
//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { id: "123" };
    next();
  },
}));


const mockQuery = vi.fn();

vi.mock("mysql2", () => ({
  default: {
    createConnection: () => ({
      connect: (cb) => cb(),
      query: (sql, params, callback) => mockQuery(params instanceof Function ? params : callback),
    }),
  },
}));


describe("GET /manager/applications", () => {
  it("should return an array of applications", async () => {
    mockQuery.mockImplementation((callback) => {
      callback(null, [
        {
          id: 1,
          fund_id: 1,
          applicant_id: 1,
          status: "Pending",
          full_name: "John Doe",
        },
      ]);
    });
    
    const res = await supertest(app).get("/manager/applications");

    expect(res.body).toEqual([
      {
        id: 1,
        fund_id: 1,
        applicant_id: 1,
        status: "Pending",
        full_name: "John Doe",
      },
    ]);
  });
});

