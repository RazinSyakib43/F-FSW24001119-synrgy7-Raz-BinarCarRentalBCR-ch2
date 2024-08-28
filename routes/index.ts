import { Router } from 'express';

import carClientRouter from './client/carClientRouter';

import carRouter from './dashboard/carRouter';
import userRouter from './dashboard/userRouter';
import authRouter from './dashboard/authRouter';

import knex from 'knex'
import { Model } from 'objection';
const knexInstance = knex({
    client: "postgresql",
    connection: "postgresql://postgres.hgxmajbxzfwodrzbdpmc:oQxil5ODW3SK@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
})

Model.knex(knexInstance);

const router = Router();
const baseURLDashboard = '/api/v1/dashboard';
const baseURLClient = '/api/v1/client'

// Client Route
router.use(`${baseURLClient}/cars`, carClientRouter);

// Dashboard Route
router.use(`${baseURLDashboard}/cars`, carRouter);
router.use(`${baseURLDashboard}/users`, userRouter);
router.use(`${baseURLDashboard}/auth`, authRouter);

export default router;