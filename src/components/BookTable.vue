<template>
  <v-data-table :headers="headers" :items="books" item-key="id" :loading="loading" loading-text="Loading data..." :server-items-length="50" @update:options="$emit('update', $event)" disable-pagination hide-default-footer>
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

const actionHeader: DataTableHeader[] = [{ text: "", value: "actions", sortable: false, cellClass: "px-1" }];

const basicHeaders: DataTableHeader[] = [
  { text: "ID", value: "id" },
  { text: "Title", value: "title" },
  { text: "Author", value: "author" },
  { text: "Press", value: "press" },
];

const extraHeaders: DataTableHeader[] = [
  { text: "Category", value: "category" },
  { text: "Year", value: "year" },
  { text: "Price", value: "price" },
  { text: "Total", value: "total" },
  { text: "Stock", value: "stock" },
];

@Component
export default class BookTable extends Vue {
  @Prop(Array) readonly books!: BookRow[];
  @Prop({ type: Boolean, default: false }) loading: boolean | undefined;
  @Prop({ type: Boolean, default: false }) withAction: boolean | undefined;
  @Prop({ type: Boolean, default: false }) mini: boolean | undefined;

  get headers(): DataTableHeader[] {
    return [...(this.withAction ? actionHeader : []), ...basicHeaders, ...(this.mini ? [] : extraHeaders)];
  }
}
</script>
