import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock the necessary dependencies
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { userId: "user123" };
    req.files = [{ path: "/path/to/file1" }, { path: "/path/to/file2" }];
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

describe("User Applications", () => {
  describe("POST /user/applications", () => {
    it("should submit an application successfully", async () => {
      // Mock the database query to check for existing applications
      mockQuery.mockImplementationOnce((callback) => {
        // Simulate no existing applications
        callback(null, []);
      });

      // Mock the database query to insert a new application
      mockQuery.mockImplementationOnce((callback) => {
        // Simulate successful insertion
        callback(null, { insertId: 1 });
      });

      const res = await supertest(app)
        .post("/user/applications")
        .send({
          fund_id: 123,
          additional_fields: { field1: "value1", field2: "value2" },
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Application submitted successfully" });
    });

    it("should handle existing applications", async () => {
      // Mock the database query to simulate an existing application
      mockQuery.mockImplementationOnce((callback) => {
        // Simulate existing application
        callback(null, [{ applicant_id: "user123", fund_id: 123 }]);
      });

      const res = await supertest(app)
        .post("/user/applications")
        .send({
          fund_id: 123,
          additional_fields: { field1: "value1", field2: "value2" },
        });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Application already exists for this fund" });
    });

    it("should handle database errors", async () => {
      // Mock the database query to simulate a database error
      mockQuery.mockImplementation((callback) => {
        // Simulate database error
        callback(new Error("Database error"));
      });

      const res = await supertest(app)
        .post("/user/applications")
        .send({
          fund_id: 123,
          additional_fields: { field1: "value1", field2: "value2" },
        });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
