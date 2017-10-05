<template>
  <div id="app">
  <TheNavigation></TheNavigation>
  <main>
      <router-view></router-view>
  </main>
  </div>
</template>

<script>
  import TheNavigation from './components/TheNavigation'
  export default {
    name: 'app',
    components: {
      'TheNavigation': TheNavigation
    }
  }
</script>
