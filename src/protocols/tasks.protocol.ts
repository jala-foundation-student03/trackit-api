export type NewTask = {
    description: string;
    dueDate: string;
    category?: string;
};

export type Filters = {
    sortByDueDate?: string;
    category?: string;
    status?: string;
};
