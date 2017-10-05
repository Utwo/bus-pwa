<template>
  <div>
    <div>
     <!-- <md-checkbox title="tramvaie" name="tramvaie" v-model="selectedType" md-value="tramvaie" class="md-primary">tramvaie</md-checkbox>
      <md-checkbox title="autobuze" name="autobuze" v-model="selectedType" md-value="autobuze" class="md-primary">autobuze</md-checkbox>
      <md-checkbox title="microbuze" name="microbuze" v-model="selectedType" md-value="microbuze" class="md-primary">microbuze</md-checkbox>
      <md-checkbox title="troleibuze" name="troleibuze" v-model="selectedType" md-value="troleibuze" class="md-primary">troleibuze</md-checkbox>-->
    </div>
    <md-input-container>
      <md-icon>search</md-icon>
      <md-input name="filter" type="tel" v-model.trim="filterTerm"></md-input>
    </md-input-container>
    <h2>Linii</h2>
    <BaseList :list="filteredBuses">
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
    name: 'BusLines',
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
