<template>
  <div>
    <v-btn color="primary" @click="showForm">Cadastrar</v-btn>
    <v-data-table :headers="headers" :items="students" item-key="id">
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
        {{ calculateAverage(item) }}
      </template>

      <template v-slot:[`item.status`]="{ item } ">
        <v-chip :color="getColor(item)" class="status-chip" text-color="white">
            {{ calculateStatus(item) }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editStudent(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteStudent(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <StudentForm 
      :student="currentStudent"
      :visible="formVisible"
      @save="saveStudent"
      @cancel="closeForm"
    />
  </div>
</template>

<script>
import StudentForm from './StudentForm.vue';
import { v4 as uuidv4 } from 'uuid'

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
      students: [],
      currentStudent: {},
      formVisible: false
    };
  },
  methods: {
    showForm(student = {}) {
      this.currentStudent = { ...student }
      this.formVisible = true
    },
    closeForm() {
      this.formVisible = false
    },
    async saveStudent(student) { 
      if (student.id) {
        const index = this.students.findIndex(s => s.id === student.id)
        if (index !== -1) {
          this.students[index] = student
        }
      } else {
        student.id = uuidv4()
        this.students.push(student)
      }
      this.closeForm();
    },
    editStudent(student) {
      this.showForm(student)
    },
    deleteStudent(student) {
      this.students = this.students.filter(s => s.id !== student.id)
    },
    calculateAverage(student) {
      const grades = [student.grade1, student.grade2, student.grade3, student.grade4].map(Number)
      const total = grades.reduce((sum, grade) => sum + grade, 0)
      return (total / grades.length).toFixed(2)
    },
    calculateStatus(student) {
      return this.calculateAverage(student) >= 7 ? 'Aprovado' : 'Reprovado'
    },
    getColor(student) {
        return this.calculateStatus(student) === 'Aprovado' ? 'green' : 'red'
    }
  }
}
</script>

<style scoped>
.status-chip {
    width: 100%;
    text-align: center;
    font-weight: bold;
}
</style>
