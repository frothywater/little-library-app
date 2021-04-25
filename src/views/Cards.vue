<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-toolbar flat>
          <v-toolbar-title>Cards</v-toolbar-title>
        </v-toolbar>

        <card-table :cards="cards" :value="selectedCards" @input="handleSelectCard" />

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
          <book-table :books="books" with-action mini @action="returnBook" />

          <borrow-form v-model="showBorrowDialog" @submit="borrow" />

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
import { BookRow, CardRow, CardInfo } from "little-library/src/typing";
import { SnackbarType } from "@/utilities/typing";
import { addCardChannel, borrowChannel, getCardsChannel, returnChannel, showCardChannel } from "@/shared/channels";
import ask from "@/utilities/ipc";
import auth from "@/store/auth";

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

  cards: CardRow[] = [];
  books: BookRow[] = [];

  get selectedCardID(): number | undefined {
    return this.selectedCards[0]?.id;
  }

  created(): void {
    this.getCards();
  }

  handleSelectCard(cards: CardRow[]): void {
    this.selectedCards = cards;
    if (this.selectedCardID) this.getBooks(this.selectedCardID);
  }

  async getCards(): Promise<void> {
    try {
      this.cards = await ask(getCardsChannel, null);
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  async getBooks(cardID: number): Promise<void> {
    try {
      this.books = await ask(showCardChannel, cardID);
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  async addCard(info: CardInfo): Promise<void> {
    try {
      await ask(addCardChannel, info);
      this.prompt("Success!", SnackbarType.success);
      this.getCards();
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  async borrow(bookID: number): Promise<void> {
    try {
      if (!this.selectedCardID) return;
      const result = await ask(borrowChannel, { cardID: this.selectedCardID, bookID, managerID: auth.manager?.id });
      if (result.success) {
        this.prompt("Success!", SnackbarType.success);
        this.getBooks(this.selectedCardID);
      } else {
        const infoString = result.estimatedAvailableDate ? `\nThis book might be available earliest at ${result.estimatedAvailableDate?.toDateString()}.` : "";
        this.prompt(`Out of stock.${infoString}`, SnackbarType.info);
      }
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  async returnBook(book: BookRow): Promise<void> {
    try {
      if (!this.selectedCardID) return;
      const success = await ask(returnChannel, { cardID: this.selectedCardID, bookID: book.id });
      if (success) {
        this.prompt("Success!", SnackbarType.success);
        this.getBooks(this.selectedCardID);
      } else {
        this.prompt("This book has not been borrowed under this card.", SnackbarType.info);
      }
    } catch (err) {
      this.prompt(err, SnackbarType.error);
    }
  }

  prompt(message?: string, type?: SnackbarType): void {
    this.message = message ?? "";
    this.snackbarType = type ?? SnackbarType.info;
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
