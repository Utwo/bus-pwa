<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="autobuze" name="autobuze" v-model="selectedType" value="autobuze" color="cyan">autobuze</v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="troleibuze" name="troleibuze" v-model="selectedType" value="troleibuze" color="pink">troleibuze</v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="tramvaie" name="tramvaie" v-model="selectedType" value="tramvaie" color="deep-purple">tramvaie</v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="microbuze" name="microbuze" v-model="selectedType" value="microbuze" color="orange">microbuze</v-checkbox>
        </v-flex>
      </v-layout>
      <v-text-field  solo
                     prepend-icon="search"
                     placeholder="Search" name="filter" type="number" v-model.trim="filterTerm"></v-text-field>
    </v-container>
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
