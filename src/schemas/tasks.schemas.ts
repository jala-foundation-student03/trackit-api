import joiBase, { string } from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const schemaNewTask = joi.object({
    description: joi.string().min(3).required(),
    dueDate: joi.date().format("DD-MM-YYYY").required(),
    category: joi.string(),
});
