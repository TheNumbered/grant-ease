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
  describe("GET /manager/approved-applicants", () => {
    it("should return approved applicants for the manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ title: "Opportunity 1", approved_applicants: 5 }]);
      });

      const res = await supertest(app).get("/manager/approved-applicants");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ title: "Opportunity 1", approved_applicants: 5 }]);
    });

    it("should handle errors during fetching approved applicants", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/approved-applicants");

      expect(res.status).toBe(500);
      expect(res.text).toBe("Internal Server Error");
    });
  });
});
