import { Router } from "express";
import { tasksController } from "@/controllers/tasks.controller";
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { schemaNewTask, schemaUpdateTask } from "@/schemas/tasks.schemas";

const tasksRouter = Router();

tasksRouter.post("/tasks", validateSchema(schemaNewTask), tasksController.create);
tasksRouter.put("/tasks/:taskId", validateSchema(schemaUpdateTask), tasksController.update)

export { tasksRouter };
