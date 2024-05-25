import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../../app.js";

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
    }),
  },
}));

describe("Notification Routes", () => {
  describe("GET /notifications", () => {
    it("should return notifications and unseen count", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ id: 1, title: "Notification 1" }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        })
        .mockImplementationOnce((callback) => {
          callback(null, [{ unseen_count: 5 }]);
        });

      const res = await supertest(app).get("/notifications");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        notifications: [{ id: 1, title: "Notification 1" }],
        unseenCount: 5,
      });
    });

    it("should handle errors during fetching notifications", async () => {
      mockQuery.mockImplementationOnce((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/notifications");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });

    it("should handle errors during updating notifications", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ id: 1, title: "Notification 1" }]);
        })
        .mockImplementationOnce((callback) => {
          callback(new Error("Database error"));
        });

      const res = await supertest(app).get("/notifications");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });

    it("should handle errors during fetching unseen count", async () => {
      mockQuery
        .mockImplementationOnce((callback) => {
          callback(null, [{ id: 1, title: "Notification 1" }]);
        })
        .mockImplementationOnce((callback) => {
          callback(null);
        })
        .mockImplementationOnce((callback) => {
          callback(new Error("Database error"));
        });

      const res = await supertest(app).get("/notifications");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /unseenNotificationsCount", () => {
    it("should return unseen notifications count", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(null, [{ unseen_count: 5 }]);
      });

      const res = await supertest(app).get("/unseenNotificationsCount");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ unseenCount: 5 });
    });

    it("should handle errors", async () => {
      mockQuery.mockImplementation((callback) => {
        callback(new Error("Database error"));
      });

      const res = await supertest(app).get("/unseenNotificationsCount");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
