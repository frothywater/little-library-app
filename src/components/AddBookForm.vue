<template>
  <v-dialog :value="value" @input="handleInput" max-width="500">
    <v-card>
      <v-card-title>Add Book</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field v-model="draftBook.title" label="Title" :rules="[rules.required]" maxlength="255" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.author" label="Author" :rules="[rules.required]" maxlength="255" />
            </v-col>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.press" label="Press" :rules="[rules.required]" maxlength="255" />
            </v-col>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.category" label="Category" :rules="[rules.required]" maxlength="255" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.year" label="Year" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
            </v-col>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.price" label="Price" type="number" step="0.10" min="0" :rules="[rules.required, rules.nonNegative]" prefix="$" />
            </v-col>
            <v-col cols="4" class="py-0">
              <v-text-field v-model="draftBook.count" label="Count" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text type="submit" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { BookInfo } from "little-library/src/typing";
import { rules, ValidationRules } from "@/utilities/validation";

const emptyBook: BookInfo = {
  title: "",
  author: "",
  press: "",
  category: "",
  year: new Date().getFullYear(),
  price: 10.0,
  count: 10,
};

@Component
export default class AddBookForm extends Vue {
  @Prop(Boolean) value!: boolean;

  draftBook = Object.assign({}, emptyBook);

  get rules(): ValidationRules {
    return rules;
  }

  submit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.form as any).validate()) {
      this.$emit("submit", this.draftBook);
      this.$emit("input", false);
    }
  }

  cancel(): void {
    Object.assign(this.draftBook, emptyBook);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.form as any).resetValidation();
    this.$emit("input", false);
  }

  handleInput(e: boolean): void {
    if (e === false) this.cancel();
    this.$emit("input", e);
  }
}
</script>
