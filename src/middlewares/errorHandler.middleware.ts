import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ErrorWithMessage } from "@/protocols/error.protocol";

export function errorHandler(error: ErrorWithMessage, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    switch (error.type) {
        case "badRequest":
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        case "notFound":
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        case "unprocessable":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something went wrong. Try again later.");
    }
}
