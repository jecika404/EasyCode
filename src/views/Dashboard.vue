<template>
  <div class="dashboard">
    <v-container>
      <h1 class="text-center font--text mb-5">Dashboard</h1>
      <v-row dense align="center">
        <v-col 
          cols="12" xs="12" sm="6" md="4" lg="3"
          v-for="link in links"
          :key="link.text"
         
         >
          <v-hover
            v-slot:default="{ hover }"
          >
          <v-card
            dark
            class="justify-center"
            :elevation="hover ? 12 : 2"
            :style="{ 'background-color': link.color }"
          >
            <v-card-title class="headline justify-center text-uppercase"><v-icon large left>{{ link.icon }}</v-icon>{{ link.text }}</v-card-title>
              <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn text block :to="link.route">See</v-btn>
            </v-card-actions>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>


export default {
  
data: () => ({
        links: [
            { icon: 'code', text: 'my project', route: '/project', color: '#b33939' },
            { icon: 'event', text: 'calendar', route: '/calendar', color: '#218c74' },
            { icon: 'contacts', text: 'contact', route: '/contact', color: '#cd6133' },
            { icon: 'notes', text: 'notes', route: '/notes', color: '#cc8e35' },
        ]
    }),


}
</script>
