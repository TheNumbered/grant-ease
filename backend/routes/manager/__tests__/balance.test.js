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

describe("Balance Routes", () => {
  describe("GET /manager/balance", () => {
    it("should return the balance of the fund manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ balance: 500 }]);
      });

      const res = await supertest(app).get("/manager/balance");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ balance: 500 });
    });

    it("should handle errors during fetching balance", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/balance");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST /manager/add-balance", () => {
    it("should add balance to the fund manager account", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null);
      });

      const res = await supertest(app).post("/manager/add-balance").send({ amount: 100 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Balance added successfully" });
    });

    it("should return 400 if amount is not provided", async () => {
      const res = await supertest(app).post("/manager/add-balance").send({});

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Amount is required" });
    });

    it("should handle errors during adding balance", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).post("/manager/add-balance").send({ amount: 100 });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST /manager/deduct-balance", () => {
    it("should deduct balance from the fund manager account", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 500 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        });

      const res = await supertest(app).post("/manager/deduct-balance").send({ amount: 100 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Balance deducted successfully" });
    });

    it("should return 400 if amount is not provided", async () => {
      const res = await supertest(app).post("/manager/deduct-balance").send({});

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Amount is required" });
    });

    it("should return 400 if balance is insufficient", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ balance: 50 }]);
      });

      const res = await supertest(app).post("/manager/deduct-balance").send({ amount: 100 });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Insufficient balance" });
    });

    it("should handle errors during balance check", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).post("/manager/deduct-balance").send({ amount: 100 });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });

    it("should handle errors during balance deduction", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 500 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(new Error("Database error"));
        });

      const res = await supertest(app).post("/manager/deduct-balance").send({ amount: 100 });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
