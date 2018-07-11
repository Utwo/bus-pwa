<template>
  <v-app id="app">
    <TheNavigation></TheNavigation>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import TheNavigation from "./components/TheNavigation"

export default {
  components: {
    TheNavigation
  }
}
</script>
