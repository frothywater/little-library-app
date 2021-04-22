<template>
  <v-data-table
    :headers="headers"
    :items="books"
    item-key="id"
    disable-pagination
    hide-default-footer
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BookRow } from 'little-library/src/typing';
import { DataTableHeader } from 'vuetify';

@Component
export default class BookTable extends Vue {
  @Prop() readonly books!: BookRow[];

  headers: DataTableHeader[] = [
    { text: 'ID', value: 'id' },
    { text: 'Title', value: 'title' },
    { text: 'Author', value: 'author' },
    { text: 'Press', value: 'press' },
    { text: 'Category', value: 'category' },
    { text: 'Year', value: 'year' },
    { text: 'Price', value: 'price' },
    { text: 'Total', value: 'total' },
    { text: 'Stock', value: 'stock' },
  ];
}
</script>
