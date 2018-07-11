<template>
  <v-list-tile :key="title" avatar>
    <v-list-tile-avatar>
      <v-icon :class="transportationStyle" class="white--text">{{transportationIcon}}</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <router-link :to="'bus/' + title">
        <v-list-tile-title>{{ title }}</v-list-tile-title>
        <v-list-tile-sub-title class='grey--text text--darken-2'>{{ route }}</v-list-tile-sub-title>
      </router-link>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple>
        <v-icon class="grey--text text--lighten-1">info</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import IconMixin from "../../mixins/IconMixin"

export default {
  mixins: [IconMixin],
  props: {
    title: {
      type: String,
      required: true
    },
    transportationType: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    zone: {
      type: String,
      required: true
    }
  }
}
</script>
