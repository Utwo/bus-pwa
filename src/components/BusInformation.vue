<template>
  <div v-if="busItem">
    <md-button @click="addToFavorite">
      <md-icon>favorite</md-icon>
    </md-button>
    <h1>{{ busItem.name }}</h1>
    <h3>{{ busItem.type }}</h3>
    <span>{{ busItem.route }}</span>
    <div>
      <md-tabs md-fixed md-centered>
        <md-tab id="luni-vineri" md-label="Luni-Vineri" v-if="busItem.statii.lv">
          <md-list>
            <md-list-item>
              Start service: {{ busItem.statii.lv.in_stop_name }}<br>
              Stop station: {{ busItem.statii.lv.out_stop_name }}
            </md-list-item>
            <md-list-item v-for="lv in busItem.statii.lv.linies" :key="lv[0]">{{ lv[0] }} | {{ lv[1] }}</md-list-item>
          </md-list>
        </md-tab>

        <md-tab id="sambata" md-label="Sambata" v-if="busItem.statii.s">
          <md-list>
            <md-list-item>
              Start service: {{ busItem.statii.s.in_stop_name }}<br>
              Stop station: {{ busItem.statii.s.out_stop_name }}
            </md-list-item>
            <md-list-item v-for="sam in busItem.statii.s.linies" :key="sam[0]">{{ sam[0] }} | {{ sam[1] }}
            </md-list-item>
          </md-list>
        </md-tab>

        <md-tab id="duminica" md-label="Duminica" v-if="busItem.statii.d">
          <md-list>
            <md-list-item>
              Start service: {{ busItem.statii.d.in_stop_name }}<br>
              Stop station: {{ busItem.statii.d.out_stop_name }}
            </md-list-item>
            <md-list-item v-for="dum in busItem.statii.d.linies" :key="dum[0]">{{ dum[0] }} | {{ dum[1] }}
            </md-list-item>
          </md-list>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>


<script>
  import LineService from '../services/LineService'

  export default {
    name: 'BusInformation',
    data () {
      return {
        busItem: null
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.busItem = await LineService.getLine(this.$route.params.line)
      },
      addToFavorite () {
        LineService.addToFavorite(this.$route.params.line)
      }
    }
  }
</script>
