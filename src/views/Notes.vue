<template>
    <section class="notes">
        <v-container>
            <!-- SNACKBAR -->
            <v-snackbar v-model="snackbar" :timeout="2000" top color="font">
                <span>You just add a new item.</span>
                <v-btn text @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
            <!-- MODAL ADD NOTES-->
            <v-dialog
                v-model="dialog"
                width="500">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="colorNotes"
                        dark
                        absolute
                        right
                        fab
                        v-on="on">
                    <v-icon>add</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar color="colorNotes" dark>
                    <span class="headline white--text">Add Notes</span>
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
                            :counter="15"
                            :rules="[required('Title'), minLength('Title', 5), maxLength('Title', 15)]"
                            >
                        </v-text-field>
                        <v-textarea
                            v-model="details"
                            label="Details"
                            :counter="100"
                            :rules="[required('Details'), minLength('Details', 5), maxLength('Details', 150)]"
                            >
                        </v-textarea>
                        <v-text-field
                            v-model="url"
                            label="Url"
                            :counter="50"
                            :rules="[required('Url'), minLength('Url', 5), maxLength('Url', 50)]"
                            >
                        </v-text-field>
                        <v-btn class="mr-4 colorNotes"
                            dark
                            :disabled="!valid"
                            :loading="loading"
                            @click="submit()">
                                Add note
                        </v-btn>
                    </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- CONTENT -->
            <h1 class="text-center  font--text mb-5">Notes</h1>
            <v-row>
            <v-col cols="12" xs="12" sm="6" md="4" lg="3"
                    v-for="nota in note" :key="nota.id">
                <v-card class="mx-auto" height="240">
                    <v-toolbar color="colorNotes" dark>
                        <span class="white--text">{{nota.title}}</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            v-bind:href="nota.url"
                            target="_blank">
                        <v-icon>public</v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteNote(nota.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <p>{{nota.details}}</p>
                        <v-divider></v-divider>
                        <small class="mb-1">
                            {{ nota.date }}
                        </small>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import db from '../fb'
import moment from 'moment'

export default {
    data() {
        return {
            note: [],
            title: '',
            date: '',
            details: '',
            url: '',
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
            },
        }
    },
    methods: {
        submit() {
            this.loading = true
            const notes = {
                title: this.title,
                date: Date.now(),
                url: this.url,
                details: this.details,
            }
            db.collection('note').add(notes)
                .then(() => {
                    this.loading = false
                    this.dialog = false
                    this.snackbar = true
                    this.$refs.form.reset()      
            })  
        },
        deleteNote(id) {
            db.collection('note').doc(id).delete()
            .then(() => {
            this.note = this.note.filter(nota => {
                return nota.id != id
            })
            })
        }
    },
    created() {
        db.collection('note').onSnapshot(res => {
            const changes = res.docChanges();
            changes.forEach(change => {
                if(change.type === "added") {
                this.note.push({
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