<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer />
      <v-btn text @click="resetParams">
        <v-icon size="18" class="mr-2">mdi-refresh</v-icon>
        Reset
      </v-btn>
      <v-btn text color="secondary" @click="showSearchDialog = !showSearchDialog">
        <v-icon size="18" class="mr-2">mdi-magnify</v-icon>
        Search
      </v-btn>
    </v-toolbar>

    <book-table :books="books" :loading="loading" @update="handleUpdate" />

    <add-book-form v-model="showAddBookDialog" @submit="add" />

    <search-form v-model="showSearchDialog" @submit="updateParams" />

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
import ask from "@/utilities/ipc";
import { addBookChannel, searchBookChannel } from "@/shared/channels";
import { BookRow, BookInfo, BookSearchParams } from "little-library/src/typing";
import { BookSearchArg, SearchParams, SnackbarType } from "@/utilities/typing";
import { DataOptions } from "vuetify";

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

  books: BookRow[] = [];
  readonly initialParams: SearchParams = {
    title: undefined,
    author: undefined,
    press: undefined,
    category: undefined,
    minYear: undefined,
    maxYear: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  };
  params: SearchParams | null = null;
  sortBy: string | undefined;
  sortDesc = false;

  created(): void {
    this.resetParams();
  }

  updateParams(params: SearchParams): void {
    this.params = Object.assign({}, this.initialParams, params);
    this.search();
  }

  resetParams(): void {
    this.params = Object.assign({}, this.initialParams);
    this.search();
  }

  handleUpdate(options: DataOptions): void {
    this.sortBy = options.sortBy[0];
    this.sortDesc = options.sortDesc[0];
    this.search();
  }

  get searchArg(): BookSearchArg {
    if (!this.params) return { params: {} };
    const { title, author, press, category, minYear, maxYear, minPrice, maxPrice } = this.params;
    const bookSearchParams: BookSearchParams = {
      title,
      author,
      press,
      category,
      year: [minYear ? parseInt(minYear) : undefined, maxYear ? parseInt(maxYear) : undefined],
      price: [minPrice ? parseFloat(minPrice) : undefined, maxPrice ? parseFloat(maxPrice) : undefined],
    };
    return { params: bookSearchParams, sortingKey: this.sortBy as keyof BookRow, ascending: !this.sortDesc };
  }

  async add(info: BookInfo): Promise<void> {
    try {
      await ask(addBookChannel, [info]);
      this.prompt("Success!", SnackbarType.success);
      this.search();
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  async search(): Promise<void> {
    this.loading = true;
    try {
      this.books = await ask(searchBookChannel, this.searchArg);
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    } finally {
      this.loading = false;
    }
  }

  prompt(message?: string, type?: SnackbarType): void {
    this.message = message ?? "";
    this.snackbarType = type ?? SnackbarType.info;
    this.showSnackbar = true;
  }
}
</script>
