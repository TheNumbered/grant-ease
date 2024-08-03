import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

// Mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    req.auth = { id: "123" };
    next();
  } 
}));

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
  describe("GET /users", () => {
    it("should return an array of users", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(null, [{ id: 1, name: "John Doe" }]);
      });

      const res = await supertest(app).get("/admin/users");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: "John Doe" }]);
    });

    it('should handle errors', async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error('Database error'));
      });

      const res = await supertest(app).get('/admin/users');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe("GET /pending-managers", () => {
    it("should return pending managers", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(null, [{ id: 2, name: "Jane Doe", role: "fund_manager_pending" }]);
      });

      const res = await supertest(app).get("/admin/pending-managers");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 2, name: "Jane Doe", role: "fund_manager_pending" }]);
    });

    it('should handle errors', async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error('Database error'));
      });

      const res = await supertest(app).get('/admin/pending-managers');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe("PUT /toggle-ban/:id", () => {
    it("should update user ban status", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(null, { affectedRows: 1 });
      });

      const res = await supertest(app)
        .put("/admin/toggle-ban/1")
        .send({ is_banned: true });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "User banned status updated successfully" });
    });

    it('should handle errors', async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error('Database error'));
      });

      const res = await supertest(app)
        .put('/admin/toggle-ban/1')
        .send({ is_banned: true });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe("POST /update-roles", () => {
    it("should update user roles", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(null, { affectedRows: 1 });
      });

      const res = await supertest(app)
        .post("/admin/update-roles")
        .send({ ids: [1, 2], newRole: "admin" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Roles updated successfully" });
    }); 

    it('should handle errors', async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error('Database error'));
      });

      const res = await supertest(app) 
        .post('/admin/update-roles')
        .send({ ids: [1, 2], newRole: 'admin' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });

    it('should handle missing parameters', async () => {
      const res = await supertest(app)
        .post('/admin/update-roles')
        .send({});
      expect(res.status).toBe(400); 
      expect(res.body).toEqual({ error: 'Missing required parameters' });
    });
  });
});
