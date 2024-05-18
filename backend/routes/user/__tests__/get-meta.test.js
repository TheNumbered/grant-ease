import supertest from 'supertest';
import { describe, vi } from "vitest";
import app from '../../../app.js';

//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", ()=>({
    ClerkExpressRequireAuth: () => (req, res, next) => {
        req.auth = {id: "123", userFullName: "John Doe"};
        next();
    }
}))

vi.mock("mysql2", ()=>({
    default: {
        createConnection: () => ({
            connect: (cb) => cb(),
            query: (sql, params, callback) => {
                if (params instanceof Function) { // if no params
                    callback = params;
                }
    
                if (sql.includes("SELECT * FROM user WHERE id = ?")) {
                    callback(null, []);
                } else if (sql.includes("SELECT COUNT(*) as count FROM user")) {
                    callback(null, [{count: 0}]);
                } else if (sql.includes("INSERT INTO user SET ?")) {
                    callback(null, { role: "admin", is_banned: 0, full_name: "John Doe"});
                } else {
                    callback(new Error("Invalid SQL"));
                }
            }
        })
}}));

describe("GET /user/meta", ()=>{
    it("should return the meta data of the user", async ()=>{
        const response = await supertest(app)
            .get("/user/meta")
            .set("Authorization", "Bearer token")
            .expect(200);
        expect(response.body).toEqual({role: "admin", is_banned: 0, full_name: "John Doe"});
    })})


