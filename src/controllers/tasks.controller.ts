import { Request, Response } from "express";
import httpStatus from "http-status";
import { tasksService } from "@/services/tasks.service";
import { NewTask } from "@/protocols/tasks.protocol";

async function create(req: Request, res: Response) {
    const taskData = req.body as NewTask;
    await tasksService.create(taskData);
    return res.sendStatus(httpStatus.CREATED);
}

export const tasksController = {
    create,
};
