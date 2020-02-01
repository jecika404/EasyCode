import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#00b894', 
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#c23616',
            font: '#2f3640',
            colorContact: '#cd6133',
            colorProject: '#b33939',
            colorNotes: '#cc8e35',
            colorCal: '#218c74',
            white: '#fff'
          },
        },
      },
});
