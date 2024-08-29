const state = {
    students: []
}

const mutations = {
    SET_STUDENTS(state, students) {
        state.students = students
    },

    ADD_STUDENT(state, student) {
        state.students.push(student)
    },

    UPDATE_STUDENT(state, updatedStudent) {
        const index = state.students.findIndex(s => s.id === updatedStudent.id)
        if(index !== -1){
            state.students.splice(index, 1, updatedStudent)
        }
    },
    
    DELETE_STUDENT(state, id) {
        state.students = state.students.filter(s => s.id !== id)
    }
}

const actions = {
    async fetchStudents({ commit }) {
        try {
            const response = await fetch('http://localhost:3000/student')
            const students = await response.json()
            commit('SET_STUDENTS', students)
        } catch(error) {
            console.error()
        }
    },

    async saveStudent({ commit }, student) {
        let result 
        if (student.id) {
          result = await fetch(`http://localhost:3000/student/${student.id}`, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: { 'Content-Type': 'application/json' }
          }).then(res => res.json());
          commit('UPDATE_STUDENT', result)
        } else {
            result = await fetch('http://localhost:3000/student', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: { 'Content-Type': 'application/json' }
          }).then(res => res.json())
          commit('ADD_STUDENT', result)
        }
      }, 

      async deleteStudent({ commit }, studentId) {
        await fetch(`http://localhost:3000/student/${studentId}`, { method: 'DELETE' })
        commit('DELETE_STUDENT', studentId);
      }
}

const getters = {
    allStudents: state => state.students
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}