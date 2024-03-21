import { log } from "console";
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
    console.log(id);
    
    // Find the todo by status
    const todoToUpdate = todoStore[status].find(todo => todo.status === status);
    console.log(todoToUpdate);
    // If the todo is found
    if (todoToUpdate) {
        // Update its status
        todoToUpdate.id = id;

        // Reorder if necessary
        if (newIndex !== -1) {
            // Remove the todo from its current position
            const currentIndex = todoStore[status].indexOf(todoToUpdate);
            if (currentIndex !== - 1) {
                todoStore[status].splice(currentIndex, 1);
            }

            // Insert the todo to its new position
            todoStore[status].splice(newIndex, 0, todoToUpdate);
        }

        // Save the changes to localStorage or emit events if necessary
        saveTodoStoreToLocalStorage();
        console.log("--->", saveTodoStoreToLocalStorage);
        
    }
}
    return { getTodosByStatus, addNewTodo, updateTodoStatus };
};