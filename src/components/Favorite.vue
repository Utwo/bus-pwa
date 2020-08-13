<template>
  <v-container v-touch="{ right: () => this.$router.push('/') }">
    <transition name="fade">
      <v-row v-if="!isLoading && favoriteBuses.length">
        <v-col
          v-for="bus in favoriteBuses"
          :key="bus.name"
          :to="'bus/' + bus.name"
          cols="12"
        >
          <favorite-item :bus="bus" :now="now" />
        </v-col>
      </v-row>
      <v-row v-if="!isLoading && favoriteBuses.length === 0">
        <v-col
          v-if="favoriteBuses.length === 0"
          cols="12"
          class="text-center py-6"
        >
          <h4 class="grey--text text--lighten-1">No favorites</h4>
          <p>
            For adding to favorites, press
            <v-icon color="pink">favorite</v-icon>icon on bus information page
          </p>
        </v-col>
      </v-row>
    </transition>
    <BaseLoading v-if="isLoading" />
  </v-container>
</template>

<script>
import LineService from "../services/LineService.js";
import BaseLoading from "./shared/BaseLoading";
import FavoriteItem from "./FavoriteItem";

export default {
  components: {
    BaseLoading,
    FavoriteItem
  },
  data() {
    return {
      favoriteBuses: [],
      isLoading: true,
      timer: null,
      now: Date.now()
    };
  },
  created() {
    this.fetchData();
    this.timer = setInterval(() => {
      this.now = Date.now();
    }, 6000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async fetchData() {
      this.favoriteBuses = await LineService.getFavorites();
      this.isLoading = false;
    }
  }
};
</script>
