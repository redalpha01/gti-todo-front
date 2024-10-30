<script lang="ts" setup>
  import {useTasksStore} from "@/store/tasks.store";

  const taskStore = useTasksStore();

  // Quand on clique sur ajouter, on veut simplement montrer le champ pour l'ajout.
  const onAddBtnClicked = () => {
    taskStore.showAddInput = true;
  }
</script>

<template>
  <v-btn
      color="primary"
      class="justify-start mx-4 mb-2"
      @click="onAddBtnClicked"
  >
    <v-icon
        class="mx-1"
        icon="add_circle"
    />
    Ajouter une tâche
  </v-btn>
</template>