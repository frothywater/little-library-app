<template>
  <v-container>
    <book-table :books="books" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookTable from '@/components/BookTable.vue';
import { BookRow } from 'little-library/src/typing';

@Component({
  components: { BookTable },
})
export default class Books extends Vue {
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
}
</script>
