<template>
  <v-container
    fluid
    grid-list-lg
    v-touch="{right: () => this.$router.push('/')}"
  >
    <v-layout
      row wrap
      v-if="!isLoading"
    >
      <v-flex xs12
              v-for="bus in favoriteBuses"
              v-if="favoriteBuses.length !== 0"
              :key="bus.name" :to="'bus/' + bus.name">
        <favorite-item :bus="bus"></favorite-item>
      </v-flex>
      <v-flex xs12 v-if="favoriteBuses.length === 0" class="text-xs-center py-4">
        <h4 class="grey--text text--lighten-1">No favorites</h4>
        <p>For adding to favorites, press <v-icon color="pink">favorite</v-icon> icon on bus information page</p>
      </v-flex>
    </v-layout>
    <BaseLoading v-if="isLoading" />
  </v-container>
</template>

<script>
  import LineService from '../services/LineService.js'
  import BaseLoading from './shared/BaseLoading'
  import FavoriteItem from './FavoriteItem'
  import VCardMedia from 'vuetify/src/components/VCard/VCardMedia'

  export default {
    data () {
      return {
        favoriteBuses: [],
        isLoading: true
      }
    },
    components: {
      VCardMedia,
      BaseLoading,
      FavoriteItem
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.favoriteBuses = await LineService.getFavorites()
        this.isLoading = false
      }
    }
  }
</script>
