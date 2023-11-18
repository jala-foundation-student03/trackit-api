import { tasksRepository } from "@/repositories/tasks.repository";
import { NewTask } from "@/protocols/tasks.protocol";

function create(taskData: NewTask) {
    const dueDateFormated = taskData.dueDate.split("-").reverse().join("-");
    return tasksRepository.create({
        ...taskData,
        dueDate: dueDateFormated,
    });
}

export const tasksService = {
    create,
};
