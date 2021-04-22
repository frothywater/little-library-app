<template>
  <v-data-table
    :headers="headers"
    :items="books"
    item-key="id"
    disable-pagination
    hide-default-footer
  >
    <template slot="top">
      <v-toolbar flat>
        <v-toolbar-title>Books</v-toolbar-title>
        <v-spacer />

        <v-dialog v-model="dialog" max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" dark v-bind="attrs" v-on="on">Add</v-btn>
          </template>
          <v-card>
            <v-card-title>Add Book</v-card-title>

            <v-card-text>
              <v-form v-model="validNewBook">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      v-model="draftBook.title"
                      label="Title"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.author"
                      label="Author"
                      required
                    />
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.press"
                      label="Press"
                      required
                    />
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.category"
                      label="Category"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.year"
                      label="Year"
                      required
                    />
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.price"
                      label="Price"
                      required
                      prefix="$"
                    />
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                      v-model="draftBook.count"
                      label="Count"
                      required
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="cancelNewBook">Cancel</v-btn>
              <v-btn color="blue" text @click="saveNewBook">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BookRow, BookInfo } from 'little-library/src/typing';
import { DataTableHeader } from 'vuetify';

@Component
export default class BookTable extends Vue {
  @Prop() readonly books!: BookRow[];

  dialog = false;
  validNewBook = false;

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

  draftBook: BookInfo = {
    title: '',
    author: '',
    press: '',
    category: '',
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  emptyBook: BookInfo = {
    title: '',
    author: '',
    press: '',
    category: '',
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  saveNewBook() {
    this.dialog = false;
  }

  cancelNewBook() {
    this.dialog = false;
  }
}
</script>
