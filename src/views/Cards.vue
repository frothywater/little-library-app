<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-toolbar flat>
          <v-toolbar-title>Cards</v-toolbar-title>
        </v-toolbar>

        <card-table :cards="cards" v-model="selectedCards" />

        <v-dialog v-model="showAddCardDialog" max-width="500">
          <v-card>
            <v-card-title>Add Card</v-card-title>

            <v-card-text>
              <v-form @submit.prevent="addCard" ref="addCardForm">
                <v-row>
                  <v-col cols="8" class="pb-0">
                    <v-text-field v-model="draftCard.name" label="Name" :rules="[rules.required]" maxlength="255" />
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-radio-group v-model="draftCard.type" mandatory dense>
                      <v-radio label="Student" value="student"></v-radio>
                      <v-radio label="Teacher" value="teacher"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-text-field v-model="draftCard.address" label="Address" :rules="[rules.required]" maxlength="255" />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelAddCard">Cancel</v-btn>
              <v-btn color="primary" text type="submit" @click="addCard">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-fab-transition>
          <v-btn color="secondary" dark fab absolute class="fab-button-left" @click="showAddCardDialog = !showAddCardDialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>

      <v-divider vertical class="divider" />

      <v-col cols="6">
        <v-toolbar flat>
          <v-toolbar-title>Borrowed</v-toolbar-title>
        </v-toolbar>

        <book-table :books="books" />

        <v-dialog v-model="showBorrowDialog" max-width="500">
          <v-card>
            <v-card-title>Add Card</v-card-title>

            <v-card-text>
              <v-form @submit.prevent="borrow" ref="borrowForm">
                <v-text-field v-model="draftCard.name" label="Name" :rules="[rules.required]" maxlength="255" />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelBorrow">Cancel</v-btn>
              <v-btn color="primary" text type="submit" @click="borrow">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-fab-transition>
          <v-btn color="indigo" dark fab absolute class="fab-button" @click="showBorrowDialog = !showBorrowDialog">
            <v-icon>mdi-book</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardTable from "@/components/CardTable.vue";
import BookTable from "@/components/BookTable.vue";
import { BookRow, CardRow, CardType, CardInfo } from "little-library/src/typing";
import { InputValidationRule } from "vuetify";

@Component({
  components: { CardTable, BookTable },
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

  draftCard = Cards.emptyCard;

  static readonly emptyCard: CardInfo = {
    name: "",
    address: "",
    type: CardType.student,
  };

  rules: { [key: string]: InputValidationRule } = {
    required: (value) => !!value || "Required.",
    nonNegative: (value) => !value || value >= 0 || "Should be no less than 0.",
  };

  get selectedCardID(): number | undefined {
    return this.selectedCards[0]?.id;
  }

  addCard(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.addCardForm as any).validate()) {
      this.showAddCardDialog = false;
    }
  }

  cancelAddCard(): void {
    Object.assign(this.draftCard, Cards.emptyCard);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.addCardForm as any).resetValidation();
    this.showAddCardDialog = false;
  }

  borrow(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.borrowForm as any).validate()) {
      this.showBorrowDialog = false;
    }
  }

  cancelBorrow(): void {
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
