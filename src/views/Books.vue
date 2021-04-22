<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer />
      <v-btn text color="secondary">
        <v-icon size="18" class="mr-2">mdi-filter</v-icon>
        Filter
      </v-btn>
    </v-toolbar>

    <book-table :books="books" />

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Add Book</v-card-title>

        <v-card-text>
          <v-form
            v-model="validNewBook"
            @submit.prevent="saveNewBook"
            ref="form"
          >
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
          <v-btn text @click="cancelNewBook">Cancel</v-btn>
          <v-btn color="primary" text type="submit" @click="saveNewBook"
            >Save</v-btn
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
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookTable from '@/components/BookTable.vue';
import { BookRow, BookInfo } from 'little-library/src/typing';
import { InputValidationRule } from 'vuetify';

@Component({
  components: { BookTable },
})
export default class Books extends Vue {
  dialog = false;
  validNewBook = false;

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

  draftBook: BookInfo = {
    title: '',
    author: '',
    press: '',
    category: '',
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  readonly emptyBook: BookInfo = {
    title: '',
    author: '',
    press: '',
    category: '',
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  rules: { [key: string]: InputValidationRule } = {
    required: (value) => !!value || 'Required.',
    nonNegative: (value) => value >= 0 || 'Should be no less than 0.',
  };

  saveNewBook(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.form as any).validate()) {
      this.dialog = false;
    }
  }

  cancelNewBook(): void {
    Object.assign(this.draftBook, this.emptyBook);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.form as any).resetValidation();
    this.dialog = false;
  }
}
</script>
