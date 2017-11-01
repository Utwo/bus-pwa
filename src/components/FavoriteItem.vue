<template>
  <v-card :to="'/bus/' + busWithStop.name" class="black--text">
    <v-card-title>
      <h2 class="headline avatar mb-0">
        <v-icon :class="typeStyleClass(busWithStop.type)" class="pa-1 mr-2 white--text">directions_transit</v-icon>
        {{ busWithStop.name }}
      </h2>
    </v-card-title>
    <v-card-actions>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs6>
          <p v-if="busWithStop.next_in_stop">
            {{ busWithStop.in_stop_name }} <br>
            {{ busWithStop.next_in_stop.hour}} # <v-chip class="cyan lighten-4">{{ busWithStop.next_in_stop.remainingMin }}</v-chip>
            <v-progress-linear v-model="busWithStop.progress_in_stop"></v-progress-linear>
          </p>
        </v-flex>
        <v-flex xs6>
          <p v-if="busWithStop.next_out_stop">
            {{ busWithStop.out_stop_name }} <br>
            {{ busWithStop.next_out_stop.hour }} # <v-chip color="red lighten-4">{{ busWithStop.next_out_stop.remainingMin }}</v-chip>
            <v-progress-linear v-model="busWithStop.progress_out_stop"></v-progress-linear>
          </p>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
  import commonFunctions from '../services/CommonFunctions.js'

  export default {
    props: {
      bus: {
        type: Object,
        required: true
      }
    },
    computed: {
      busWithStop () {
        const todayAbbreviation = commonFunctions.getDayAbbreviation()
        if (this.bus.station[todayAbbreviation]) {
          const {in_stop_name, out_stop_name} = this.bus.station[todayAbbreviation]
          const todayHourList = commonFunctions.getTodayHourList(this.bus)
          const busWithStop = Object.assign(this.bus, commonFunctions.calculateNextStationTime(todayHourList), {in_stop_name, out_stop_name})
          busWithStop.progress_out_stop = commonFunctions.calculateProgress(busWithStop.current_out_stop.hour, busWithStop.next_out_stop.hour)
          busWithStop.progress_in_stop = commonFunctions.calculateProgress(busWithStop.current_in_stop.hour, busWithStop.next_in_stop.hour)
          return busWithStop
        }
        return this.bus
      }
    },
    methods: {
      typeStyleClass (transportationType) {
        return {
          'deep-purple': transportationType === 'tramvaie',
          'cyan': transportationType === 'autobuze',
          'orange': transportationType === 'microbuze',
          'pink': transportationType === 'troleibuze'
        }
      }
    }
  }
</script>
