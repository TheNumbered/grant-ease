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
        if (sql.includes("SELECT fa.*, fo.title FROM funding_applications")) {
          callback(null, [
            {
              id: 1,
              fund_id: 1,
              applicant_id: "123",
              status: "Pending",
              title: "Funding Opportunity",
            },
          ]);
        } else if (sql.includes("INSERT INTO funding_applications")) {
          callback(null, { affectedRows: 1 });
        } else if (sql.includes("SELECT * FROM funding_applications")) {
          callback(null, []);
        } else {
          callback(new Error("Invalid SQL query"));
        }
      },
    }),
  },
}));

describe("GET /user/applications", () => {
    it("should return an array of applications", async () => {
        const res = await supertest(app).get("/user/applications");
    
        expect(res.body).toEqual([
        {
            id: 1,
            fund_id: 1,
            applicant_id: "123",
            status: "Pending",
            title: "Funding Opportunity",
        },
        ]);
    });
    }
);

/*
describe("POST /user/applications", () => {
    it("should return a success message", async () => {
        const res = await supertest(app).post("/user/applications").send({
        fund_id: 1, 
        applicant_id: "123",
        status: "Pending",
        });
    
        expect(res.body).toEqual({ message: "Application submitted successfully" });
    });
    }
);
*/