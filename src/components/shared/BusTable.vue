<template>
  <v-data-table
    hide-actions
    no-data-text="Nu sunt date disponibile"
    :items="lines"
    class="elevation-0 text-xs-center bus-table"
  >
    <template slot="headers" scope="props">
      <tr>
        <th>{{ inStopName }}</th>
        <th>{{ outStopName }}</th>
      </tr>
    </template>
    <template slot="items" scope="props">
      <td>{{ props.item[0] }}</td>
      <td>{{ props.item[1] }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: {
      lines: {
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
    name: 'BusTable'
  }
</script>
