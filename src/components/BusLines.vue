<template>
  <div v-touch="{ left: () => this.$router.push('/favorite') }">
    <v-select
      :items="transportationType"
      v-model="selectedType"
      clearable
      full-width
      item-color="green"
      solo
      label="Filtreaza..."
    ></v-select>
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
      selectedType: "",
      isLoading: true,
      buses: [],
      transportationType: ["autobuze", "troleibuze", "tramvaie", "microbuze"]
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
