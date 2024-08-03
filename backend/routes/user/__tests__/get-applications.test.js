import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock the necessary dependencies
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { userId: "123" };
    next();
  },
}));

// Mock the MySQL library
const mockQuery = vi.fn();

vi.mock("mysql2", () => ({
  default: {
    createConnection: () => ({
      connect: (cb) => cb(),
      query: (sql, params, callback) => mockQuery(params instanceof Function ? params : callback),
      ping : (cb) => cb(),
    }),
  },
}));

describe("User Routes", () => {
  describe("GET /user/applications", () => {
    it("should return user's applications successfully", async () => {
      // Mock the database query to return applications for the user
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [
          { id: 1, fund_id: 1, applicant_id: "123", status: "pending", title: "Funding Opportunity 1" },
          { id: 2, fund_id: 2, applicant_id: "123", status: "approved", title: "Funding Opportunity 2" },
        ]);
      });

      const res = await supertest(app)
        .get("/user/applications");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: 1, fund_id: 1, applicant_id: "123", status: "pending", title: "Funding Opportunity 1" },
        { id: 2, fund_id: 2, applicant_id: "123", status: "approved", title: "Funding Opportunity 2" },
      ]);
    });

    it("should handle database errors", async () => {
      // Mock the database query to simulate a database error
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app)
        .get("/user/applications");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
