<template>
  <div id="app">
    <v-card class="grey lighten-5" flat>
      <TheNavigation></TheNavigation>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title class="body-2 grey--text" v-show="!showSearch">BUS PWA</v-toolbar-title>
              <v-spacer v-show="!showSearch"></v-spacer>
              <v-text-field  solo
                             prepend-icon="search"
                             placeholder="Search"
                             name="filter"
                             type="number"
                             v-model.trim="filterTerm"
                             v-show="showSearch"
              ></v-text-field>
              <v-btn icon @click="showSearch = !showSearch"><v-icon>search</v-icon></v-btn>
              <v-btn icon><v-icon>apps</v-icon></v-btn>
            </v-toolbar>
            <v-divider class="grey lighten-2"></v-divider>
            <router-view></router-view>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-container>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-container>
  </div>
</template>

<script>
  import TheNavigation from './components/TheNavigation'
  export default {
    name: 'app',
    components: {
      TheNavigation
    },
    data () {
      return {
        showSearch: false,
        filterTerm: ''
      }
    }
  }
</script>
