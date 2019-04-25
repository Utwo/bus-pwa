<template>
  <transition name="bus-info-transition">
    <div v-if="busItem && !isLoading">
      <v-toolbar card class="white" prominent>
        <v-toolbar-title class="grey--text text--darken-4 headline">
          {{ busItem.name }}
        </v-toolbar-title>
        <v-subheader class="grey--text"
          >{{ busItem.type }} / {{ busItem.route }}</v-subheader
        >
        <v-spacer />
        <v-btn
          :dark="!isFavorite"
          :outline="isFavorite"
          fab
          small
          class="favorite-btn"
          color="pink"
          @click="addToFavorite"
        >
          <v-icon>favorite</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="grey lighten-3" />
      <v-tabs v-model="current_key" grow class="white" @change="scrollTo">
        <v-tabs-slider class="yellow" />
        <v-tab v-if="busItem.station.lv" :href="'#tab-lv'">Luni-Vineri</v-tab>
        <v-tab v-if="busItem.station.s" :href="'#tab-s'">Sambata</v-tab>
        <v-tab v-if="busItem.station.d" :href="'#tab-d'">Duminica</v-tab>
        <v-tabs-items class="white">
          <v-tab-item v-if="busItem.station.lv" id="tab-lv">
            <BusTable
              :hour-list="busItem.station.lv.lines"
              :in-stop-name="busItem.station.lv.in_stop_name"
              :out-stop-name="busItem.station.lv.out_stop_name"
            />
          </v-tab-item>
          <v-tab-item v-if="busItem.station.s" id="tab-s">
            <BusTable
              :hour-list="busItem.station.s.lines"
              :in-stop-name="busItem.station.s.in_stop_name"
              :out-stop-name="busItem.station.s.out_stop_name"
            />
          </v-tab-item>
          <v-tab-item v-if="busItem.station.d" id="tab-d">
            <BusTable
              :hour-list="busItem.station.d.lines"
              :in-stop-name="busItem.station.d.in_stop_name"
              :out-stop-name="busItem.station.d.out_stop_name"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
    <BaseLoading v-if="isLoading" />
  </transition>
</template>

<script>
import LineService from "../services/LineService"
import CommonFunctions from "../services/CommonFunctions"
import BusTable from "./shared/BusTable"
import BaseLoading from "./shared/BaseLoading"

export default {
  components: {
    BusTable,
    BaseLoading
  },
  data() {
    return {
      busItem: null,
      isFavorite: false,
      isLoading: true,
      current_key: null,
      currentDayAbbreviation: CommonFunctions.getDayAbbreviation()
    }
  },
  watch: {
    busItem: function(newBusItem) {
      if (newBusItem.station[this.currentDayAbbreviation]) {
        this.current_key = `tab-${this.currentDayAbbreviation}`
      }
    }
  },
  async created() {
    await this.fetchData()
    this.isFavorite = LineService.isFavorite(this.$route.params.line)
    this.scrollTo()
  },
  async beforeRouteUpdate(to, from, next) {
    this.isLoading = true
    next()
    await this.fetchData()
    this.isFavorite = LineService.isFavorite(this.$route.params.line)
    this.scrollTo()
  },
  methods: {
    async fetchData() {
      this.busItem = await LineService.getLine(this.$route.params.line)
      if (!this.busItem) {
        this.$router.push("/not-found")
      }
      this.isLoading = false
    },
    addToFavorite() {
      LineService.addToFavorite(this.$route.params.line)
      this.isFavorite = !this.isFavorite
    },
    scrollTo() {
      this.$nextTick(function() {
        setTimeout(() => {
          const scrollHereElement = document
            .getElementById(this.current_key)
            .getElementsByClassName("scroll-here")[0]
          if (scrollHereElement) {
            scrollHereElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "start"
            })
          }
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.toolbar__title {
  overflow: visible;
}

.bus-info-transition-enter-active .toolbar,
.bus-info-transition-leave-active .toolbar {
  transition: 0.3s all ease-out;
}

.bus-info-transition-enter .toolbar,
.bus-info-transition-leave-to .toolbar {
  opacity: 0;
  transform: translateY(-20%);
}

.bus-info-transition-enter-active .favorite-btn,
.bus-info-transition-leave-active .favorite-btn {
  transition: 0.6s all ease-out 1.2s;
}

.bus-info-transition-enter .favorite-btn,
.bus-info-transition-leave-to .favorite-btn {
  transform: translateX(80px) rotate(180deg);
  opacity: 0;
}
</style>
