<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Register Grades</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-sheet class="mx-auto" width="300">
        <v-form ref="form">
          <v-text-field v-model="name" :rules="nameRules" label="Complete name" required></v-text-field>
          <v-text-field v-model="grade1" :rules="gradeValidation(1)" label="Grade 1" required></v-text-field>
          <v-text-field v-model="grade2" :rules="gradeValidation(2)" label="Grade 2" required></v-text-field>
          <v-text-field v-model="grade3" :rules="gradeValidation(3)" label="Grade 3" required></v-text-field>
          <v-text-field v-model="grade4" :rules="gradeValidation(4)" label="Grade 4" required></v-text-field>
          <v-btn class="mt-2" block @click="validate">Submit</v-btn>
          <v-snackbar v-model="snackbar.visibility" :color="snackbar.color"> {{ snackbar.message }} </v-snackbar>
        </v-form>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    name: '',
    nameRules: [
      value => !!value || 'Name is required',
    ],
    grade1: null,
    grade2: null,
    grade3: null,
    grade4: null,
    snackbar: {
      visibility: false,
      message: '',
      color: ''
    }
  }),

  methods: {
    gradeValidation (gradeNumber) {
      return [
        value => !!value || `You must enter a grade ${gradeNumber}`,
        value => (value && !isNaN(value) && value >= 0 && value <= 10) || `Grade ${gradeNumber} must be a number between 0 and 10`
      ]
    },

    async validate () {
      const { valid } = await this.$refs.form.validate()
      if(valid) {
        const average = this.average()
        if(average !== null){
          const status = average >= 7
          const message = `Average: ${average} - Status: ${status ? 'Approved' : 'Failed'}`
          this.showSnackbar(message, status ? 'green' : 'red')
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }
      }
    },
    average (){
      const grades = [this.grade1, this.grade2, this.grade3, this.grade4].map(grade => Number(grade))
      const total = grades.reduce((sum, grade) => sum + grade, 0)
      const average = total / grades.length
      return average
    },  
    showSnackbar (message, color) {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.visibility = true
    }
  }
}
</script>

 