<template>
  <v-container
    v-touch="{right: () => this.$router.push('/')}"
    fluid
    grid-list-lg
  >
    <transition name="fade">
      <v-layout
        v-if="!isLoading" row
        wrap
      >
        <v-flex v-for="bus in favoriteBuses"
                v-if="favoriteBuses.length !== 0"
                :key="bus.name"
                :to="'bus/' + bus.name" xs12>
          <favorite-item :bus="bus" :now="now"/>
        </v-flex>
        <v-flex v-if="favoriteBuses.length === 0" xs12 class="text-xs-center py-4">
          <h4 class="grey--text text--lighten-1">No favorites</h4>
          <p>For adding to favorites, press
            <v-icon color="pink">favorite</v-icon>
            icon on bus information page
          </p>
        </v-flex>
      </v-layout>
    </transition>
    <BaseLoading v-if="isLoading"/>
  </v-container>
</template>

<script>
import LineService from "../services/LineService.js"
import BaseLoading from "./shared/BaseLoading"
import FavoriteItem from "./FavoriteItem"
import VCardMedia from "vuetify/src/components/VCard/VCardMedia"

export default {
  components: {
    VCardMedia,
    BaseLoading,
    FavoriteItem
  },
  data() {
    return {
      favoriteBuses: [],
      isLoading: true,
      timer: null,
      now: Date.now()
    }
  },
  created() {
    this.fetchData()
    this.timer = setInterval(() => {
      this.now = Date.now()
    }, 6000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async fetchData() {
      this.favoriteBuses = await LineService.getFavorites()
      this.isLoading = false
    }
  }
}
</script>
