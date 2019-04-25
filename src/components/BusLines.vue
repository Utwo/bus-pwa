<template>
  <div v-touch="{ left: () => this.$router.push('/favorite') }">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm3 md3>
          <v-checkbox
            v-model="selectedType"
            label="autobuze"
            name="autobuze"
            value="autobuze"
            color="cyan"
          >
            <v-icon />
            autobuze
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox
            v-model="selectedType"
            label="troleibuze"
            name="troleibuze"
            value="troleibuze"
            color="pink"
          >
            troleibuze
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox
            v-model="selectedType"
            label="tramvaie"
            name="tramvaie"
            value="tramvaie"
            color="deep-purple"
          >
            tramvaie
          </v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-checkbox
            v-model="selectedType"
            label="microbuze"
            name="microbuze"
            value="microbuze"
            color="orange"
          >
            microbuze
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
    <LinesList v-if="!isLoading" :selected-type="selectedType" :buses="buses" />
    <BaseLoading v-if="isLoading" />
  </div>
</template>

<script>
import LinesList from "./LinesList"
import LineService from "../services/LineService"
import BaseLoading from "./shared/BaseLoading"

export default {
  components: {
    LinesList,
    BaseLoading
  },
  data() {
    return {
      selectedType: [],
      isLoading: true,
      buses: []
    }
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
