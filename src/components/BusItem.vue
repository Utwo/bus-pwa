<template>
	<div>
		<h1>Bus line information</h1>
    <button @click="addToFavorite"></button>
    <div v-if="busItem">
      <h2>{{ busItem.name }}</h2>
      <h3>{{ busItem.type }}</h3>
      <span>{{ busItem.route }}</span>
      <div>
        <p>Service start at: {{ busItem.statii.lv.service_start }}</p>
        <p>Start station: {{ busItem.statii.lv.in_stop_name }}</p>
        <p>Stop station: {{ busItem.statii.lv.out_stop_name }}</p>
        <h2>Luni-Vineri</h2>
        <ul>
          <li v-for="lv in busItem.statii.lv.linies">{{ lv[0] }} | {{ lv[1] }}</li>
        </ul>
        <h2>Sambata</h2>
        <ul>
          <li v-for="sam in busItem.statii.lv.linies">{{ sam[0] }} | {{ sam[1] }}</li>
        </ul>
        <h2>Duminica</h2>
        <ul>
          <li v-for="dum in busItem.statii.lv.linies">{{ dum[0] }} | {{ dum[1] }}</li>
        </ul>
      </div>
    </div>
	</div>
</template>


<script>
  import LineService from '../services/LineService'
  export default {
    name: 'BusItem',
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
