import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock the necessary dependencies
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { id: "123" };
    req.file = { path: "path" };
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
    }),
  },
  diskStorage: () => ({}),
}));

describe("Manager Routes", () => {
  describe("POST /manager/create-funding-opportunities", () => {
    it("should create a funding opportunity successfully", async () => {
      // Mock query implementation for successful insertion
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, { affectedRows: 1 });
      });

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

    it("should handle database insertion errors", async () => {
      // Mock query implementation to simulate a database error
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

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

      expect(res.status).toEqual(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
