<template>
    <v-dialog v-model="localVisible" width="500px" v-if="localVisible" @click:outside="outsideClick">
        <v-card class="vcard">
            <v-card-title>
                <span>Cadastrar Aluno</span>
                <v-form ref="form">
                    <v-text-field v-model="localStudent.name" label="Nome" required></v-text-field>
                    <v-text-field v-model="localStudent.grade1" label="Nota 1" required></v-text-field>
                    <v-text-field v-model="localStudent.grade2" label="Nota 2" required></v-text-field>
                    <v-text-field v-model="localStudent.grade3" label="Nota 3" required></v-text-field>
                    <v-text-field v-model="localStudent.grade4" label="Nota 4" required></v-text-field>
                    <v-card-actions>
                        <v-btn color="red" @click="cancel">Cancelar</v-btn>
                        <v-btn color="primary" @click="save">Salvar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        student: Object,
        visible: Boolean
    },
    data() {
        return{
            localStudent: { ...this.student},
            localVisible: this.visible
        }
    },
    watch: {
        visible(newValue) {
            this.localVisible = newValue
        },
        student(newValue){
            this.localStudent = { ...newValue}
        }
    },
    methods: {
        close() {
            this.$emit('cancel')
        },
        save() {
            if(this.$refs.form.validate()){
                this.$emit('save', this.localStudent)
            }
        },
         outsideClick() {
            this.localVisible = false
         }
    }
}
</script>
