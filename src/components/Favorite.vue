<template>
  <div>
    <h2>Favorite</h2>
    <ul v-if="favoriteBusesWithStop.length !== 0">
      <li v-for="bus in favoriteBusesWithStop" :key="bus.name">
        <router-link :to="'bus/' + bus.name" :class="typeClass(bus)">
          <h3 class="md-title">{{ bus.name }}</h3>
          <p>{{ bus.route }}</p>
          <small class="md-subheading">{{ bus.type }}</small>
          <p v-if="bus.next_in_stop">{{ bus.next_in_stop.name }} : {{ bus.next_in_stop.hour }} in aprox {{ bus.next_in_stop.remainingMin }}</p>
          <p v-if="bus.next_out_stop">{{ bus.next_out_stop.name }} : {{ bus.next_out_stop.hour }} in aprox {{ bus.next_out_stop.remainingMin }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import LineService from '../services/LineService'
  import commonFunctions from '../services/CommonFunctions'

  export default {
    name: 'Favorite',
    data () {
      return {
        favoriteBuses: []
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      favoriteBusesWithStop () {
        if (this.favoriteBuses.length !== 0) {
          this.favoriteBuses.map(favorite => {
            Object.assign(favorite, commonFunctions.calculateNextStationTime(favorite))
          })
        }
        return this.favoriteBuses
      }
    },
    methods: {
      typeClass (bus) {
        return {
          'md-primary': bus.type === 'tramvaie',
          'md-accent': bus.type === 'autobuze',
          'md-warn': bus.type === 'microbuze'
        }
      },
      async fetchData () {
        this.favoriteBuses = await LineService.getFavorites()
      }
    }
  }
</script>
