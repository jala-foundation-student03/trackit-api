import { Request, Response } from "express";
import httpStatus from "http-status";
import { tasksService } from "@/services/tasks.service";
import { NewTask, Filters } from "@/protocols/tasks.protocol";

async function get(req: Request, res: Response) {
    const { sortByDueDate, category, status } = req.query as Filters;
    const tasks = await tasksService.findAll(sortByDueDate, category, status);
    return res.status(httpStatus.OK).send(tasks);
}

async function create(req: Request, res: Response) {
    const taskData = req.body as NewTask;
    await tasksService.create(taskData);
    return res.status(httpStatus.CREATED).send("Task created");
}

async function update(req: Request, res: Response) {
    const taskData = req.body as NewTask;

    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        throw { type: "badRequest", message: "Invalid task Id" };
    }

    await tasksService.update(taskId, taskData);
    return res.status(httpStatus.NO_CONTENT).send("Task updated");
}

async function delay(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        throw { type: "badRequest", message: "Invalid task Id" };
    }

    await tasksService.delay(taskId);
    return res.status(httpStatus.NO_CONTENT).send("Task canceled");
}

async function cancel(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        throw { type: "badRequest", message: "Invalid task Id" };
    }

    await tasksService.cancel(taskId);
    return res.status(httpStatus.NO_CONTENT).send("Task canceled");
}

async function complete(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        throw { type: "badRequest", message: "Invalid task Id" };
    }

    await tasksService.complete(taskId);
    return res.status(httpStatus.NO_CONTENT).send("Task set as completed");
}

async function completeMany(req: Request, res: Response) {
    const body = req.body;
    const tasksId = body.tasksId as number[];
    await tasksService.completeMany(tasksId);
    return res.status(httpStatus.NO_CONTENT).send("Tasks set as completed");
}

export const tasksController = {
    create,
    update,
    cancel,
    complete,
    completeMany,
    get,
    delay,
};
