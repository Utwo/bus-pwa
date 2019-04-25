<template>
  <v-data-table
    :items="hourList"
    hide-actions
    no-data-text="Nu sunt date disponibile"
    class="elevation-0 text-xs-center bus-table"
  >
    <tr slot="headers" class="grey lighten-4">
      <th>{{ inStopName }}</th>
      <th>{{ outStopName }}</th>
    </tr>
    <tr slot="items" slot-scope="props">
      <td
        :class="{
          'green--text': props.item[0] >= nextInStopTime,
          'scroll-here': props.item[0] === nextInStopTime
        }"
      >
        {{ props.item[0] }}
      </td>
      <td
        :class="{
          'green--text': props.item[1] >= nextOutStopTime,
          'scroll-here': props.item[1] === nextOutStopTime
        }"
      >
        {{ props.item[1] }}
      </td>
    </tr>
  </v-data-table>
</template>

<script>
import commonFunctions from "../../services/CommonFunctions"
import format from "date-fns/format"

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
  data() {
    return {
      nextInStopTime: null,
      nextOutStopTime: null
    }
  },
  mounted() {
    if (this._props.hourList.length > 0) {
      const nextStationTime = commonFunctions.calculateNextStationTime(
        this._props.hourList
      )
      this.nextInStopTime = format(
        nextStationTime.next_in_stop.nextDateTime,
        "HH:mm"
      )
      this.nextOutStopTime = format(
        nextStationTime.next_out_stop.nextDateTime,
        "HH:mm"
      )
    }
  }
}
</script>
