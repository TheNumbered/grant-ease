import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock the MySQL library
const mockQuery = vi.fn();

vi.mock("mysql2", () => ({
  default: {
    createConnection: () => ({
      connect: (cb) => cb(),
      query: (sql, params, callback) => mockQuery(params instanceof Function ? params : callback),
    }),
  },
}));

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { userId: "123" };
    next();
  }
}));

describe("Manager Routes", () => {
  describe("GET /manager/overview-data", () => {
    it("should return overview data for the manager", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ currentlyFunding: 5 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null, [{ unattendedApplications: 10 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null, [{ totalApplications: 20 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null, [{ totalFundingOpportunities: 15 }]);
        });

      const res = await supertest(app).get("/manager/overview-data");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        currentlyFunding: 5,
        unattendedApplications: 10,
        totalApplications: 20,
        totalFundingOpportunities: 15,
      });
    });

    it("should handle errors during fetching overview data", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/overview-data");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });
});
