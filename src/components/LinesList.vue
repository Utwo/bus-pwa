<template>
  <transition name="fade">
    <BaseList :list="filteredBuses">
      <BaseListItem
        :key="bus.name"
        :title="bus.name"
        :route="bus.route"
        :transportation-type="bus.type"
        :zone="bus.lineType"
        slot-scope="bus"
      />
    </BaseList>
  </transition>
</template>

<script>
import BaseList from "./shared/BaseList";
import BaseListItem from "./shared/BaseListItem";

export default {
  components: {
    BaseList,
    BaseListItem
  },
  props: {
    selectedType: {
      default: "",
      type: String,
      required: false
    },
    buses: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredBuses() {
      if (this.selectedType.length > 0) {
        return this.buses.filter(item => this.selectedType === item.type);
      }
      return this.buses;
    }
  }
};
</script>
