<template>
  <v-container
    fluid
    grid-list-lg
    v-touch="{right: () => this.$router.push('/')}"
  >
    <v-layout
      row wrap
      v-if="!isLoading"
    >
      <v-flex xs12
              v-for="bus in favoriteBusesWithStop"
              v-if="favoriteBusesWithStop.length !== 0"
              :key="bus.name" :to="'bus/' + bus.name">
        <v-card :to="'/bus/' + bus.name" class="black--text">
          <v-card-title>
            <div>
              <h2 class="headline avatar">
                <v-icon :class="typeStyleClass(bus.type)" class="pa-1 mr-2 white--text">directions_transit</v-icon>
                {{ bus.name }}
              </h2>
              <p v-if="bus.next_in_stop">{{ bus.in_stop_name
                }} : {{ bus.next_in_stop.hour
                }} in aprox
                <v-chip class="primary white--text">{{ bus.next_in_stop.remainingMin }}</v-chip>
              </p>
              <p v-if="bus.next_out_stop">{{ bus.out_stop_name
                }} : {{ bus.next_out_stop.hour
                }} in aprox
                <v-chip class="secondary white--text">{{ bus.next_out_stop.remainingMin }}</v-chip>
              </p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 v-if="favoriteBusesWithStop.length === 0" class="text-xs-center py-4">
        <h4 class="grey--text text--lighten-1">No favorites</h4>
        <p>For adding to favorites, press <v-icon color="pink">favorite</v-icon> icon on bus information page</p>
      </v-flex>
    </v-layout>
    <BaseLoading v-if="isLoading" />
  </v-container>
</template>

<script>
  import LineService from '../services/LineService.js'
  import commonFunctions from '../services/CommonFunctions.js'
  import BaseLoading from './shared/BaseLoading'

  export default {
    data () {
      return {
        favoriteBuses: [],
        isLoading: true
      }
    },
    components: {
      BaseLoading
    },
    created () {
      this.fetchData()
    },
    computed: {
      favoriteBusesWithStop () {
        if (this.favoriteBuses.length !== 0) {
          const todayAbbreviation = commonFunctions.getDayAbbreviation()
          this.favoriteBuses.map(favoriteBusName => {
            if (favoriteBusName.station[todayAbbreviation]) {
              const todayHourList = commonFunctions.getTodayHourList(favoriteBusName)
              const {in_stop_name, out_stop_name} = favoriteBusName.station[todayAbbreviation]
              Object.assign(favoriteBusName, commonFunctions.calculateNextStationTime(todayHourList), {in_stop_name, out_stop_name})
            }
          })
        }
        return this.favoriteBuses
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
      },
      async fetchData () {
        this.favoriteBuses = await LineService.getFavorites()
        this.isLoading = false
      }
    }
  }
</script>
