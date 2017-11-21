<template>
  <v-list two-line subheader v-if="list.length > 0">
    <template v-for="item in list">
      <slot v-bind="item"></slot>
      <v-divider></v-divider>
    </template>
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
