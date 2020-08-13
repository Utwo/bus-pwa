<template>
  <transition name="fade">
    <BaseList :list="filteredBuses">
      <BaseListItem
        :key="bus.name"
        slot-scope="bus"
        :title="bus.name"
        :route="bus.route"
        :transportation-type="bus.type"
        :zone="bus.lineType"
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
      default: () => [],
      type: Array,
      required: false
    },
    buses: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredBuses() {
      let filtered = this.buses;
      if (this.selectedType.length > 0) {
        filtered = filtered.filter(item => {
          if (this.selectedType.indexOf(item.type) > -1) {
            return true;
          }
        });
      }
      return filtered;
    }
  }
};
</script>
