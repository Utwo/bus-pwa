<template>
    <v-toolbar dark tabs class="navigation green lighten-2" :class="{'hide-navigation': !showNavigation}">
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
          <v-list-tile>
            <v-list-tile-title>
              <span itemprop="telephone"><a href="sms:7479">Buy ticket</a></span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-tabs icons-and-text dark centered grow slot="extension" color="grey lighten-4">
        <v-tabs-slider class="cyan"></v-tabs-slider>
        <v-tab to="/" router>
          <span class="green--text">Lines</span>
          <v-icon class="green--text">directions_bus</v-icon>
        </v-tab>
        <v-tab to="/favorite" router>
          <span class="green--text">Favorites</span>
          <v-icon class="green--text">favorite</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
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
