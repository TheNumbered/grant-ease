import supertest from 'supertest';
import { vi } from "vitest";
import app from './app';

vi.mock("mysql2", ()=>({
    default: {
        createConnection: () => ({
            connect: (cb) => cb()
        })
}}));

vi.mock("@clerk/clerk-sdk-node", ()=>({
    ClerkExpressRequireAuth: () => (req, res, next) => {
        if (req.headers.authorization === 'Bearer good-token') {
            next();
        } else {
            res.status(401).json({ error: 'Unauthenticated' });
        }
    }
}));

describe('app', () => {
    describe('GET /', () => {
        it('should return a welcome message', async () => {
            const response = await supertest(app).get('/').set('Authorization', 'Bearer good-token');
            expect(response.body).toEqual({ message: "Welcome, you're authenticated!" });
            expect(response.statusCode).toEqual(200);
        });
 
        it('should return 401 if not authenticated', async () => {
            const response = await supertest(app).get('/');
            expect(response.body).toEqual({ error: 'Unauthenticated' });
            expect(response.statusCode).toEqual(401);
        });
    });
    it('should return nothing when a bad route is entered', async () => {
        const response = await supertest(app).get('/bad-route');
        expect(response.body).toEqual({});
        expect(response.statusCode).toEqual(404);
    });

});