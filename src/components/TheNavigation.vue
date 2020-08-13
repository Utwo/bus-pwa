<template>
  <v-app-bar app dark :absolute="true" color="green lighten-2">
    <v-toolbar-title class="title mr-4">
      Cluj BUS
    </v-toolbar-title>
    <v-autocomplete
      clearable
      hide-details
      hide-selected
      :items="busLines"
      :search-input.sync="search"
      :class="{
        'hide-search--mobile': !hideIconSearch,
        'search-expand': hideIconSearch
      }"
      solo
      flat
      prepend-inner-icon="search"
      placeholder="Search"
      label="Search"
      class="px-2"
      background-color="green lighten-1"
      item-text="name"
      cache-items
      return-object
      tabindex="1"
      single-line
      hide-no-data
      @change="redirectTo"
    />
    <v-spacer></v-spacer>
    <v-btn
      :class="{ 'hide-search': hideIconSearch }"
      icon
      aria-label="search"
      class="search-icon--mobile"
      @click="hideIconSearch = !hideIconSearch"
    >
      <v-icon>search</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" aria-label="more options" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list class="white">
        <v-list-item>
          <v-list-item-title>
            <router-link :to="'/about'">About</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <span itemprop="telephone"><a href="sms:7479">Buy ticket</a></span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-slot:extension>
      <v-tabs
        icons-and-text
        centered
        grow
        dark
        color="white"
        slider-color="cyan"
      >
        <v-tab to="/" router>
          <span>Lines</span>
          <v-icon>directions_bus</v-icon>
        </v-tab>
        <v-tab to="/favorite" router>
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import LineService from "../services/LineService";

export default {
  data() {
    return {
      hideIconSearch: false,
      busLines: [],
      search: null
    };
  },
  watch: {
    async search() {
      // Items have already been loaded
      if (this.busLines.length > 0) return;

      this.busLines = await LineService.getBuses();
    }
  },
  methods: {
    redirectTo(busItem) {
      this.hideIconSearch = false;
      if (busItem.name) {
        this.$router.push("/bus/" + busItem.name);
      }
    }
  }
};
</script>
