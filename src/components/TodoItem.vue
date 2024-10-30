<script
    setup
    lang="ts"
>
import {computed, type PropType, type Ref, ref, watch} from "vue";
import {useTasksStore} from "@/store/tasks.store";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
});

const taskStore = useTasksStore();
// On met la valeur de is_done dans une variable réactive locale pour permettre de l'utiliser dans le v-model du checkbox
const isDone: Ref<boolean> = ref(props.task.is_done);
const description: Ref<string | null> = ref(props.task.description);
const isEdit: Ref<boolean> = ref(false);
const descriptionClass = computed(() => {
  return isDone.value ? 'text-decoration-line-through' : '';
})

const onDeleteBtnClicked = () => {
  taskStore.delete(props.task.id);
}

const onDoneCheckChange = () => {
  taskStore.update(props.task.id, {
    is_done: isDone.value
  });
}

const onDescriptionClick = () => {
  isEdit.value = true;
}

const onDescriptionChange = () => {
  taskStore.update(props.task.id, {
    description: description.value
  }).then(() => {
    isEdit.value = false;
  });
}

// Si la tache est mise à jour autrement, on met à jour la valeur locale
watch(() => props.task?.is_done, () => {
  isDone.value = props.task.is_done;
});

watch(() => props.task?.description, () => {
  description.value = props.task.description;
});
</script>

<template>

  <v-list-item class="cursor-grab item" :data-id="task.id">
    <template #title>
      <template
          v-if="isEdit">
        <form @submit.prevent="onDescriptionChange">
          <v-text-field
              density="compact"
              hide-details
              autofocus
              @blur="onDescriptionChange"
              v-model="description"
          />
        </form>
      </template>

      <div
          v-else
          @click="onDescriptionClick"
          :class="descriptionClass"
          class="w-100"
      >{{ description ?? '' }}</div>
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