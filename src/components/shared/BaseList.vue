<template>
  <v-list v-if="list.length > 0" two-line subheader>
    <template v-for="item in list">
      <slot v-bind="item"/>
      <v-divider :key="item.title"/>
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
