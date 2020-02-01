<template>
  <section class="contact">
  <v-container>
    <div class="popup text-center">
    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar" :timeout="2000" top color="font">
        <span>You just add a new item.</span>
        <v-btn text @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
    <!-- MODEL FORM FOR CONTACT -->
    <v-dialog
      v-model="dialog"
      width="500">
      <template v-slot:activator="{ on }">
        <v-btn
            color="colorContact"
            dark
            absolute
            right
            fab
            v-on="on">
        <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="colorContact" dark>
          <span class="headline white--text">Add Contact</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            :rules="[required('Name'), minLength('Name', 2), maxLength('Name', 10)]"
            prepend-icon="person"
            >
          </v-text-field>
          <v-text-field
            v-model="lastname"
            :counter="15"
            label="Last Name"
            :rules="[required('Last Name'), minLength('Last Name', 3), maxLength('Last Name', 15)]"
            prepend-icon="person"
            >
          </v-text-field>
          <v-text-field
            v-model="email"
            :counter="30"
            label="E-mail"
            :rules="[required('E-mail'), minLength('E-mail', 5), maxLength('E-mail', 30), emailRule('E-mail', 'valid')]"
            prepend-icon="mdi-email"
          >
          </v-text-field>
          <v-text-field
            v-model="numb"
            type="number"
            label="Number"
            :counter="30"
            :rules="[required('Number'), minLength('Number', 9), maxLength('Number', 30)]"
            prepend-icon="mdi-phone"
          >
          </v-text-field>
          <v-text-field
            v-model="state"
            :counter="30"
            label="State"
            :rules="[required('state'), minLength('State', 2), maxLength('State', 30)]"
            prepend-icon="mdi-map-marker">
          </v-text-field>
          <v-btn class="mr-4 colorContact"
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
</div>
    <!-- CONTENT -->
    <h1 class="text-center font--text mb-5">Contact</h1>
    <v-row dense align="center">
      <v-col cols="12" xs="12" sm="6" md="4" lg="3"
             v-for="cont in contact" :key="cont.id">
        <v-card>
          <v-toolbar color="colorContact" dark>
            <span class="headline white--text">{{cont.name}} {{cont.lastname}}</span>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="deleteContact(cont.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{cont.numb}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>
            <v-list-item >
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{cont.email}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{cont.state}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</section>

</template>

<script>
import db from '../fb'

export default {

  data() {
    return {
      contact: [],
      name: '',
      lastname: '',
      email: '',
      numb: '',
      state: '',
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
      emailRule(propertyType, emailRule) {
          return v => /.+@.+\..+/.test(v) || `${propertyType} must be ${emailRule}.`
      }
    }
  },
  methods: {
    submit() {
        this.loading = true
        const contacts = {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            numb: this.numb,
            state: this.state,   
        }
        db.collection('contact').add(contacts)
            .then(() => {
                this.loading = false
                this.dialog = false
                this.snackbar = true
                this.$refs.form.reset()      
        })  
    },
    deleteContact(id) {
      db.collection('contact').doc(id).delete()
        .then(() => {
          this.contact = this.contact.filter(cont => {
            return cont.id != id
          })
        })
    }
  },
  created() {
    db.collection('contact').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if(change.type === "added") {
          this.contact.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>
