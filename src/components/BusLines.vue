<template>
  <div v-touch="{ left: () => this.$router.push('/favorite') }">
    <v-container fluid>
      <v-row>
        <v-col cols="6" sm="3">
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
        </v-col>
        <v-col cols="6" sm="3">
          <v-checkbox
            v-model="selectedType"
            label="troleibuze"
            name="troleibuze"
            value="troleibuze"
            color="pink"
          >
            troleibuze
          </v-checkbox>
        </v-col>
        <v-col cols="6" sm="3">
          <v-checkbox
            v-model="selectedType"
            label="tramvaie"
            name="tramvaie"
            value="tramvaie"
            color="deep-purple"
          >
            tramvaie
          </v-checkbox>
        </v-col>
        <v-col cols="6" sm="3">
          <v-checkbox
            v-model="selectedType"
            label="microbuze"
            name="microbuze"
            value="microbuze"
            color="orange"
          >
            microbuze
          </v-checkbox>
        </v-col>
      </v-row>
    </v-container>
    <LinesList v-if="!isLoading" :selected-type="selectedType" :buses="buses" />
    <BaseLoading v-if="isLoading" />
  </div>
</template>

<script>
import LinesList from "./LinesList";
import LineService from "../services/LineService";
import BaseLoading from "./shared/BaseLoading";

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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.buses = await LineService.getBuses();
      this.isLoading = false;
    }
  }
};
</script>
