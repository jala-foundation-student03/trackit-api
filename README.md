## ✨ Features
* Express to handle the API architecture.
* Typescript to get the benefits of static typing.
* Postgres for data persistance.
* Http-status for response padronization.
* Joi to validate bodies of requests.

## :computer: To run the project:
* Run a local postgres database,
* Create a new database and execute dump.sql
* Set the .env file using the .env.example
* Execute the commands:
```
npm i
npm run dev
```

## :world_map: Routes
### post /tasks
#### Creates a new task.
```
{
    description: string (at least 3 characters),
    dueDate: string, representing date in format DD-MM-YYYY,
    category: string, optional
}
```
### get /tasks?orderByDueDate=true&category=&status
#### Retrieves tasks, query params are optional
### put /tasks/:taskId
#### Updates a task
```
{
    description: string (at least 3 characters),
    dueDate: string, representing date in format DD-MM-YYYY,
    category: string
}
```
### put /tasks/:taskId/cancel
#### Sets the task as canceled
### put /tasks/:taskId/delay
#### Sets the task as overdue
### put /tasks/:taskId/complete
#### Sets the task as completed
### put /tasks/complete-task
#### Sets many tasks as completed
```
{
    tasksId: array of integers representing the id's of the tasks
}