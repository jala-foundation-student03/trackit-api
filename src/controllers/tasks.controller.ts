import { Request, Response } from "express";
import httpStatus from "http-status";
import { tasksService } from "@/services/tasks.service";
import { NewTask } from "@/protocols/tasks.protocol";

async function create(req: Request, res: Response) {
    const taskData = req.body as NewTask;
    await tasksService.create(taskData);
    return res.sendStatus(httpStatus.CREATED);
}

async function update(req: Request, res: Response) {
    const taskData = req.body as NewTask;
    
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        throw { type: "badRequest", message: "Invalid task Id"}
    }

    await tasksService.update(taskId, taskData);
    return res.sendStatus(httpStatus.NO_CONTENT);
}

export const tasksController = {
    create,
    update,
};
