import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const schemaNewTask = joi.object({
    description: joi.string().min(3).required(),
    dueDate: joi.date().format("DD-MM-YYYY").required(),
    category: joi.string(),
});

export const schemaUpdateTask = joi.object({
    description: joi.string().min(3).required(),
    dueDate: joi.date().format("DD-MM-YYYY").required(),
    category: joi.string().min(3).required(),
    status: joi.string().min(3).required(),
});

export const schemaCompleteMany = joi.object({
    tasksId: joi.array().items(joi.number()).unique().required(),
});
