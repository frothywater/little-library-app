<template>
  <v-data-table :headers="headers" :items="books" item-key="id" :loading="loading" loading-text="Loading data..." disable-pagination disable-sort hide-default-footer>
    <template v-if="withAction" #item.actions>
      <v-btn icon>
        <v-icon>mdi-book-arrow-right</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BookRow } from "little-library/src/typing";
import { DataTableHeader } from "vuetify";

@Component
export default class BookTable extends Vue {
  @Prop(Array) readonly books!: BookRow[];
  @Prop({ type: Boolean, default: false }) loading: boolean | undefined;
  @Prop({ type: Boolean, default: false }) withAction: boolean | undefined;

  headers: DataTableHeader[] = [
    { text: "", value: "actions", sortable: false, cellClass: "px-1" },
    { text: "ID", value: "id" },
    { text: "Title", value: "title" },
    { text: "Author", value: "author" },
    { text: "Press", value: "press" },
    { text: "Category", value: "category" },
    { text: "Year", value: "year" },
    { text: "Price", value: "price" },
    { text: "Total", value: "total" },
    { text: "Stock", value: "stock" },
  ];
}
</script>
