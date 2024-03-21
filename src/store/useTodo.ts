import { TodoStatus, Todo } from "../types";
import { reactive, computed } from "vue";

const STORAGE_KEY = "todo_store";
interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.Inprogress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [],
    [TodoStatus.Inprogress]: [],
    [TodoStatus.Completed]: [],
}

const storedData = localStorage.getItem(STORAGE_KEY);
//const todoStore = reactive<TodoStore>(defaultVal);
const todoStore = reactive<TodoStore>(storedData ? JSON.parse(storedData) : defaultVal);

export const saveTodoStoreToLocalStorage = () => {
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

    const updateTodoStatus = (id: number, newIndex: number, status: TodoStatus) => {
        const todoToUpdate = todoStore[status].find(todo => todo.status === status);
        console.log(todoToUpdate);
        if (todoToUpdate) {
            todoToUpdate.id = id;

            if (newIndex !== -1) {
                const currentIndex = todoStore[status].indexOf(todoToUpdate);
                if (currentIndex !== - 1) {
                    todoStore[status].splice(currentIndex, 1);
                }

                todoStore[status].splice(newIndex, 0, todoToUpdate);
            }

            saveTodoStoreToLocalStorage();
            console.log("--->", saveTodoStoreToLocalStorage);
        }
    }
    return { getTodosByStatus, addNewTodo, updateTodoStatus };
};