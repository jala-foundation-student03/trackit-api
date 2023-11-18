import { Router } from "express";
import { tasksController } from "@/controllers/tasks.controller";
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { schemaNewTask } from "@/schemas/tasks.schemas";

const tasksRouter = Router();

tasksRouter.post("/tasks", validateSchema(schemaNewTask), tasksController.create);

export { tasksRouter };
