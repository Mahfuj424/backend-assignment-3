import express, { Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middleware/notFoundRoute";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send({ message: 'Co-Working server is running' });
};

app.get('/', test)

// not found route
app.use(notFound);
app.use(errorMiddleware)
export default app;
