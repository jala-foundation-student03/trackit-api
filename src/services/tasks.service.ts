import { tasksRepository } from "@/repositories/tasks.repository";
import { NewTask } from "@/protocols/tasks.protocol";

function create(taskData: NewTask) {
    const dueDateFormated = taskData.dueDate.split("-").reverse().join("-");
    return tasksRepository.create({
        ...taskData,
        dueDate: dueDateFormated,
    });
}

async function update(taskId: number, taskData: NewTask) {
    const foundTask = await tasksRepository.findById(taskId);
    if (!foundTask) {
        throw { type: "notFound", message: "Task does not exist" };
    }

    const dueDateFormated = taskData.dueDate.split("-").reverse().join("-");
    return tasksRepository.updateById(taskId, {
        ...taskData,
        dueDate: dueDateFormated,
    });
}

async function cancel(taskId: number) {
    const foundTask = await tasksRepository.findById(taskId);
    if (!foundTask) {
        throw { type: "notFound", message: "Task does not exist" };
    }
    if (foundTask.status === "canceled") {
        throw { type: "conflict", message: "Task is already canceled" };
    }

    return tasksRepository.cancelById(taskId);
}

async function complete(taskId: number) {
    const foundTask = await tasksRepository.findById(taskId);
    if (!foundTask) {
        throw { type: "notFound", message: "Task does not exist" };
    }
    if (foundTask.status === "completed") {
        throw { type: "conflict", message: "Task is already canceled" };
    }
    if (foundTask.status === "canceled") {
        throw { type: "badRequest", message: "You can't complete a canceled task" };
    }

    return tasksRepository.completeById(taskId);
}

async function completeMany(tasksId: number[]) {
    for (const taskId of tasksId) {
        const foundTask = await tasksRepository.findById(taskId);
        if (!foundTask) {
            throw { type: "notFound", message: "One or more task does not exist" };
        }
        if (foundTask.status === "completed") {
            throw { type: "conflict", message: "Task is already canceled" };
        }
        if (foundTask.status === "canceled") {
            throw { type: "badRequest", message: "You can't complete a canceled task" };
        }
    }
    for (const taskId of tasksId) {
        await tasksRepository.completeById(taskId);
    }
}

export const tasksService = {
    create,
    update,
    cancel,
    complete,
    completeMany,
};
