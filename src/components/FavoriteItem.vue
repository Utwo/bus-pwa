<template>
  <v-card :to="'/bus/' + busWithStop.name">
    <v-card-title class="pb-0">
      <h2 class="headline mb-0">
        <v-avatar size="38">
          <v-icon dark :class="transportationStyle">{{
            transportationIcon
          }}</v-icon>
        </v-avatar>
        {{ busWithStop.name }}
      </h2>
    </v-card-title>
    <v-card-actions>
      <v-container class="text-center">
        <v-row>
          <v-col cols="6">
            <div v-if="busWithStop.next_in_stop">
              <h3 class="font-weight-regular  ">
                {{ busWithStop.in_stop_name }}
              </h3>
              {{ busWithStop.next_in_stop.currentDateTime }}
              <span class="grey--text text--lighten-1"> # </span>
              <v-chip class="cyan lighten-4 ">
                {{ busWithStop.next_in_stop.formatTime }} -
                {{ busWithStop.next_in_stop.remainingTime }}
              </v-chip>
              <v-progress-linear
                class="mt-5"
                background-color="green lighten-4"
                color="green"
                height="8"
                rounded
                v-model="busWithStop.next_in_stop.progress"
              />
            </div>
          </v-col>
          <v-col cols="6">
            <div v-if="busWithStop.next_out_stop">
              <h3 class="font-weight-regular">
                {{ busWithStop.out_stop_name }}
              </h3>
              {{ busWithStop.next_out_stop.currentDateTime }}
              <span class="grey--text text--lighten-1"> # </span>
              <v-chip color="red lighten-4">
                {{ busWithStop.next_out_stop.formatTime }} -
                {{ busWithStop.next_out_stop.remainingTime }}
              </v-chip>
              <v-progress-linear
                class="mt-5"
                background-color="green lighten-4"
                color="green"
                height="8"
                rounded
                v-model="busWithStop.next_out_stop.progress"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import commonFunctions from "../services/CommonFunctions.js";

export default {
  props: {
    bus: {
      type: Object,
      required: true
    },
    now: {
      default: Date.now(),
      type: Number
    }
  },
  computed: {
    busWithStop() {
      console.debug(this.now); // keep this to force computed update
      const todayAbbreviation = commonFunctions.getDayAbbreviation();
      if (this.bus.station[todayAbbreviation]) {
        const { in_stop_name, out_stop_name } = this.bus.station[
          todayAbbreviation
        ];
        const todayHourList = commonFunctions.getTodayHourList(this.bus);
        const nextStation = commonFunctions.calculateNextStationTime(
          todayHourList
        );
        return Object.assign(this.bus, nextStation, {
          in_stop_name,
          out_stop_name
        });
      }
      return this.bus;
    },
    transportationStyle() {
      return {
        "deep-purple": this.bus.type === "tramvaie",
        cyan: this.bus.type === "autobuze",
        orange: this.bus.type === "microbuze",
        pink: this.bus.type === "troleibuze"
      };
    },
    transportationIcon() {
      const icon = {
        tramvaie: "tram",
        autobuze: "directions_bus",
        microbuze: "local_shipping",
        troleibuze: "directions_transit"
      };
      return icon[this.bus.type];
    }
  }
};
</script>
