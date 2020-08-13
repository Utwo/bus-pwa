<template>
  <router-link :to="'bus/' + title">
    <v-list-item :key="title">
      <v-list-item-avatar>
        <v-icon :class="transportationStyle" class="white--text">{{
          transportationIcon
        }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
        <v-list-item-subtitle class="grey--text text--darken-2">{{
          route
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon ripple :aria-label="title">
          <v-icon class="grey--text text--lighten-1">info</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </router-link>
</template>

<script>
import IconMixin from "../../mixins/IconMixin";
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
};
</script>
