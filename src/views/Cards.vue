<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-toolbar flat>
          <v-toolbar-title>Cards</v-toolbar-title>
        </v-toolbar>

        <card-table :cards="cards" v-model="selectedCards" />

        <add-card-form v-model="showAddCardDialog" @submit="addCard($event)" />

        <v-btn color="secondary" dark fab absolute class="fab-button-left" @click="showAddCardDialog = !showAddCardDialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

      <v-divider vertical class="divider" />

      <v-col cols="6">
        <v-toolbar flat>
          <v-toolbar-title>Borrowed</v-toolbar-title>
        </v-toolbar>

        <template v-if="!!selectedCardID">
          <book-table :books="books" with-action />

          <borrow-form v-model="showBorrowDialog" @submit="borrow($event)" />

          <v-btn color="indigo" dark fab absolute class="fab-button" @click="showBorrowDialog = !showBorrowDialog">
            <v-icon>mdi-book-arrow-left</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-container>
            <p class="text--secondary text-center">Choose a card</p>
          </v-container>
        </template>
      </v-col>
    </v-row>

    <snackbar v-model="showSnackbar" :text="message" :type="snackbarType" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardTable from "@/components/CardTable.vue";
import BookTable from "@/components/BookTable.vue";
import AddCardForm from "@/components/AddCardForm.vue";
import BorrowForm from "@/components/BorrowForm.vue";
import Snackbar from "@/components/Snackbar.vue";
import { BookRow, CardRow, CardType, CardInfo } from "little-library/src/typing";
import { SnackbarType } from "@/utilities/typing";

@Component({
  components: { CardTable, BookTable, AddCardForm, BorrowForm, Snackbar },
})
export default class Cards extends Vue {
  showAddCardDialog = false;
  showBorrowDialog = false;
  showSnackbar = false;
  message = "";
  snackbarType = SnackbarType.info;

  selectedCards: CardRow[] = [];

  cards: CardRow[] = [
    {
      id: 1,
      name: "Bob",
      address: "London, UK",
      type: CardType.student,
    },
    {
      id: 2,
      name: "Cathy",
      address: "LA, US",
      type: CardType.teacher,
    },
  ];

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

  get selectedCardID(): number | undefined {
    return this.selectedCards[0]?.id;
  }

  addCard(info: CardInfo): void {
    console.log(info);
    this.showSnackbar = true;
  }

  borrow(id: number): void {
    console.log(id);
    this.showSnackbar = true;
  }
}
</script>

<style scoped>
.fab-button-left {
  position: fixed;
  bottom: 36px;
  right: calc(100% / 2);
}

.divider {
  min-height: 95vh;
}
</style>
