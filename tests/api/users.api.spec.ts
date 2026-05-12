import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
    test('GET /users returns a list of users', async ({ request }) => {
        const response = await request.get('/users');

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(10);
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0]).toHaveProperty('email');
    });

    test('GET /users/:id returns a user by ID', async ({ request }) => {
        const userId = 1;
        const response = await request.get(`/users/${userId}`);

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        expect(body).not.toBeInstanceOf(Array);
        expect(body).toHaveProperty('id', userId);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('email');
    });

    test('GET /users/:id returns 404 for non-existent user', async ({ request }) => {
        const userId = 9999;
        const response = await request.get(`/users/${userId}`);

        expect(response.status()).toBe(404);
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        expect(body).toEqual({});
    });
});