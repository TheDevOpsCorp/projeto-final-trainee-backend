import express from 'express';
import auth_middleware from '../src/middlewares/auth_middleware.js';

let test_app = express();
test_app.use(express.json());

test_app.post(
    '/test/middlware/autenticacao',
    auth_middleware.authenticateJWT,
    (req, res) => {
        // @ts-ignore
        res.json(req.user);
    }
);

const port = 3000;

test_app.listen(port, () => {
    console.log(`test app escutando na porta: ${port}`);
});

export default test_app;
