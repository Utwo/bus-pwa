<template functional>
  <transition name="fade">
    <div class="pa-5">
      <h2 class="grey--text">About</h2>
      <p>A simple bus schedule pwa app made in Vue.</p>
      <p>This app lets you to:</p>
      <ul>
        <li>find schedule and route information about buses in Cluj-Napoca</li>
        <li>add bus lines to favorites</li>
        <li>use the app offline</li>
      </ul>
      <br />
      <p>
        This project make use of
        <a href="https://github.com/Utwo/ctpcj-scrapper">CTP CJ Scrapper</a>, a
        great node utility that scrap
        <a href="http://ctpcj.ro">ctp website</a> and save bus lines and route
        information to json file.
      </p>
      <p>
        Bus Cluj is an open source project hosted on
        <a href="https://github.com/Utwo/bus-pwa">github</a>, feedback and
        contributions are always welcome and appreciated.
      </p>
      <v-divider class="my-4" />
      <div class="text-center">
        <img class="bus-icon" src="../../public/bus.svg" alt="bus icon" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.bus-icon {
  transition: 0.8s all ease-out 0.6s;
}

.fade-enter .bus-icon {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-leave-active {
  transition-duration: 0s;
}
</style>
