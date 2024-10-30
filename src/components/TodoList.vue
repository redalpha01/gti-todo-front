<script
    setup
    lang="ts"
>
import TodoItem from "@/components/TodoItem.vue";
import {useTasksStore} from "@/store/tasks.store";
import {onMounted} from "vue";
import AddBtn from "@/components/AddTodoBtn.vue";
import CreateTodoInput from "@/components/CreateTodoInput.vue";

const taskStore = useTasksStore();

onMounted(() => {
  taskStore.index()
})
</script>

<template>
  <v-card :loading="taskStore.loading">
    <div class="py-4 pa-8">
      <add-btn/>

      <create-todo-input v-if="taskStore.showAddInput"/>

      <todo-item
          v-for="task of taskStore.tasks"
          :key="task.id"
          :task="task"
      />
    </div>
  </v-card>
</template>

<style scoped>
:deep(.v-btn__prepend) {
  margin-inline: unset;
}
</style>