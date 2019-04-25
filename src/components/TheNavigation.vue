<template>
  <v-toolbar dark tabs class="navigation green lighten-2">
    <v-toolbar-title class="mr-4">Cluj BUS</v-toolbar-title>
    <v-autocomplete
      :items="busLines"
      :search-input.sync="search"
      :class="{
        'hide-search--mobile': !hideIconSearch,
        'search-expand': hideIconSearch
      }"
      solo
      prepend-icon="search"
      placeholder="Search"
      label="Search"
      class="px-2 green lighten-1 elevation-0 white--text"
      item-text="name"
      cache-items
      return-object
      tabindex="1"
      single-line
      hide-no-data
      @change="redirectTo"
    />
    <v-spacer />
    <v-btn
      :class="{ 'hide-search': hideIconSearch }"
      icon
      aria-label="search"
      class="search-icon--mobile"
      @click="hideIconSearch = !hideIconSearch"
    >
      <v-icon>search</v-icon>
    </v-btn>
    <v-menu :nudge-width="100" offset-y>
      <v-btn slot="activator" aria-label="more options" icon>
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
    <v-tabs
      slot="extension"
      icons-and-text
      dark
      centered
      grow
      color="grey lighten-4"
    >
      <v-tabs-slider class="cyan" />
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
import LineService from "../services/LineService"

export default {
  data() {
    return {
      hideIconSearch: false,
      busLines: [],
      search: null
    }
  },
  watch: {
    async search() {
      // Items have already been loaded
      if (this.busLines.length > 0) return

      this.busLines = await LineService.getBuses()
    }
  },
  methods: {
    redirectTo(busItem) {
      this.hideIconSearch = false
      if (busItem.name) {
        this.$router.push("/bus/" + busItem.name)
      }
    }
  }
}
</script>
