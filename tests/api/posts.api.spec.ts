import { test, expect, type APIResponse } from '@playwright/test';

test.describe('Posts API', () => {
    test('GET /posts returns a list of posts', async ({ request }) => {
        const response = await request.get('/posts');

        expectJsonResponse(response, 200);

        const body = await response.json();

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(100);
        expect(body[0]).toHaveProperty('userId');
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('title');
        expect(body[0]).toHaveProperty('body');
    });

    test('GET /posts/:id returns a post by ID', async ({ request }) => {
        const postId = 1;
        const response = await request.get(`/posts/${postId}`);

        expectJsonResponse(response, 200);

        const body = await response.json();

        expect(body).not.toBeInstanceOf(Array);
        expect(body).toHaveProperty('userId');
        expect(body).toHaveProperty('id', postId);
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('body');
    });

    test('GET /posts/:id returns 404 for non-existent post', async ({ request }) => {
        const postId = 9999;
        const response = await request.get(`/posts/${postId}`);

        expectJsonResponse(response, 404);

        const body = await response.json();

        expect(body).toEqual({});
    });

    test('POST /posts creates a new post', async ({ request }) => {
        const newPost = {
            userId: 7,
            title: 'New Post Title',
            body: 'This is the body of the new post.',
        };

        const response = await request.post('/posts', {
            data: newPost,
        });

        expectJsonResponse(response, 201);

        const body = await response.json();

        expect(body).not.toBeInstanceOf(Array);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('userId', newPost.userId);
        expect(body).toHaveProperty('title', newPost.title);
        expect(body).toHaveProperty('body', newPost.body);
    });

    test('PUT /posts/:id updates an existing post', async ({ request }) => {
        const postId = 1;
        const updatedPost = {
            userId: 7,
            title: 'Updated Post Title',
            body: 'This is the updated body of the post.',
        };

        const response = await request.put(`/posts/${postId}`, {
            data: updatedPost,
        });

        expectJsonResponse(response, 200);

        const body = await response.json();

        expect(body).not.toBeInstanceOf(Array);
        expect(body).toHaveProperty('id', postId);
        expect(body).toHaveProperty('userId', updatedPost.userId);
        expect(body).toHaveProperty('title', updatedPost.title);
        expect(body).toHaveProperty('body', updatedPost.body);
    });

    test('PATCH /posts/:id partially updates a post', async ({ request }) => {
        const postId = 1;
        const partialUpdate = {
            title: 'Partially Updated Post Title',
        };

        const response = await request.patch(`/posts/${postId}`, {
            data: partialUpdate,
        });

        expectJsonResponse(response, 200);

        const body = await response.json();
        expect(body).not.toBeInstanceOf(Array);
        expect(body).toHaveProperty('id', postId);
        expect(body).toHaveProperty('title', partialUpdate.title);
    });

    test('DELETE /posts/:id deletes a post', async ({ request }) => {
        const postId = 1;
        const response = await request.delete(`/posts/${postId}`);

        expectJsonResponse(response, 200);

        const body = await response.json();

        expect(body).toEqual({});
    });
});

function expectJsonResponse(response: APIResponse, statusCode: number) {
    expect(response.status()).toBe(statusCode);
    expect(response.headers()['content-type']).toContain('application/json');
}
