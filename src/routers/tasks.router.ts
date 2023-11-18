import { Router } from "express";
import { tasksController } from "@/controllers/tasks.controller";
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { schemaNewTask, schemaUpdateTask, schemaCompleteMany } from "@/schemas/tasks.schemas";

const tasksRouter = Router();

tasksRouter.post("/tasks", validateSchema(schemaNewTask), tasksController.create);
tasksRouter.get("/tasks", tasksController.get);
tasksRouter.put("/tasks/complete-tasks", validateSchema(schemaCompleteMany), tasksController.completeMany);
tasksRouter.put("/tasks/:taskId", validateSchema(schemaUpdateTask), tasksController.update);
tasksRouter.put("/tasks/:taskId/cancel", tasksController.cancel);
tasksRouter.put("/tasks/:taskId/complete", tasksController.complete);
tasksRouter.put("/tasks/:taskId/delay", tasksController.delay);

export { tasksRouter };
