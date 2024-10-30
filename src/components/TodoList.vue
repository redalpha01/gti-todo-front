<script
    setup
    lang="ts"
>
import TodoItem from "@/components/TodoItem.vue";
import {useTasksStore} from "@/store/tasks.store";
import {onMounted, type Ref, ref} from "vue";
import AddBtn from "@/components/AddTodoBtn.vue";
import CreateTodoInput from "@/components/CreateTodoInput.vue";
import {useSortable} from "@vueuse/integrations/useSortable";

const taskStore = useTasksStore()

const list: Ref<HTMLElement | null> = ref(null)

useSortable(list, taskStore.tasks, {
  onUpdate: async ({newIndex, item}: SortableUpdateEvent) => {
    if (!item.dataset.id) {
      return;
    }

    // Quelques notes importantes
    // 1. On assume que tous les éléments sont présents à l'écran, donc l'index a une correlation à la position.
    // 1-a. On aurait aussi pu comparer la vieille position à la nouvelle et ajouter la différence à la poisition de la tâche
    // 2. L'index commence à 0 et les positions commencent à 1.
    const taskId = +item.dataset.id;
    const newPosition = newIndex + 1;

    await taskStore.update(taskId, {
      position: newPosition,
    });
  }
})

onMounted(() => {
  taskStore.index()
})
</script>

<template>
  <v-card :loading="taskStore.loading">
    <div class="py-4 pa-8">
      <add-btn/>

      <create-todo-input v-if="taskStore.showAddInput"/>

      <div ref="list">
        <todo-item
            v-for="task of taskStore.tasks"
            :key="task.id"
            :task="task"
        />
      </div>
    </div>
  </v-card>
</template>

<style scoped>
:deep(.v-btn__prepend) {
  margin-inline: unset;
}
</style>