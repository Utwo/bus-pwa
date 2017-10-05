<template>
  <li>
    <router-link :to="'bus/' + title" :class="typeStyleClass(transportationType)">
      <h3 class="md-title">{{ title }}</h3>
      <p>{{ route }}</p>
      <small class="md-title">{{ zone }}</small>
      <small class="md-subheading">{{ transportationType }}</small>
    </router-link>
  </li>
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
          'md-primary': transportationType === 'tramvaie',
          'md-accent': transportationType === 'autobuze',
          'md-warn': transportationType === 'microbuze',
          'md-danger': transportationType === 'troleibuze'
        }
      }
    }
  }
</script>
