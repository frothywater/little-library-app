<template>
  <form-dialog title="Add Card" :value="value" @input="$emit('input', $event)">
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field v-model="draft.title" label="Title" :rules="[rules.required]" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.author" label="Author" :rules="[rules.required]" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.press" label="Press" :rules="[rules.required]" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.category" label="Category" :rules="[rules.required]" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.year" label="Year" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.price" label="Price" type="number" step="0.10" min="0" :rules="[rules.required, rules.nonNegative]" prefix="$" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field v-model="draft.count" label="Count" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import FormDialogClass from "@/functionality/FormDialogClass.vue";
import { BookInfo } from "little-library/src/typing";

@Component({ components: { FormDialog } })
export default class AddBookForm extends FormDialogClass<BookInfo> {
  @Prop(Boolean) value!: boolean;

  constructor() {
    super({
      title: "",
      author: "",
      press: "",
      category: "",
      year: new Date().getFullYear(),
      price: 10.0,
      count: 10,
    });
  }
}
</script>
