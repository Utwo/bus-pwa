<template>
  <v-app id="app">
    <TheNavigation />
    <main>
      <v-card>
        <router-view />
      </v-card>
    </main>
  </v-app>
</template>

<script>
import TheNavigation from "./components/TheNavigation";

export default {
  components: {
    TheNavigation
  }
};
</script>
