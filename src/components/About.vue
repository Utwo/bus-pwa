<template>
  <v-container fluid>
    <h4 class="grey--text text--lighten-1">About</h4>
    <p>A simple bus schedule pwa app made in Vue.</p>
    <p>This app lets you to:</p>
    <ul>
      <li>find schedule and route information about buses in Cluj-Napoca</li>
      <li>add bus lines to favorites</li>
      <li>use the app offline</li>
    </ul>
    <br>
    <p>This project make use of <a href="https://github.com/Utwo/ctpcj-scrapper">CTP CJ Scrapper</a>,
      a great node utility that scrap <a href="http://ctpcj.ro">ctp website</a> and
      save bus lines and route information to json file.</p>
    <p>Bus Cluj is an open source project hosted on <a href="https://github.com/Utwo/bus-pwa">github</a>, feedback and contributions are always welcome and appreciated.</p>
    <v-divider class="my-4"></v-divider>
    <div class="text-xs-center">
      <img src="../assets/bus.svg" alt="bus icon"/>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'About'
  }
</script>
