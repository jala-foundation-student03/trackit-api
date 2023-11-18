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
    return db.query(`INSERT INTO tasks ("description", "dueDate") VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'))`, [
        description,
        dueDate,
    ]);
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

async function findById(taskId: number) {
    const task = await db.query(
        `
        SELECT
            "id",
            "description",
            TO_CHAR("dueDate", 'DD-MM-YYYY') AS "dueDate",
            "status",
            "category",
            "createdAt",
            "updatedAt"
        FROM tasks
        WHERE "id" = $1
    `,
        [taskId]
    );
    return task.rows[0];
}

function updateById(taskId: number, taskData: NewTask) {
    const { description, dueDate, category } = taskData;

    return db.query(
        `
        UPDATE tasks
        SET 
            "description" = $1,
            "dueDate" = $2,
            "category" = $3,
            "updatedAt" = $5
        WHERE id = $6
    `,
        [description, dueDate, category, new Date(), taskId]
    );
}

function cancelById(taskId: number) {
    return db.query(
        `
        UPDATE tasks
        SET 
            "status" = 'canceled',
            "updatedAt" = $1
        WHERE id = $2
    `,
        [new Date(), taskId]
    );
}

function completeById(taskId: number) {
    return db.query(
        `
        UPDATE tasks
        SET 
            "status" = 'completed',
            "updatedAt" = $1
        WHERE id = $2
    `,
        [new Date(), taskId]
    );
}

export const tasksRepository = {
    create,
    findAll,
    findById,
    updateById,
    cancelById,
    completeById,
};
