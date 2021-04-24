<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer />
      <v-btn text color="secondary" @click="showFilterDialog = !showFilterDialog">
        <v-icon size="18" class="mr-2">mdi-filter</v-icon>
        Filter
      </v-btn>
    </v-toolbar>

    <book-table :books="books" :loading="loading" />

    <add-book-form v-model="showAddBookDialog" @submit="add" />

    <filter-form v-model="showFilterDialog" @submit="applyFilter" />

    <v-btn color="secondary" dark fab absolute class="fab-button" @click="showAddBookDialog = !showAddBookDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <snackbar v-model="showSnackbar" :text="message" :type="snackbarType" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookTable from "@/components/BookTable.vue";
import AddBookForm from "@/components/AddBookForm.vue";
import FilterForm from "@/components/FilterForm.vue";
import Snackbar from "@/components/Snackbar.vue";
import { BookRow, BookInfo } from "little-library/src/typing";
import { BookFilterParams, SnackbarType } from "@/utilities/typing";

@Component({
  components: { BookTable, AddBookForm, FilterForm, Snackbar },
})
export default class Books extends Vue {
  showAddBookDialog = false;
  showFilterDialog = false;
  loading = false;
  showSnackbar = false;
  message = "";
  snackbarType = SnackbarType.info;

  books: BookRow[] = [
    {
      id: 1,
      title: "Hello",
      author: "Alice",
      press: "Penguin",
      category: "Fiction",
      year: 2016,
      price: 10.0,
      total: 10,
      stock: 5,
    },
  ];

  add(info: BookInfo): void {
    console.log(info);
    this.showSnackbar = true;
  }

  applyFilter(params: BookFilterParams): void {
    console.log(params);
  }
}
</script>
