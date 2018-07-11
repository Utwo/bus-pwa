<template>
    <v-toolbar :class="{'hide-navigation': !showNavigation}" dark tabs class="navigation green lighten-2">
      <v-toolbar-side-icon @click="showNavigation = !showNavigation"/>
      <v-toolbar-title>Cluj BUS</v-toolbar-title>
      <div :class="{'hide-search--mobile': !hideIconSearch, 'search-expand': hideIconSearch}" class="search__wrap" @click="clickSelect">
      <v-select
        ref="search"
        :class="{'hide-search--mobile': !hideIconSearch, 'search-expand': hideIconSearch}"
        :items="busLines"
        solo
        prepend-icon="search"
        placeholder="Search"
        class="mx-5 green lighten-1 elevation-0 white--text"
        cache-items
        item-text="name"
        return-object
        tabindex="1"
        single-line
        autocomplete
        @change="redirectTo"
      />
      </div>
      <v-spacer/>
      <v-btn :class="{'hide-search': hideIconSearch}" icon class="search-icon--mobile" @click="hideIconSearch = !hideIconSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-menu :nudge-width="100" offset-y>
        <v-btn slot="activator" icon>
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
      <v-tabs slot="extension" icons-and-text dark centered grow color="grey lighten-4">
        <v-tabs-slider class="cyan"/>
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
      showNavigation: true,
      hideIconSearch: false,
      busLines: []
    }
  },
  methods: {
    async clickSelect() {
      if (this.busLines.length === 0) {
        this.busLines = await LineService.getBuses()
      }
    },
    redirectTo(busItem) {
      this.hideIconSearch = false
      if (busItem.name) {
        this.$router.push("/bus/" + busItem.name)
      }
    }
  }
}
</script>
