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
  describe("GET /manager/applications", () => {
    it("should return pending applications for the manager", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ id: 1, full_name: "John Doe", status: "pending" }]);
      });

      const res = await supertest(app).get("/manager/applications");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, full_name: "John Doe", status: "pending" }]);
    });

    it("should handle errors during fetching applications", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/applications");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });

  describe("GET /manager/applications/:id", () => {
    it("should return pending applications for the manager by fund id", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null, [{ id: 1, full_name: "John Doe", status: "pending" }]);
      });

      const res = await supertest(app).get("/manager/applications/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, full_name: "John Doe", status: "pending" }]);
    });

    it("should handle errors during fetching applications by fund id", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/manager/applications/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });

  describe("PUT /manager/approve-application/:id", () => {
    it("should approve application if balance is sufficient", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 500, amount: 100 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        });

      const res = await supertest(app).put("/manager/approve-application/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Application approved" });
    });

    it("should return insufficient balance if balance is not sufficient", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 50, amount: 100 }]);
        });

      const res = await supertest(app).put("/manager/approve-application/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Insufficient balance" });
    });

    it("should handle errors during balance and amount check", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).put("/manager/approve-application/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });

    it("should handle errors during balance update", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 500, amount: 100 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(new Error("Database error"));
        });

      const res = await supertest(app).put("/manager/approve-application/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });

    it("should handle errors during application status update", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ balance: 500, amount: 100 }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        })
        .mockImplementationOnce((callback) => {
          callback(new Error("Database error"));
        });

      const res = await supertest(app).put("/manager/approve-application/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });

  describe("PUT /manager/reject-application/:id", () => {
    it("should reject application successfully", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(null);
      });

      const res = await supertest(app).put("/manager/reject-application/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Application rejected" });
    });

    it("should handle errors during rejecting application", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).put("/manager/reject-application/1");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Database error" });
    });
  });
});
