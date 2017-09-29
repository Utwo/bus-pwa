<template>
  <div id="app">
  <navigation></navigation>
  <main>
      <router-view></router-view>
  </main>
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue'
  export default {
    name: 'app',
    components: {
      'navigation': Navigation
    }
  }
</script>
