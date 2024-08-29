<template>
  <div>
    <h1 class="page-title">Sistema de Cadastro de Notas</h1>
    <v-btn color="primary" @click="showForm">Cadastrar</v-btn>
    <v-data-table :headers="headers" :items="allStudents" item-key="id">
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>

      <template v-slot:[`item.subject`]="{ item }">
        {{ item.subject}}
      </template>

      <template v-slot:[`item.grade1`]="{ item }">
        {{ item.grade1 }}
      </template>

      <template v-slot:[`item.grade2`]="{ item }">
        {{ item.grade2 }}
      </template>

      <template v-slot:[`item.grade3`]="{ item }">
        {{ item.grade3 }}
      </template>

      <template v-slot:[`item.grade4`]="{ item }">
        {{ item.grade4 }}
      </template>

      <template v-slot:[`item.average`]="{ item }">
        {{ item.average }}
      </template>

      <template v-slot:[`item.status`]="{ item } ">
        <v-chip :color="getColor(item)" class="status-chip" text-color="white">
            {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editStudent(item)">mdi-pencil</v-icon>
        <v-icon @click="handleDeleteStudent(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <StudentForm 
      :student="currentStudent"
      :visible="formVisible"
      @save="handleSaveOrUpdateStudent"
      @cancel="closeForm"
    />
  </div>
</template>

<script>
import StudentForm from './StudentForm.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    StudentForm
  },
  data() {
    return {
      headers: [
        { title: 'Aluno', value: 'name' },
        { title: 'Disciplina', value: 'subject' },
        { title: '1° Bim', value: 'grade1' },
        { title: '2° Bim', value: 'grade2' },
        { title: '3° Bim', value: 'grade3' },
        { title: '4° Bim', value: 'grade4' },
        { title: 'Média', value: 'average' },
        { title: 'Situação', value: 'status' },
        { title: 'Ações', value: 'actions', sortable: false }
      ],
      currentStudent: {},
      formVisible: false
    };
  },
  computed: {
    ...mapGetters('student', ['allStudents'])
  },
  async mounted() {
      await this.fetchStudents()
  },
  methods: {
    ...mapActions('student', ['fetchStudents', 'saveStudent', 'deleteStudent']),
    showForm(student = {}) {
      this.currentStudent = { ...student }
      this.formVisible = true
    },
    closeForm() {
      this.formVisible = false
    },
    async handleSaveOrUpdateStudent(student) { 
      await this.saveStudent(student)
      this.closeForm()
    },
    editStudent(student) {
      this.showForm(student)
    },
    async handleDeleteStudent(student) {
      await this.deleteStudent(student.id)
    },
    getColor(student) {
        return student.status === 'Aprovado' ? 'green' : 'red'
    }
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.status-chip {
    width: 100%;
    text-align: center;
    font-weight: bold;
}
</style>