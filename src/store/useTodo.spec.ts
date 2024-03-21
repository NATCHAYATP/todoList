import { saveTodoStoreToLocalStorage } from "./useTodo";
import { TodoStatus, Todo } from "../types";
import { LocalStorage } from "jest-localstorage-mock";

// เรียกใช้งานโมกูลเพื่อจำลอง localStorage
global.localStorage = new LocalStorage();

describe("saveTodoStoreToLocalStorage", () => {
    it("should save todo store to local storage", () => {
        // Arrange
        const mockTodo: Todo = {
            id: 1,
            title: "Todo 1",
            description: "This is a description",
            status: TodoStatus.Pending
        };
        const mockTodoStore: Record<TodoStatus, Todo[]> = {
            [TodoStatus.Pending]: [mockTodo],
            [TodoStatus.Inprogress]: [],
            [TodoStatus.Completed]: []
        };
        const expectedLocalStorageData = JSON.stringify(mockTodoStore);

        // Act
        saveTodoStoreToLocalStorage();

        // Assert
        expect(localStorage.setItem).toHaveBeenCalledWith("todo_store", expectedLocalStorageData);
    });
});
