import express, { Request, Response, json } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import cors from "cors";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import { router } from "@/routers/index.router";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

app.get("/health", (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("I'm ok!");
});

export { app };
