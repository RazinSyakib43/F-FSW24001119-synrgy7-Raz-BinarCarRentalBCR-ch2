import request from 'supertest';
import app from "../index";

describe('GET /', () => {
    it('should render the index page with a title and name', async () => {
        const response = await request(app).get('/').query({ name: 'John' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('BCR Car Management Dashboard - Hello World!');
        expect(response.text).toContain('John');
    });

    it('should render the index page with default name', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toContain('BCR Car Management Dashboard - Hello World!');
        expect(response.text).toContain('Guest');
    });
});
