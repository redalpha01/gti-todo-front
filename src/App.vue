<script
    setup
    lang="ts"
>
import TodoList from "@/components/TodoList.vue";
</script>

<template>
  <v-app>
    <v-app-bar title="TODO app pour GTI"></v-app-bar>

    <v-main class="bg-grey-lighten-2" style="min-height: 300px;">
      <v-container>
        <todo-list/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
