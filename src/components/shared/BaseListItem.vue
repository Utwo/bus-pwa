<template>
  <div>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon :class="typeStyleClass(transportationType)" class="white--text">directions_transit</v-icon>
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
  <v-divider class="grey lighten-2"></v-divider>
</div>
</template>

<script>
  export default {
    name: 'BaseListItem',
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
    },
    methods: {
      typeStyleClass (transportationType) {
        return {
          'deep-purple': transportationType === 'tramvaie',
          'cyan': transportationType === 'autobuze',
          'orange': transportationType === 'microbuze',
          'pink': transportationType === 'troleibuze'
        }
      }
    }
  }
</script>
