<template>
  <nav>
      <v-navigation-drawer
        v-model="drawer"
        app
        dark
        src="../assets/drawer.jpg"
      >
        <v-row justify="center">
            <v-col cols="6" class="mt-5">
                <v-avatar size="100">
                    <img src="../assets/avatar.jpg" />
                </v-avatar>
                <p class="subheding mt-4 white--text">Padmé Amidala</p>
            </v-col>
        </v-row>

      <v-divider></v-divider>
      <v-list dense class="text-uppercase">
          <v-list-item link  v-for="link in links" :key="link.text" :to="link.route">
              <v-list-item-action>
                  <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>
                  {{ link.text }}
              </v-list-item-title>
          </v-list-item>
      </v-list>
      </v-navigation-drawer>

      <v-app-bar
        flat
        app
      >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
          <span class="font--text text--lighten-2" >Easy</span>
          <span class="font--text text--lighten-4" >Code</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>exit_to_app</v-icon>
    </v-btn>
           
      </v-app-bar>
  </nav>

  
</template>


<script>
export default {
    data: () => ({
        drawer: false,
        links: [
            { icon: 'dashboard', text: 'dashboard', route: '/'},
            { icon: 'code', text: 'my project', route: '/project'},
            { icon: 'contacts', text: 'contact', route: '/contact'},
            { icon: 'notes', text: 'notes', route: '/notes'},
            { icon: 'event', text: 'calendar', route: '/calendar'},
        ]
    }),
}
</script>