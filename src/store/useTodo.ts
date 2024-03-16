import { TodoStatus, type Todo } from "../types";
import { reactive, computed } from "vue";
interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.Inprogress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

export const defaultVal = {
    [TodoStatus.Pending]: [
        {
            id: 1,
            title: "Learn Vue",
            description: "fighting",
            status: TodoStatus.Pending,
        },
    ],
    [TodoStatus.Inprogress]: [],
    [TodoStatus.Completed]: [],
}

const todoStore = reactive<TodoStore>(defaultVal);

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => todoStore[todoStatus]);
    };
    
    return { getTodosByStatus };
};