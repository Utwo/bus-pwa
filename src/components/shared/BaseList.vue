<template>
  <v-list two-line subheader v-if="list.length > 0" :key="'List'">
      <slot v-for="item in list" v-bind="item"></slot>
  </v-list>
  <p v-else :key="'NoData'">No data</p>
</template>

<script>
  export default {
    name: 'BaseList',
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }
</script>
