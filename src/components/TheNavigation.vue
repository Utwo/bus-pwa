<template>
  <v-tabs light fixed icons grow :scrollable="false" class="navigation" :class="{'hide-navigation': !showNavigation}">
    <v-toolbar dark  class="green lighten-2 white--text">
      <v-toolbar-side-icon @click="showNavigation = !showNavigation"></v-toolbar-side-icon>
      <v-toolbar-title>Cluj BUS</v-toolbar-title>
      <div @click="clickSelect" class="search__wrap" :class="{'hide-search--mobile': !hideIconSearch, 'search-expand': hideIconSearch}">
      <v-select
        solo
        ref="search"
        prepend-icon="search"
        placeholder="Search"
        :class="{'hide-search--mobile': !hideIconSearch, 'search-expand': hideIconSearch}"
        class="mx-5 green lighten-1 elevation-0 white--text"
        dark
        cache-items
        :items="busLines"
        @change="redirectTo"
        item-text="name"
        return-object
        tabindex="1"
        single-line
        autocomplete
      ></v-select>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon class="search-icon--mobile" @click="hideIconSearch = !hideIconSearch" :class="{'hide-search': hideIconSearch}">
        <v-icon>search</v-icon>
      </v-btn>
      <v-menu offset-y :nudge-width="100">
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
      <v-tabs-bar class="grey lighten-4 ma-0" slot="extension" v-show="showNavigation">
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
  import LineService from '../services/LineService'

  export default {
    data () {
      return {
        showNavigation: true,
        hideIconSearch: false,
        busLines: []
      }
    },
    methods: {
      async clickSelect () {
        if (this.busLines.length === 0) {
          this.busLines = await LineService.getBuses()
        }
      },
      redirectTo (busItem) {
        this.hideIconSearch = false
        if (busItem.name) {
          this.$router.push('/bus/' + busItem.name)
        }
      }
    }
  }
</script>
