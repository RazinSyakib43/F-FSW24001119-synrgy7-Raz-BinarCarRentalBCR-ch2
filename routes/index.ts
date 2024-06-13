import { Router } from 'express';

import carRouter from './carRouter';
import userRouter from './userRouter';
import orderRouter from './orderRouter';

import { authorize } from "../middleware/authorization";

import knex from 'knex'
import { Model } from 'objection';
const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: "car_rental_db",
        user: "postgres",
        password: "yessgood123",
        port: 5432
    }
})

Model.knex(knexInstance);

const router = Router();
const baseURL = '/api/v1/dashboard';

router.use(`${baseURL}/cars`, carRouter);
router.use(`${baseURL}/users`, userRouter);
router.use(`${baseURL}/orders`, authorize, orderRouter);

export default router;