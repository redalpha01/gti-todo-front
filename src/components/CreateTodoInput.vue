<script
    setup
    lang="ts"
>
import {useTasksStore} from "@/store/tasks.store";
import {type Ref, ref} from "vue";

const taskStore = useTasksStore();
const description: Ref<string> = ref('');
let submitted = false;

// On veut sauvegarder la tache dès qu'on clique à l'exterieur de l'input
const onInputBlur = () => {
  if (submitted) {
    return;
  }
  submitted = true;

  if (description.value === "") {
    taskStore.showAddInput = false;
    return;
  }

  taskStore.store({
    description: description.value
  }).then(() => {
    taskStore.showAddInput = false;
  })
}
</script>

<template>
  <v-list-item>
    <form @submit.prevent="onInputBlur">
      <v-text-field
          hide-details
          placeholder="Nouvelle tâche"
          autofocus
          density="compact"
          v-model="description"
          @blur="onInputBlur"
      ></v-text-field>
    </form>
  </v-list-item>
</template>

<style scoped>

</style>