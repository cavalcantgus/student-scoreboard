<template>
    <v-dialog v-model="localVisible" width="500px" v-if="localVisible" @click:outside="outsideClick">
        <v-card class="custom-card" outlined>
            <v-card-title>
                <span class="card-title">Cadastrar Aluno</span>
                <v-form ref="form">
                    <v-text-field v-model="localStudent.name" label="Nome" required></v-text-field>
                    <v-text-field v-model="localStudent.grade1" label="Nota 1" required></v-text-field>
                    <v-text-field v-model="localStudent.grade2" label="Nota 2" required></v-text-field>
                    <v-text-field v-model="localStudent.grade3" label="Nota 3" required></v-text-field>
                    <v-text-field v-model="localStudent.grade4" label="Nota 4" required></v-text-field>
                    <v-card-actions class="actions">
                        <v-btn class="cancel-button" @click="cancel">Cancelar</v-btn>
                        <v-btn class="save-button" @click="save">Salvar</v-btn>
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

<style scoped>
.custom-card {
    border-radius: 76px;
}
.card-title {
    text-align: center;
    width: 100%; 
    display: block; 
    margin-bottom: 16px; 
    font-size: 20px; 
    font-weight: bold; 
}
.save-button {
    background-color: rgb(70, 70, 245);
    color: #fff !important;
}
.cancel-button {
    background: rgb(235, 48, 48);
    color: #fff !important;
}
</style>
