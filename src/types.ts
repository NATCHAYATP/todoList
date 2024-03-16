export enum TodoStatus {
    Pending = "pending",
    Inprogress = "inprogress",
    Completed = "completed",
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}