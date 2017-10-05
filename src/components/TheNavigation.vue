<template>
  <header>
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h1 class="md-title">Bus PWA</h1>

      <router-link :to="'/'">Linii</router-link>
      <router-link :to="'/favorite'"><md-icon>favorite</md-icon></router-link>
    </md-toolbar>
  </header>
</template>

<script>
  export default {
    name: 'TheNavigation'
  }
</script>
