<script
    setup
    lang="ts"
>
import {useTasksStore} from "@/store/tasks.store";
import {ref} from "vue";
import {de} from "vuetify/locale";

const taskStore = useTasksStore();
const description = ref('');

// On veut sauvegarder le todo dès qu'on clique à l'exterieur du todo
const onInputBlur = () => {
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