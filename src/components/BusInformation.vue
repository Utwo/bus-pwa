<template>
  <div>
    <div v-if="busItem && !isLoading">
      <v-toolbar card class="white" prominent>
        <v-toolbar-title
          class="grey--text text--darken-4 headline">
          {{ busItem.name }}
        </v-toolbar-title>
        <v-subheader class="grey--text">&nbsp;&nbsp;&nbsp; {{ busItem.type }} / {{ busItem.route }}</v-subheader>
        <v-spacer></v-spacer>
        <v-btn fab small color="pink" :dark="!isFavorite" :outline="isFavorite" @click="addToFavorite">
          <v-icon>favorite</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="grey lighten-3"></v-divider>
      <v-tabs grow v-model="current_key">
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
              :hourList="busItem.statii.lv.linies"
              :inStopName="busItem.statii.lv.in_stop_name"
              :outStopName="busItem.statii.lv.out_stop_name">
            </BusTable>
          </v-tabs-content>
          <v-tabs-content
            :id="'tab-s'"
            v-if="busItem.statii.s"
          >
            <BusTable
              :hourList="busItem.statii.s.linies"
              :inStopName="busItem.statii.s.in_stop_name"
              :outStopName="busItem.statii.s.out_stop_name">
            </BusTable>
          </v-tabs-content>
          <v-tabs-content
            :id="'tab-d'"
            v-if="busItem.statii.d"
          >
            <BusTable
              :hourList="busItem.statii.d.linies"
              :inStopName="busItem.statii.d.in_stop_name"
              :outStopName="busItem.statii.d.out_stop_name">
            </BusTable>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </div>
    <BaseLoading v-if="isLoading"/>
  </div>
</template>

<script>
  import LineService from '../services/LineService'
  import CommonFunctions from '../services/CommonFunctions'
  import BusTable from './shared/BusTable'
  import BaseLoading from './shared/BaseLoading'

  export default {
    data () {
      return {
        busItem: null,
        isFavorite: false,
        isLoading: true,
        current_key: null
      }
    },
    components: {
      BusTable, BaseLoading
    },
    async created () {
      await this.fetchData()
      this.isFavorite = LineService.isFavorite(this.$route.params.line)
      this.scrollTo()
      const dayAbbreviation = CommonFunctions.getDayAbbreviation()
      if (this.busItem.statii[dayAbbreviation]) {
        this.current_key = `tab-${dayAbbreviation}`
      }
    },
    async beforeRouteUpdate (to, from, next) {
      this.isLoading = true
      next()
      await this.fetchData()
      this.isFavorite = LineService.isFavorite(this.$route.params.line)
      this.scrollTo()
    },
    methods: {
      async fetchData () {
        this.busItem = await LineService.getLine(this.$route.params.line)
        if (!this.busItem) {
          this.$router.push('/not-found')
        }
        this.isLoading = false
      },
      addToFavorite () {
        LineService.addToFavorite(this.$route.params.line)
        this.isFavorite = !this.isFavorite
      },
      scrollTo () {
        this.$nextTick(function () {
          const options = {
            container: '.bus-table',
            offset: -300
          }
          setTimeout(() => {
            this.$scrollTo('.bus-table tbody tr .scroll-here', 500, options)
          }, 500)
        })
      }
    }
  }
</script>
