<template>
  <v-data-table
    hide-actions
    no-data-text="Nu sunt date disponibile"
    :items="hourList"
    class="elevation-0 text-xs-center bus-table"
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th>{{ inStopName }}</th>
        <th>{{ outStopName }}</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td :class="{
        'green--text': props.item[0] >= nextInStopHour,
        'scroll-here': props.item[0] >= nextInStopHour
      }">
        {{ props.item[0] }}
      </td>
      <td :class="{
        'green--text': props.item[1] >= nextOutStopHour,
        'scroll-here': props.item[1] >= nextOutStopHour
      }">
        {{ props.item[1] }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  import commonFunctions from '../../services/CommonFunctions'

  export default {
    props: {
      hourList: {
        type: Array,
        required: true
      },
      inStopName: {
        type: String,
        required: true
      },
      outStopName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        nextInStopHour: null,
        nextOutStopHour: null
      }
    },
    mounted () {
      if (this._props.hourList.length > 0) {
        const nextStationTime = commonFunctions.calculateNextStationTime(this._props.hourList)
        this.nextInStopHour = nextStationTime.next_in_stop.hour
        this.nextOutStopHour = nextStationTime.next_out_stop.hour
      }
    }
  }
</script>
