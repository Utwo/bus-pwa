<template>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Bus PWA</h2>

      <span style="flex: 1"></span>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>view_module</md-icon>
      </md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Bus PWA</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>directions_bus</md-icon>
          <span><router-link :to="'/'">Lines</router-link></span>
        </md-list-item>

        <md-list-item>
          <md-icon>favorite</md-icon>
          <span><router-link :to="'/favorite'">Favorites</router-link></span>
        </md-list-item>

        <md-list-item>
          <md-icon>favorite</md-icon>
          <span><router-link :to="'/about'">About</router-link></span>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
  export default {
    name: 'TheNavigation',
    methods: {
      toggleLeftSidenav () {
        this.$refs.leftSidenav.toggle()
      }
    }
  }
</script>
