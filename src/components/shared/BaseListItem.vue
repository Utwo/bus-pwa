<template>
  <md-list-item>
    <router-link :to="'bus/' + title" :class="typeStyleClass(transportationType)">
      <div class="md-list-text-container">
        <span>{{ title }}</span>
        <span>{{ route }}</span>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon>directions_transit</md-icon>
      </md-button>
      <md-divider class="md-inset"></md-divider>
    </router-link>
  </md-list-item>
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
          'tramvaie': transportationType === 'tramvaie',
          'autobuze': transportationType === 'autobuze',
          'microbuze': transportationType === 'microbuze',
          'troleibuze': transportationType === 'troleibuze'
        }
      }
    }
  }
</script>
