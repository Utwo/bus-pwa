<template>
  <div id="app">
    <header>
      <h1>BUS PWA</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/bus/1">Bus line</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  padding: .2rem;
  background: #35495E;
  color: #fff;
  text-align: center;
  font-size: .7rem;
}

header a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 5px;
  padding: .4rem .6rem;
  background: cyan;
  display: inline-block;
}
</style>
