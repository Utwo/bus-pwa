<template>
  <div
    v-touch="{left: () => this.$router.push('/favorite')}"
  >
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="autobuze" name="autobuze" v-model="selectedType" value="autobuze" color="cyan">
            <v-icon></v-icon>
            autobuze
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="troleibuze" name="troleibuze" v-model="selectedType" value="troleibuze" color="pink">
            troleibuze
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="tramvaie" name="tramvaie" v-model="selectedType" value="tramvaie" color="deep-purple">
            tramvaie
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox label="microbuze" name="microbuze" v-model="selectedType" value="microbuze" color="orange">
            microbuze
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
    <LinesList :selectedType="selectedType" :buses="buses" v-if="!isLoading"></LinesList>
    <BaseLoading v-if="isLoading"/>
  </div>
</template>

<script>
import LinesList from "./LinesList"
import LineService from "../services/LineService"
import BaseLoading from "./shared/BaseLoading"

export default {
  data() {
    return {
      selectedType: [],
      isLoading: true,
      buses: []
    }
  },
  components: {
    LinesList,
    BaseLoading
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.buses = await LineService.getBuses()
      this.isLoading = false
    }
  }
}
</script>
