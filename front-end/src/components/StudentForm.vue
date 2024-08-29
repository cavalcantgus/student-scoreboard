<template>
    <v-dialog v-model="localVisible" width="500px" @click:outside="close" @keydown.esc="close">
        <v-card class="custom-card" outlined>
            <v-card-title>
                <span class="card-title">Cadastrar Aluno</span>
                <v-form ref="form">
                    <v-text-field 
                        type="text" 
                        v-model="localStudent.name" 
                        :rules="[rules.name]"
                        pattern="[A-Za-z\s]*"
                        label="Nome" required
                        class="input-field">
                    </v-text-field>
                    <v-combobox 
                        v-model="localStudent.subject" 
                        :items="subjects"
                        :rules="validadeSubjectRules"
                        label="Disciplina" required
                        clearable
                        class="input-field">
                    </v-combobox>
                    <v-text-field 
                        type="number"
                        v-model="localStudent.grade1" 
                        :rules="gradesValidation(1)"
                        step="0.01" 
                        label="1° Bim" required
                        @input="formatGrade(1)"
                        class="input-field">
                    </v-text-field>
                    <v-text-field 
                        type="number"
                        v-model="localStudent.grade2"
                        :rules="gradesValidation(2)" 
                        step="0.01" 
                        label="2° Bim" required
                        @input="formatGrade(2)"
                        class="input-field">
                    </v-text-field>
                    <v-text-field 
                        type="number"
                        v-model="localStudent.grade3" 
                        :rules="gradesValidation(3)"
                        step="0.01" 
                        label="3° Bim" required
                        @input="formatGrade(3)"
                        class="input-field">
                    </v-text-field>
                    <v-text-field 
                        type="number"
                        v-model="localStudent.grade4" 
                        :rules="gradesValidation(4)"
                        step="0.01" 
                        label="4° Bim" required
                        @input="formatGrade(4)"
                        class="input-field">
                    </v-text-field>
                    <v-card-actions class="actions">
                        <v-btn class="cancel-button" @click="close">Cancelar</v-btn>
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
            localVisible: this.visible,
            subjects: ['Matemática', 'Português', 'Geografia', 'Ciências', 'Filosofia', 'Inglês'],
            rules: {
                name: value => !!value || 'Este campo é obrigatório',
                
            }
        }
    },
    computed: {
        validadeSubjectRules() {
            return [
                value => !!value || 'Você precisa escolher uma disciplina',
                value => this.subjects.includes(value) || 'Disciplina inválida'
            ];
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
        gradesValidation(gradeNumber){
            return [
                value => !!value || `Você deve digitar a nota do ${gradeNumber}° bimestre`,
                value => /^\d+([.,]\d{1,2})?$/.test(value) || `A nota deve estar no formato correto`,
                value => {
                    const parsedValue = parseFloat(value.replace(',', '.'))
                    return (parsedValue >= 0 && parsedValue <= 10) || `A nota deve estar entre 0 e 10`
                }
            ]
        },

        formatGrade(gradeNumber) {
            const field = `grade${gradeNumber}`;
            this.localStudent[field] = this.localStudent[field]
                .replace(',', '.')
                .replace(/^0+(?!$)/, '')
        },

        close() {
            this.$emit('cancel')
        },
        async save() {
            const { valid } = await this.$refs.form.validate()
            if(valid){
                this.$emit('save', this.localStudent)
            }
        }
    }
}
</script>

<style scoped>
.custom-card {
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    text-align: center;
    width: 100%; 
    display: block; 
    margin-bottom: 16px; 
    font-size: 20px; 
    font-weight: bold; 
}

.input-field .v-input__control {
    border-radius: 12px;
    overflow: hidden;
}

.input-field .v-input__slot {
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #f9f9f9;
}

.save-button {
    background-color: #4CAF50;
    color: #fff;
}

.cancel-button {
    background: #f44336;
    color: #fff;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>