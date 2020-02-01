<template>
    <section class="project">
        <v-container class="my-5">
        <!-- MODAL PROJECT -->
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="colorProject"
                        dark
                        absolute
                        right
                        fab
                        v-on="on">
                    <v-icon>add</v-icon>
                    </v-btn>
                </template>
                 <v-card>
                <v-toolbar color="colorProject" dark>
                    <span class="headline white--text">Add Project</span>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                        v-model="title"
                        label="Title"
                        :rules="[required('Title'), minLength('Title', 5), maxLength('Title', 30)]"
                        :counter="30"
                        >
                    </v-text-field>
                    <v-text-field
                        v-model="lang"
                        label="Language"
                        :rules="[required('Language'), minLength('Language', 2), maxLength('Language', 15)]"
                        :counter="15">
                    </v-text-field>
                    <v-select
                        v-model="git"
                        v-bind:items="gitHub"
                        label="GitHub"
                        :rules="[required('GitHub')]"
                    ></v-select>
                    <v-select
                        v-model="status"
                        v-bind:items="statusFocus"
                        label="Status"
                        :rules="[required('Status')]"
                    ></v-select>
                    <v-btn class="mr-4 colorProject"
                        dark
                        :disabled="!valid"
                        :loading="loading"
                        @click="submit()">
                        Add Contact
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
        <h1 class="text-center  font--text mb-5">My Project</h1>
        <v-card flat class="pl-3 pb-1" v-for="project in projects" :key="project.title">
            <v-row :class="`pa-3 project ${project.status}`">
                <v-col cols="12" xs="12" md="4">
                    <div class="caption">Project Title</div>
                    <div>{{project.title}}</div>
                </v-col>
                <v-col xs="6" sm="4" md="2">
                    <div class="caption">Language</div>
                    <div>{{project.lang}}</div>
                </v-col>
                <v-col xs="6" sm="4" md="2">
                    <div class="caption">Date</div>
                    <small>{{project.date}}</small>
                </v-col>
                <v-col xs="2" sm="4" md="1">
                    <div class="caption">GitHub</div>
                    <small>{{project.git}}</small>
                </v-col>
                <v-col xs="2" sm="4" md="2">
                    <div class="right">
                        <v-chip small :class="`${project.status} white--text caption my-2`">
                            {{project.status}}
                        </v-chip>  
                    </div>
                </v-col>
                <v-col xs="2" sm="4" md="1">
                    <v-btn icon @click="deleteProject(project.id)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-col>  
            </v-row>
            <v-divider></v-divider>
        </v-card>
    </v-container>
    </section>
</template>

<script>
import db from '../fb'
import moment from 'moment'

export default {
    
    data() {
        return {
            projects: [],
            title: '',
            lang: '',
            git: [],
            gitHub: ["off", "on"],
            status: [],
            statusFocus: ["active", "finished", "processing"],
            date: '',
            dialog: false,
            valid: false,
            loading: false,
            snackbar: false,
            required(propertyType){
            return v => v && v.length > 0 || `${propertyType} is reqiured.`
            },
            minLength(propertyType, minLength) {
                return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
            },
            maxLength(propertyType, maxLength) {
                return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
            }
        }
    },
    methods: {
        submit() {
            this.loading = true
            const projects = {
                title: this.title,
                lang: this.lang,
                git: this.git,
                status: this.status,
                date: Date.now()
            }
            db.collection('project').add(projects)
                .then(() => {
                    this.loading = false
                    this.dialog = false
                    this.snackbar = true
                    this.$refs.form.reset()      
            })  
        },  
        deleteProject(id) {
            db.collection('project').doc(id).delete()
                .then(() => {
                this.projects = this.projects.filter(project => {
                    return project.id != id
                })
            })
        },
    },
    created() {
    db.collection('project').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if(change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
            date: moment(change.doc.data().date).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style>
    .project.processing {
        border-left: 4px solid #8c9eff;

    }
    .project.active {
        border-left: 4px solid #c23616 !important;
         
    }
    .project.finished {
        border-left: 4px solid #00b894;
        
    }

    .v-chip.processing {
        background: #8c9eff !important;
    }

    .v-chip.active {
        background: #c23616 !important;
    }

    .v-chip.finished {
        background: #00b894 !important;
    }


</style>