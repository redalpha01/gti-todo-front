<script
    setup
    lang="ts"
>
import {computed, type PropType, ref, watch} from "vue";
import {useTasksStore} from "@/store/tasks.store";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
});

const taskStore = useTasksStore();
// On met la valeur de is_done dans une variable réactive locale pour permettre de l'utiliser dans le v-model du checkbox
const isDone = ref(props.task.is_done);
const titleClass = computed(() => {
  return isDone.value ? 'text-decoration-line-through' : '';
})

const onDeleteBtnClicked = () => {
  taskStore.delete(props.task.id);
}

const onDoneCheckChange = () => {

}

// Si la tache est mise à jour autrement, on met à jour la valeur locale
watch(() => props.task, () => {
  isDone.value = props.task.is_done;
})
</script>

<template>

  <v-list-item class="cursor-grab item">
    <template #title>
      <span :class="titleClass">{{ task.description ?? '' }}</span>
    </template>
    <template #prepend>
      <v-checkbox
          hide-details
          density="compact"
          v-model="isDone"
          @change="onDoneCheckChange"
      ></v-checkbox>
    </template>
    <template #append>
      <v-icon
          class="cursor-pointer"
          icon="delete"
          @click="onDeleteBtnClicked"
      />
    </template>
  </v-list-item>
</template>

<style scoped>
:deep(.v-input--density-compact) {
  --v-input-control-height: 28px;
}
</style>