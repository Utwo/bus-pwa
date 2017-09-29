<template>
  <div>
    <div>
      <input title="tramvaie" type="checkbox" value="tramvaie" v-model="selectedType">tramvaie
      <input title="autobuze" type="checkbox" value="autobuze" v-model="selectedType">autobuze
      <input title="microbuze" type="checkbox" value="microbuze" v-model="selectedType">microbuze
      <input title="troleibuze" type="checkbox" value="troleibuze" v-model="selectedType">troleibuze
    </div>
    <label>Filter:
      <input name="filter" v-model.trim="filterTerm" />
    </label>
    <h2>Linii</h2>
    <ul v-if="filteredBuses.length > 0">
      <li v-for="bus in filteredBuses" :key="bus.name">
        <router-link :to="'bus/' + bus.name" :class="typeClass(bus)">
          <h3 class="md-title">{{ bus.name }}</h3>
          <p>{{ bus.route }}</p>
          <small class="md-title">{{ bus.linieType }}</small>
          <small class="md-subheading">{{ bus.type }}</small>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import LineService from '../services/LineService'
  export default {
    name: 'BusList',
    data () {
      return {
        buses: [],
        selectedType: [],
        filterTerm: null
      }
    },
    mounted () {
      this.fetchData()
    },
    computed: {
      filteredBuses () {
        let filtered = this.buses
        if (this.filterTerm) {
          filtered = filtered.filter(item => {
            if (item.name.indexOf(this.filterTerm) > -1) {
              return true
            }
          })
        }
        if (this.selectedType.length > 0) {
          filtered = filtered.filter(item => {
            if (this.selectedType.indexOf(item.type) > -1) {
              return true
            }
          })
        }
        return filtered
      }
    },
    methods: {
      typeClass (bus) {
        return {
          'md-primary': bus.type === 'tramvaie',
          'md-accent': bus.type === 'autobuze',
          'md-warn': bus.type === 'microbuze',
          'md-danger': bus.type === 'troleibuze'
        }
      },
      async fetchData () {
        this.buses = await LineService.getBusesBasic()
      }
    }
  }
</script>
