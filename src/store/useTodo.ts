import { TodoStatus, type Todo } from "../types";
import { reactive, computed } from "vue";

const STORAGE_KEY = "todo_store";
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

const storedData = localStorage.getItem(STORAGE_KEY);
//const todoStore = reactive<TodoStore>(defaultVal);
const todoStore = reactive<TodoStore>(storedData ? JSON.parse(storedData) : defaultVal);

const saveTodoStoreToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoStore));
};

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => todoStore[todoStatus]);
    };

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo);
        saveTodoStoreToLocalStorage();
    }
    
    return { getTodosByStatus, addNewTodo };
};