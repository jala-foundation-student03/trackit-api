import { db } from "@/config/database.config";
import { NewTask } from "@/protocols/tasks.protocol";

function create(taskData: NewTask) {
    const { description, dueDate, category } = taskData;

    if (category) {
        return db.query(`INSERT INTO tasks ("description", "dueDate", "category") VALUES ($1, TO_DATE($2), $3)`, [
            description,
            dueDate,
            category,
        ]);
    }
    return db.query(`INSERT INTO tasks ("description", "dueDate") VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'))`, [description, dueDate]);
}

function findAll() {
    return db.query(`
        SELECT
            "id",
            "description",
            TO_CHAR("dueDate", 'DD-MM-YYYY') AS "dueDate",
            "category",
            "createdAt",
            "updatedAt"
        FROM tasks
        WHERE "status" <> 'canceled'
    `);
}

export const tasksRepository = {
    create,
    findAll,
};
