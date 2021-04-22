<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        color="secondary"
        @click="showFilterDialog = !showFilterDialog"
      >
        <v-icon size="18" class="mr-2">mdi-filter</v-icon>
        Filter
      </v-btn>
    </v-toolbar>

    <book-table :books="books" :loading="loading" />

    <v-dialog v-model="showAddBookDialog" max-width="500">
      <v-card>
        <v-card-title>Add Book</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="addBook" ref="addBookForm">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="draftBook.title"
                  label="Title"
                  :rules="[rules.required]"
                  maxlength="255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.author"
                  label="Author"
                  :rules="[rules.required]"
                  maxlength="255"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.press"
                  label="Press"
                  :rules="[rules.required]"
                  maxlength="255"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.category"
                  label="Category"
                  :rules="[rules.required]"
                  maxlength="255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.year"
                  label="Year"
                  type="number"
                  min="0"
                  :rules="[rules.required, rules.nonNegative]"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.price"
                  label="Price"
                  type="number"
                  step="0.10"
                  min="0"
                  :rules="[rules.required, rules.nonNegative]"
                  prefix="$"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftBook.count"
                  label="Count"
                  type="number"
                  min="0"
                  :rules="[rules.required, rules.nonNegative]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelAddBook">Cancel</v-btn>
          <v-btn color="primary" text type="submit" @click="addBook"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showFilterDialog" max-width="500">
      <v-card>
        <v-card-title>Search</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="addBook" ref="filterForm">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="draftFilterParams.title"
                  label="Title"
                  maxlength="255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.author"
                  label="Author"
                  maxlength="255"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.press"
                  label="Press"
                  maxlength="255"
                />
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.category"
                  label="Category"
                  maxlength="255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.minYear"
                  label="Min Year"
                  type="number"
                  min="0"
                  :rules="[rules.nonNegative]"
                />
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.maxYear"
                  label="Max Year"
                  type="number"
                  min="0"
                  :rules="[rules.nonNegative]"
                />
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.minPrice"
                  label="Min Price"
                  type="number"
                  min="0"
                  step="0.1"
                  :rules="[rules.nonNegative]"
                />
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="draftFilterParams.maxPrice"
                  label="Max Price"
                  type="number"
                  min="0"
                  step="0.1"
                  :rules="[rules.nonNegative]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelFilter">Cancel</v-btn>
          <v-btn color="primary" text type="submit" @click="applyFilter"
            >Apply</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-fab-transition>
      <v-btn
        color="secondary"
        dark
        fab
        absolute
        class="fab-button"
        @click="showAddBookDialog = !showAddBookDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookTable from '@/components/BookTable.vue';
import { BookRow, BookInfo, BookSearchParams } from 'little-library/src/typing';
import { InputValidationRule } from 'vuetify';

@Component({
  components: { BookTable },
})
export default class Books extends Vue {
  showAddBookDialog = false;
  showFilterDialog = false;
  loading = false;

  books: BookRow[] = [
    {
      id: 1,
      title: 'Hello',
      author: 'Alice',
      press: 'Penguin',
      category: 'Fiction',
      year: 2016,
      price: 10.0,
      total: 10,
      stock: 5,
    },
  ];

  draftBook: BookInfo = Books.emptyBook;

  static readonly emptyBook: BookInfo = {
    title: '',
    author: '',
    press: '',
    category: '',
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  draftFilterParams: BookFilterParams = {};

  rules: { [key: string]: InputValidationRule } = {
    required: (value) => !!value || 'Required.',
    nonNegative: (value) => !value || value >= 0 || 'Should be no less than 0.',
  };

  addBook(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.addBookForm as any).validate()) {
      this.showAddBookDialog = false;
    }
  }

  cancelAddBook(): void {
    Object.assign(this.draftBook, Books.emptyBook);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.addBookForm as any).resetValidation();
    this.showAddBookDialog = false;
  }

  applyFilter(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.filterForm as any).validate()) {
      this.showFilterDialog = false;
    }
  }

  cancelFilter(): void {
    this.draftFilterParams = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.filterForm as any).resetValidation();
    this.showFilterDialog = false;
  }
}

interface BookFilterParams {
  title?: string;
  author?: string;
  press?: string;
  category?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
}
</script>
