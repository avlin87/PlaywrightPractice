import { test, expect } from '@playwright/test';

test('GET /users returns a list of users', async ({ request }) => {
    const response = await request.get('/users');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toEqual(10);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
});
