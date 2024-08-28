import request from 'supertest';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import { registerAdmin, registerMember, loginSuperadmin, loginAdmin, loginMember } from '../controllers/authController';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';

jest.mock('../services/authService');
jest.mock('../services/userService');

const authService = new AuthService();
const userService = new UserService();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();
app.post('/api/v1/dashboard/auth/register/admin', upload.single('avatar'), registerAdmin);
app.post('/api/v1/dashboard/auth/register/member', upload.single('avatar'), registerMember);
app.post('/api/v1/dashboard/auth/login/superadmin', loginSuperadmin);
app.post('/api/v1/dashboard/auth/login/admin', loginAdmin);
app.post('/api/v1/dashboard/auth/login/member', loginMember);

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    role: string | null;
    createdAt: Date | null;
    createdBy: string | null;
    updatedAt: Date | null;
    updatedBy: string | null;
    status: string | null;
    deletedAt: Date | null;
    deletedBy: string | null;
}

interface ApiResponse {
    code: number;
    status: string;
    message: string;
    data: {
        token: string;
    };
}

const mockUserService = userService as jest.Mocked<UserService>;
const mockAuthService = authService as jest.Mocked<AuthService>;

describe('AuthController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('POST /register/member', () => {
        it('should create a new member user', async () => {
            mockUserService.getActiveUserByEmail.mockResolvedValue(null);
            mockAuthService.registerMember.mockResolvedValue({ name: 'Himmel', email: 'himmel@gmail.com', password: "iamhimmel" } as User);

            const response = await request(app)
                .post('/api/v1/dashboard/auth/register/member')
                .field('name', 'Himmel')
                .field('email', 'himmel@gmail.com')
                .field('password', 'himmel')
                .attach('avatar', Buffer.from('test'), 'test.jpg');

            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
        });

        it('should return 400 if email is already taken', async () => {
            mockUserService.getActiveUserByEmail.mockResolvedValue({ name: 'Frieren', email: 'frieren@gmail.com', password: "iamfrieren" } as User);

            const response = await request(app)
                .post('/api/v1/dashboard/auth/register/member')
                .field('name', 'Frieren')
                .field('email', 'frieren@gmail.com')
                .field('password', 'iamfrieren')
                .attach('avatar', Buffer.from('test'), 'test.jpg');

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('This email is already taken');
        });
    });

    describe('POST /login/superadmin', () => {
        it('should login a superadmin user', async () => {
            mockAuthService.loginSuperadmin.mockResolvedValue({ data: { token: 'superadmin-token' } } as ApiResponse);

            const response = await request(app)
                .post('/api/v1/dashboard/auth/login/superadmin')
                .send({ email: 'ayano@gmail.com', password: 'iamayano' });

            expect(response.status).toBe(200);
            expect(response.body.data.token).toBe('superadmin-token');
        });

        it('should return 500 on login failure', async () => {
            mockAuthService.loginSuperadmin.mockRejectedValue(new Error('Login failed'));

            const response = await request(app)
                .post('/api/v1/dashboard/auth/login/superadmin')
                .send({ email: 'superadmin@example.com', password: 'password' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Login failed');
        });
    });
});
