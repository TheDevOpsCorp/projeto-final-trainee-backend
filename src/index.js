import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes.js";


const port = 3000;
const app = express();

//middlewares obrigatorios
app.use(express.json());
app.use(helmet());
app.use(cors());
app;
//roteador
app.use("/", router);
//middlewares tratamento de erros


//entrypoint
app.listen(port, () => {
  console.log("Servidor ativo em: http://localhost:3000");
});

export default app;
