import express, { Request, Response } from "express";
import { config } from "dotenv";
import { syncDatabase } from "./utils";
import { port } from "./constants";
import { userRouter } from "./routes";
import { sendRes } from "./utils/send-res";

config();

const app = express();

app.use(express.json());

app.use(sendRes);
app.use(userRouter);

app.use((error: any, req: Request, res: Response) => {
  const message = error.message;
  const status = error.statusCode || 500;
  const data = error.data;

  res.status(status).sendRes({ message, data });
});

app.listen(port, async () => {
  await syncDatabase();
  console.log(`Server is up and running on ${port} ...`);
});
