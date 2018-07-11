<template>
  <v-card :to="'/bus/' + busWithStop.name" class="black--text">
    <v-card-title>
      <h2 class="headline avatar mb-0">
        <v-icon :class="transportationStyle" class="pa-1 mr-2 white--text">{{transportationIcon}}</v-icon>
        {{ busWithStop.name }}
      </h2>
    </v-card-title>
    <v-card-actions>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs6>
          <div v-if="busWithStop.next_in_stop">
            <h4>{{ busWithStop.in_stop_name }}</h4>
            {{ busWithStop.next_in_stop.currentDateTime }} <span class="grey--text text--lighten-1"> # </span>
            <v-chip class="cyan lighten-4">
              {{ busWithStop.next_in_stop.formatTime }} - {{ busWithStop.next_in_stop.remainingTime }}
            </v-chip>
            <v-progress-linear v-model="busWithStop.next_in_stop.progress"></v-progress-linear>
          </div>
        </v-flex>
        <v-flex xs6>
          <div v-if="busWithStop.next_out_stop">
            <h4>{{ busWithStop.out_stop_name }}</h4>
            {{ busWithStop.next_out_stop.currentDateTime }} <span class="grey--text text--lighten-1"> # </span>
            <v-chip color="red lighten-4">
              {{ busWithStop.next_out_stop.formatTime }} - {{ busWithStop.next_out_stop.remainingTime }}
            </v-chip>
            <v-progress-linear v-model="busWithStop.next_out_stop.progress"></v-progress-linear>
          </div>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import commonFunctions from "../services/CommonFunctions.js"

export default {
  props: {
    bus: {
      type: Object,
      required: true
    },
    now: Number
  },
  computed: {
    busWithStop() {
      console.debug(this.now) // keep this to force computed update
      const todayAbbreviation = commonFunctions.getDayAbbreviation()
      if (this.bus.station[todayAbbreviation]) {
        const { in_stop_name, out_stop_name } = this.bus.station[
          todayAbbreviation
        ]
        const todayHourList = commonFunctions.getTodayHourList(this.bus)
        const nextStation = commonFunctions.calculateNextStationTime(
          todayHourList
        )
        return Object.assign(this.bus, nextStation, {
          in_stop_name,
          out_stop_name
        })
      }
      return this.bus
    },
    transportationStyle() {
      return {
        "deep-purple": this.bus.type === "tramvaie",
        cyan: this.bus.type === "autobuze",
        orange: this.bus.type === "microbuze",
        pink: this.bus.type === "troleibuze"
      }
    },
    transportationIcon() {
      const icon = {
        tramvaie: "tram",
        autobuze: "directions_bus",
        microbuze: "local_shipping",
        troleibuze: "directions_transit"
      }
      return icon[this.bus.type]
    }
  }
}
</script>
