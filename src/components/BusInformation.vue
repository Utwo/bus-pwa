<template>
  <div v-if="busItem">
    <v-btn @click="addToFavorite">
      <v-icon>favorite</v-icon>
    </v-btn>
    <h1>{{ busItem.name }}</h1>
    <h3>{{ busItem.type }}</h3>
    <span>{{ busItem.route }}</span>
    <div>
      <v-tabs dark grow>
        <v-tabs-bar class="cyan" slot="luni-vineri" id="luni-vineri">
          <v-tabs-slider class="yellow"></v-tabs-slider>
          <v-tabs-item v-if="busItem.statii.lv" :href="'#tab-lv'">Luni-Vineri</v-tabs-item>
          <v-tabs-item v-if="busItem.statii.s" :href="'#tab-s'">Sambata</v-tabs-item>
          <v-tabs-item v-if="busItem.statii.d" :href="'#tab-d'">Duminica</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            :id="'tab-lv'"
            v-if="busItem.statii.lv"
          >
            <v-card flat>
              <v-card-text>
                Start service: {{ busItem.statii.lv.in_stop_name }}<br>
                Stop station: {{ busItem.statii.lv.out_stop_name }}
                <v-list v-for="lv in busItem.statii.lv.linies" :key="lv[0]">{{ lv[0] }} | {{ lv[1] }}</v-list>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content
            :id="'tab-s'"
            v-if="busItem.statii.s"
          >
            <v-card flat>
              <v-card-text>
                Start service: {{ busItem.statii.s.in_stop_name }}<br>
                Stop station: {{ busItem.statii.s.out_stop_name }}
                <v-list v-for="s in busItem.statii.s.linies" :key="s[0]">{{ s[0] }} | {{ s[1] }}</v-list>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content
            :id="'tab-d'"
            v-if="busItem.statii.d"
          >
            <v-card flat>
              <v-card-text>
                Start service: {{ busItem.statii.d.in_stop_name }}<br>
                Stop station: {{ busItem.statii.d.out_stop_name }}
                <v-list v-for="d in busItem.statii.d.linies" :key="d[0]">{{ d[0] }} | {{ d[1] }}</v-list>
              </v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
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
