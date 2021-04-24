<template>
  <form-dialog title="Add Card" :initial="initialValue" #default="{ draft, update }" :value="value" @input="$emit('input', $event)" @submit="$emit('submit', $event)">
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field :value="draft.title" @input="update($event, 'title')" label="Title" :rules="[rules.required]" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.author" @input="update($event, 'author')" label="Author" :rules="[rules.required]" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.press" @input="update($event, 'press')" label="Press" :rules="[rules.required]" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.category" @input="update($event, 'category')" label="Category" :rules="[rules.required]" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.year" @input="update($event, 'year')" label="Year" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.price" @input="update($event, 'price')" label="Price" type="number" step="0.10" min="0" :rules="[rules.required, rules.nonNegative]" prefix="$" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.count" @input="update($event, 'count')" label="Count" type="number" min="0" :rules="[rules.required, rules.nonNegative]" />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import { BookInfo } from "little-library/src/typing";
import { rules, ValidationRules } from "@/utilities/validation";

@Component({ components: { FormDialog } })
export default class AddBookForm extends Vue {
  @Prop(Boolean) value!: boolean;

  readonly initialValue: BookInfo = {
    title: "",
    author: "",
    press: "",
    category: "",
    year: new Date().getFullYear(),
    price: 10.0,
    count: 10,
  };

  get rules(): ValidationRules {
    return rules;
  }
}
</script>
