<template>
  <div v-if="busItem">
    <v-toolbar card class="white" prominent>
      <v-toolbar-title
        class="grey--text text--darken-4 headline">
        {{ busItem.name }}
      </v-toolbar-title>
        <v-subheader class="grey--text">&nbsp;&nbsp;&nbsp; {{ busItem.type }} / {{ busItem.route }}</v-subheader>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToFavorite" class="avatar green">
        <v-icon class="white--text">favorite</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="grey lighten-3"></v-divider>
    <v-tabs grow>
      <v-tabs-bar class="white">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item v-if="busItem.statii.lv" :href="'#tab-lv'">Luni-Vineri</v-tabs-item>
        <v-tabs-item v-if="busItem.statii.s" :href="'#tab-s'">Sambata</v-tabs-item>
        <v-tabs-item v-if="busItem.statii.d" :href="'#tab-d'">Duminica</v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items class="white">
        <v-tabs-content
          :id="'tab-lv'"
          v-if="busItem.statii.lv"
        >
          <BusTable
            :lines="busItem.statii.lv.linies"
            :inStopName="busItem.statii.lv.in_stop_name"
            :outStopName="busItem.statii.lv.out_stop_name">
          </BusTable>
        </v-tabs-content>
        <v-tabs-content
          :id="'tab-s'"
          v-if="busItem.statii.s"
        >
          <BusTable
            :lines="busItem.statii.s.linies"
            :inStopName="busItem.statii.s.in_stop_name"
            :outStopName="busItem.statii.s.out_stop_name">
          </BusTable>
        </v-tabs-content>
        <v-tabs-content
          :id="'tab-d'"
          v-if="busItem.statii.d"
        >
          <BusTable
            :lines="busItem.statii.d.linies"
            :inStopName="busItem.statii.d.in_stop_name"
            :outStopName="busItem.statii.d.out_stop_name">
          </BusTable>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    <v-bottom-nav :value="true" :active.sync="e1" class="white bottom-nav--cutom" >
      <v-btn flat color="teal" value="lv">
        <span>Luni-Vineri</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="s">
        <span>Sambata</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="d">
        <span>Duminica</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>


<script>
  import LineService from '../services/LineService'
  import BusTable from './shared/BusTable'

  export default {
    name: 'BusInformation',
    data () {
      return {
        busItem: null,
        e1: 'lv'
      }
    },
    components: {
      BusTable
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
