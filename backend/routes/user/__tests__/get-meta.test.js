import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock the necessary dependencies
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { claims: { userId: "user123", userFullName: "John Doe" } };
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
}));

describe("User Meta ", () => {
  describe("GET /meta", () => {
    it("should return user's metadata successfully", async () => {
      // Mock the database query to return user metadata
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ id: "user123", role: "user", full_name: "John Doe", is_banned: 0 }]);
      });

      const res = await supertest(app)
        .get("/user/meta");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: "user123", role: "user", full_name: "John Doe", is_banned: 0 });
    });

    // it("should create a new user and return metadata if user does not exist", async () => {
    //   // Mock the database query to return an empty result (user not found)
    //   mockQuery
    //     .mockImplementationOnce((callback) => {
    //       callback(null, {count:0}); // Simulate user not found
    //     })
    //     .mockImplementationOnce((callback) => {
    //         callback(null, [{ id: "user123", role: "user", full_name: "John Doe", is_banned: 0 }]); // Simulate successful insertion
    //     });

    //   const res = await supertest(app)
    //     .get("/user/meta");

    //   expect(res.status).toBe(200);
    //   expect(res.body).toEqual({ id: "user123", role: "user", full_name: "John Doe", is_banned: 0 });
    // });

    it("should handle database errors", async () => {
      // Mock the database query to simulate a database error
      mockQuery.mockImplementation((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app)
        .get("/user/meta");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });
});
