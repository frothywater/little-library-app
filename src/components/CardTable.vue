<template>
  <v-data-table
    :headers="headers"
    :items="cards"
    item-key="id"
    disable-pagination
    hide-default-footer
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardRow } from 'little-library/src/typing';
import { DataTableHeader } from 'vuetify';

@Component
export default class CardTable extends Vue {
  @Prop() readonly cards!: CardRow[];

  headers: DataTableHeader[] = [
    { text: 'ID', value: 'id' },
    { text: 'Name', value: 'name' },
    { text: 'Address', value: 'address' },
    { text: 'Type', value: 'type' },
  ];
}
</script>
