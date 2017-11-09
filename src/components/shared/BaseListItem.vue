<template>
  <div>
    <v-list-tile avatar>
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
    <v-divider class="grey lighten-2"></v-divider>
  </div>
</template>

<script>
  export default {
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
    computed: {
      transportationStyle () {
        return {
          'deep-purple': this.transportationType === 'tramvaie',
          'cyan': this.transportationType === 'autobuze',
          'orange': this.transportationType === 'microbuze',
          'pink': this.transportationType === 'troleibuze'
        }
      },
      transportationIcon () {
        const icon = {
          'tramvaie': 'tram',
          'autobuze': 'directions_bus',
          'microbuze': 'local_shipping',
          'troleibuze': 'directions_transit'
        }
        return icon[this.transportationType]
      }
    }
  }
</script>
