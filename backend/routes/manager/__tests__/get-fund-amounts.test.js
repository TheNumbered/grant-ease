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
  describe("GET /manager/fund-amounts", () => {
    it("should return fund amounts for the manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ title: "Fund 1", amount: 100 }, { title: "Fund 2", amount: 200 }]);
      });

      const res = await supertest(app).get("/manager/fund-amounts");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ title: "Fund 1", amount: 100 }, { title: "Fund 2", amount: 200 }]);
    });

    it("should handle errors during fetching fund amounts", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/fund-amounts");

      expect(res.status).toBe(500);
      expect(res.text).toBe("Internal Server Error");
    });
  });
});
