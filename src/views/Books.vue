<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer />
      <v-btn text color="secondary" @click="showSearchDialog = !showSearchDialog">
        <v-icon size="18" class="mr-2">mdi-magnify</v-icon>
        Search
      </v-btn>
    </v-toolbar>

    <book-table :books="books" :loading="loading" />

    <add-book-form v-model="showAddBookDialog" @submit="add" />

    <search-form v-model="showSearchDialog" @submit="search" />

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
import SearchForm from "@/components/SearchForm.vue";
import Snackbar from "@/components/Snackbar.vue";
import { BookRow, BookInfo } from "little-library/src/typing";
import { SearchParams, SnackbarType } from "@/utilities/typing";

@Component({
  components: { BookTable, AddBookForm, SearchForm, Snackbar },
})
export default class Books extends Vue {
  showAddBookDialog = false;
  showSearchDialog = false;
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

  search(params: SearchParams): void {
    console.log(params);
  }
}
</script>
