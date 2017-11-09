<template>
  <div
    v-touch="{left: () => this.$router.push('/favorite')}"
  >
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="autobuze" name="autobuze" v-model="selectedType" value="autobuze" color="cyan"><v-icon></v-icon>autobuze</v-checkbox>
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
    </v-container>
    <div>
      <BaseList :list="filteredBuses" v-if="!isLoading">
        <BaseListItem slot-scope="bus" :title="bus.name" :route="bus.route" :transportationType="bus.type" :zone="bus.lineType"></BaseListItem>
      </BaseList>
      <BaseLoading v-if="isLoading" />
    </div>
  </div>
</template>

<script>
  import LineService from '../services/LineService'
  import BaseList from './shared/BaseList'
  import BaseListItem from './shared/BaseListItem'
  import BaseLoading from './shared/BaseLoading'

  export default {
    data () {
      return {
        buses: [],
        selectedType: [],
        isLoading: true
      }
    },
    components: {
      BaseList, BaseListItem, BaseLoading
    },
    created () {
      this.fetchData()
    },
    computed: {
      filteredBuses () {
        let filtered = this.buses
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
        this.isLoading = false
      }
    }
  }
</script>
