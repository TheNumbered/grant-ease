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
      ping : (cb) => cb(),
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
  describe("GET /manager/funding-opportunities", () => {
    it("should return funding opportunities for the manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ id: 1, title: "Opportunity 1", numPending: 5 }]);
      });

      const res = await supertest(app).get("/manager/funding-opportunities");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, title: "Opportunity 1", numPending: 5 }]);
    });

    it("should handle errors during fetching funding opportunities", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/funding-opportunities");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });

  describe("DELETE /manager/funding-opportunities/:id", () => {
    it("should delete funding opportunity successfully", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, { affectedRows: 1 });
      });

      const res = await supertest(app).delete("/manager/funding-opportunities/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ affectedRows: 1 });
    });

    it("should handle errors during deleting funding opportunity", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).delete("/manager/funding-opportunities/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });
});
