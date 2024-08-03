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
  describe("POST /user/apply-fund-manager", () => {
    it("should return an error if the user is already a fund manager", async () => {
      // Mock the database query to return user role as 'fund_manager'
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ role: "fund_manager" }]);
      });

      const res = await supertest(app)
        .post("/user/apply-fund-manager")
        .send();

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "User is already a fund manager" });
    });

    it("should return an error if the user has already applied to be a fund manager", async () => {
      // Mock the database query to return user role as 'fund_manager_pending'
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ role: "fund_manager_pending" }]);
      });

      const res = await supertest(app)
        .post("/user/apply-fund-manager")
        .send();

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "User has already applied to be a fund manager" });
    });

    it("should return an error if the user is not found", async () => {
      // Mock the database query to return an empty result
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, []);
      });

      const res = await supertest(app)
        .post("/user/apply-fund-manager")
        .send();

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should handle database errors", async () => {
      // Mock the database query to simulate a database error
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app)
        .post("/user/apply-fund-manager")
        .send();

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });
});
