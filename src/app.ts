import express, { Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middleware/notFoundRoute";
import router from "./app/routes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

// const test = async (req: Request, res: Response) => {
//   res.send({ message: 'Co-Working server is running' });
//   // Promise.reject()
// };

app.get("/", (req:Request, res:Response) => {
  res.send({ message: "Co-Working server is running" });
});

// app.use(globalErrorHandler);

// not found route
app.use(notFound);
export default app;
