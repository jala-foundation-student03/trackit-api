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

async function findAll(sortByDueDate: string, category: string, status: string) {
    let query = `
            SELECT
            "id",
            "description",
            TO_CHAR("dueDate", 'DD-MM-YYYY') AS "dueDate",
            "status",
            "category",
            "createdAt",
            "updatedAt"
        FROM tasks
        WHERE "status" <> 'canceled'
    `;
    const queryParams = [];

    if (category) {
        query += ` AND "category" = $${queryParams.length + 1}`;
        queryParams.push(category);
    }

    if (status) {
        query += ` AND "status" = $${queryParams.length + 1}`;
        queryParams.push(status);
    }

    if(sortByDueDate === "true") {
        query += ` ORDER BY "dueDate"`
    }

    const tasks = await db.query(query, queryParams);
    return tasks.rows;
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
            "updatedAt" = $4
        WHERE id = $5
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

function delayById(taskId: number) {
    return db.query(
        `
        UPDATE tasks
        SET 
            "status" = 'overdue',
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
    delayById
};
