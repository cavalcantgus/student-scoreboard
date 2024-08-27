<template>
  <v-app>
    <v-container>
      <StudentTable />
    </v-container>
  </v-app>
</template>

<script>
import StudentTable from './components/StudentTable.vue';

export default {
  components: {
    StudentTable
  }
};
</script>

<style>
</style>
