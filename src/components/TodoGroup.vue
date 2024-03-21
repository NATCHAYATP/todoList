<script setup lang="ts">
import { TodoStatus } from "../types";
import useTodos from "../store/useTodo";
import Draggable from "vuedraggable";
import CreateTodo from "./CreateTodo.vue";

interface Props {
    status: TodoStatus;
    saveTodoStoreToLocalStorage: () => void;
}

const props = defineProps<Props>();

const { getTodosByStatus, updateTodoStatus } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.Inprogress]: "Inprogress",
    [TodoStatus.Completed]: "Completed",
};

const onDragEnd = (event: DragEvent & { newIndex: any }) => {
    const draggedItemId = Number((event.target as HTMLElement)?.id);
    const newIndex = event.newIndex - 1;
    const status = props.status;

    updateTodoStatus(draggedItemId, newIndex, status);
    props.saveTodoStoreToLocalStorage();
};
</script>

<template>
    <div class="group-wrapper">
        <h3>{{ groupLabel[props.status] }}</h3>

        <draggable class="draggable" :list="todoList" group="todos" :itemKey="'id'" @end="onDragEnd">
            <template #item="{ element: todo }">
                <li>
                    {{ todo.title }}
                    <div>
                        <span class="todo-description">{{ todo.description }}</span>
                    </div>
                </li>
            </template>
        </draggable>

        <CreateTodo :status="props.status" />
    </div>
</template>

<style scoped>
.group-wrapper {
    flex: 1;
    padding: 20px;
    background-color: rebeccapurple;
    width: 300px;
}

.group-wrapper li {
    list-style-type: nine;
    background-color: rgb(208, 135, 208);
    color: rgb(98, 32, 9);
    padding: 2px 5px;
    cursor: grab;
    margin-bottom: 10px;
}

.draggable {
    min-height: 200px;
}

.todo-description {
    font-size: 17px;
}
</style>
