<script setup lang="ts">
import TodoGroup from './TodoGroup.vue';
import { TodoStatus } from '../types';
import saveTodoStoreToLocalStorage from '../store/useTodo';
</script>

<template>
    <div class="groups-wrapper">
        <TodoGroup :status="TodoStatus.Pending" :saveTodoStoreToLocalStorage="saveTodoStoreToLocalStorage" />
        <TodoGroup :status="TodoStatus.Inprogress" :saveTodoStoreToLocalStorage="saveTodoStoreToLocalStorage" />
        <TodoGroup :status="TodoStatus.Completed" :saveTodoStoreToLocalStorage="saveTodoStoreToLocalStorage" />
    </div>
</template>

<style scoped>

.groups-wrapper{
    display: flex;
    justify-content: space-around;
    gap: 20px;
}
</style>