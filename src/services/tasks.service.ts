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

export const tasksService = {
    create,
    update,
};
