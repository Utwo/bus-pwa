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
    <BaseList :list="buses">
      <template scope="bus">
        <BaseListItem :title="bus.name" :route="bus.route" :transportationType="bus.type" :zone="bus.linieType"></BaseListItem>
      </template>
    </BaseList>
  </div>
</template>

<script>
  import LineService from '../services/LineService'
  import BaseList from './shared/BaseList'
  import BaseListItem from './shared/BaseListItem'
  export default {
    name: 'BusList',
    data () {
      return {
        buses: [],
        selectedType: [],
        filterTerm: null
      }
    },
    components: {
      BaseList, BaseListItem
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
      async fetchData () {
        this.buses = await LineService.getBusesBasic()
      }
    }
  }
</script>
