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

          <v-dialog v-model="showBorrowDialog" max-width="300">
            <v-card>
              <v-card-title>Borrow Book</v-card-title>

              <v-card-text>
                <v-form @submit.prevent="borrow" ref="borrowForm">
                  <v-text-field v-model="borrowingBookID" label="Book ID" type="number" min="1" :rules="[rules.required, rules.nonNegative]" />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelBorrow">Cancel</v-btn>
                <v-btn color="primary" text type="submit" @click="borrow">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn color="indigo" dark fab absolute class="fab-button" @click="showBorrowDialog = !showBorrowDialog">
            <v-icon>mdi-book</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-container>
            <p class="text--secondary text-center">Choose a card</p>
          </v-container>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardTable from "@/components/CardTable.vue";
import BookTable from "@/components/BookTable.vue";
import AddCardForm from "@/components/AddCardForm.vue";
import { BookRow, CardRow, CardType, CardInfo } from "little-library/src/typing";

@Component({
  components: { CardTable, BookTable, AddCardForm },
})
export default class Cards extends Vue {
  showAddCardDialog = false;
  showBorrowDialog = false;

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

  borrowingBookID = 1;

  get selectedCardID(): number | undefined {
    return this.selectedCards[0]?.id;
  }

  addCard(info: CardInfo): void {
    console.log(info);
  }

  borrow(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.borrowForm as any).validate()) {
      this.showBorrowDialog = false;
    }
  }

  cancelBorrow(): void {
    this.borrowingBookID = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.borrowForm as any).resetValidation();
    this.showBorrowDialog = false;
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
