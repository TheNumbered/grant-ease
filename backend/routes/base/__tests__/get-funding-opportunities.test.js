import supertest from "supertest";
import { describe } from "vitest";
import app from "../../../app.js";

//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { id: "123" };
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
        if (sql.includes("SELECT fo.*")) {
          callback(null, [
            {
              id: 1,
              title: "Funding Opportunity",
              deadline: "2022-01-01",
              application_status: "Pending",
            },
          ]);
        } else {
          callback(new Error("Invalid SQL query"));
        }
      },
      ping: (cb) => cb(),
    }),
  },
}));

describe("GET /funding-opportunities", () => {
  it("should return an array of funding opportunities", async () => {
    const res = await supertest(app).get("/funding-opportunities");

    expect(res.body).toEqual([
      {
        id: 1,
        title: "Funding Opportunity",
        deadline: "2022-01-01",
        application_status: "Pending",
      },
    ]);
  });
});