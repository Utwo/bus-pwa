<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    disable-pagination
    disable-filtering
    disable-sort
    hide-default-footer
    fixed-header
    mobile-breakpoint="0"
    no-data-text="Nu sunt date disponibile"
    class="elevation-0 text-xs-center bus-table"
  >
    <template v-slot:body="{ items }">
      <tbody class="text-center">
        <tr v-for="item in items" :key="item.name">
          <td
            :class="{
              'green--text': item.in >= nextInStopTime,
              'scroll-here': item.in === nextInStopTime
            }"
          >
            {{ item.in }}
          </td>
          <td
            :class="{
              'green--text': item.out >= nextOutStopTime,
              'scroll-here': item.out === nextOutStopTime
            }"
          >
            {{ item.out }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import commonFunctions from "../../services/CommonFunctions";
import { format } from "date-fns";

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
      headers: [
        {
          text: this.inStopName,
          value: "in",
          align: "center",
          class: "grey lighten-4"
        },
        {
          text: this.outStopName,
          value: "out",
          align: "center",
          class: "grey lighten-4"
        }
      ],
      nextInStopTime: null,
      nextOutStopTime: null
    };
  },
  computed: {
    tableData: function() {
      return this.hourList.map(item => ({
        in: item[0],
        out: item[1]
      }));
    }
  },
  mounted() {
    if (this.hourList.length > 0) {
      const nextStationTime = commonFunctions.calculateNextStationTime(
        this.hourList
      );
      this.nextInStopTime = format(
        nextStationTime.next_in_stop.nextDateTime,
        "HH:mm"
      );
      this.nextOutStopTime = format(
        nextStationTime.next_out_stop.nextDateTime,
        "HH:mm"
      );
    }
  }
};
</script>
