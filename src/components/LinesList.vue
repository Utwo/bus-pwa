<template>
    <transition name="fade">
      <BaseList :list="filteredBuses">
        <BaseListItem slot-scope="bus" :key="bus.name" :title="bus.name" :route="bus.route"
                      :transportationType="bus.type" :zone="bus.lineType"></BaseListItem>
      </BaseList>
    </transition>
</template>

<script>
  import BaseList from './shared/BaseList'
  import BaseListItem from './shared/BaseListItem'

  export default {
    props: {
      selectedType: {
        type: Array,
        required: false
      },
      buses: {
        type: Array,
        required: true
      }
    },
    components: {
      BaseList, BaseListItem
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
    }
  }
</script>
