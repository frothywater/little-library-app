<template>
  <v-data-table :value="selected" @input="$emit('input', $event)" :headers="headers" :items="cards" item-key="id" single-select show-select disable-pagination disable-sort hide-default-footer />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CardRow } from "little-library/src/typing";
import { DataTableHeader } from "vuetify";

@Component
export default class CardTable extends Vue {
  @Prop() readonly cards!: CardRow[];
  @Prop() selected!: CardRow[];

  headers: DataTableHeader[] = [
    { text: "ID", value: "id" },
    { text: "Name", value: "name" },
    { text: "Address", value: "address" },
    { text: "Type", value: "type" },
  ];
}
</script>
