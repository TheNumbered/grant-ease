import supertest from "supertest";
import { describe, expect } from "vitest";
import app from "../../../app.js";
//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { id: "123" };
    req.file = { path: "path" };
    next();
  }, 
}));


vi.mock("mysql2", () => ({
  default: {
    createConnection: () => ({
      connect: (cb) => cb(),
      query: (sql, params, callback) => {
        if (params instanceof Function) {
          // if no params
          callback = params;
        }
        if (sql.includes("INSERT INTO funding_opportunities")) {
          callback(null, { affectedRows: 1 });
        }
      },
    }),
  },
  diskStorage: () => ({}),
}));
 
describe("POST /manager/create-funding-opportunities", () => {
  it("should return a success message", async () => {
    const res = await supertest(app)
      .post("/manager/create-funding-opportunities")
      .send({
        title: "Funding Opportunity",
        description: "This is a funding opportunity",
        amount: 1000,
        deadline: "2022-12-31",
        start_date: "2022-01-01",
        end_date: "2022-12-31",
      });
    
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ message: "Funding opportunity created successfully" });
  });
});
