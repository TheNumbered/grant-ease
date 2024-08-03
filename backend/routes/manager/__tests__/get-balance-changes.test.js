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
  describe("GET /manager/balance-change", () => {
    it("should return total amount spent and current balance for the manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ total_amount_spent: 500, current_balance: 1000 }]);
      });

      const res = await supertest(app).get("/manager/balance-change");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ total_amount_spent: 500, current_balance: 1000 }]);
    });

    it("should handle errors during fetching balance change", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/balance-change");

      expect(res.status).toBe(500);
      expect(res.text).toBe("Internal Server Error");
    });
  });
});
