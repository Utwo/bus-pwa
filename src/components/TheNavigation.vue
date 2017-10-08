<template>
  <v-tabs light fixed icons grow :scrollable="false" class="navigation">
    <v-toolbar class="green lighten-2 white--text">
      <v-toolbar-side-icon @click="showNavigation = !showNavigation"></v-toolbar-side-icon>
      <v-toolbar-title>Cluj BUS</v-toolbar-title>
      <v-text-field  solo
                     prepend-icon="search"
                     placeholder="Search"
                     name="filter"
                     type="text"
                     class="mx-5 green lighten-1 elevation-0 white--text"
                     style="max-width: 800px"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu bottom right :nudge-width="100">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list class="white">
          <v-list-tile>
            <v-list-tile-title>
              <router-link :to="'/about'">About</router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-tabs-bar class="grey lighten-4 ma-0" slot="extension" v-if="showNavigation">
        <v-tabs-slider class="cyan"></v-tabs-slider>
        <v-tabs-item to="/" router>
          <v-icon class="green--text">directions_bus</v-icon>
          <span class="green--text">Lines</span>
        </v-tabs-item>
        <v-tabs-item to="/favorite" router>
          <v-icon class="green--text">favorite</v-icon>
          <span class="green--text">Favorites</span>
        </v-tabs-item>
      </v-tabs-bar>
    </v-toolbar>
  </v-tabs>
</template>

<script>
  export default {
    name: 'TheNavigation',
    data () {
      return {
        showNavigation: true
      }
    }
  }
</script>
