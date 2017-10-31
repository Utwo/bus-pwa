<template>
  <v-list two-line subheader v-if="list.length > 0" :key="'List'">
      <slot v-for="item in list" v-bind="item"></slot>
  </v-list>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }
</script>
