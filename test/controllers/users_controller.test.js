import supertest from 'supertest';
import app from '../../src/index.js';
import { truncateUsersTable } from '../../src/database/trucate.js';

beforeEach(async () => {
    await truncateUsersTable();
});

afterEach(async () => {
    await truncateUsersTable();
});
