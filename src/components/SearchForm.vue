<template>
  <form-dialog title="Search Book" :initial="initialValue" #default="{ draft, update }" :value="value" @input="$emit('input', $event)" @submit="$emit('submit', $event)">
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field :value="draft.title" @input="update($event, 'title')" label="Title" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.author" @input="update($event, 'author')" label="Author" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.press" @input="update($event, 'press')" label="Press" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field :value="draft.category" @input="update($event, 'category')" label="Category" maxlength="255" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="py-0">
        <v-text-field :value="draft.minYear" @input="update($event, 'minYear')" label="Min Year" type="number" min="0" :rules="[rules.nonNegative]" />
      </v-col>
      <v-col cols="3" class="py-0">
        <v-text-field :value="draft.maxYear" @input="update($event, 'maxYear')" label="Max Year" type="number" min="0" :rules="[rules.nonNegative]" />
      </v-col>
      <v-col cols="3" class="py-0">
        <v-text-field :value="draft.minPrice" @input="update($event, 'minPrice')" label="Min Price" type="number" min="0" step="0.1" :rules="[rules.nonNegative]" />
      </v-col>
      <v-col cols="3" class="py-0">
        <v-text-field :value="draft.maxPrice" @input="update($event, 'maxPrice')" label="Max Price" type="number" min="0" step="0.1" :rules="[rules.nonNegative]" />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import { rules, ValidationRules } from "@/utilities/validation";
import { SearchParams } from "@/utilities/typing";

@Component({ components: { FormDialog } })
export default class SearchForm extends Vue {
  @Prop(Boolean) value!: boolean;

  readonly initialValue: SearchParams = {
    title: undefined,
    author: undefined,
    press: undefined,
    category: undefined,
    minYear: undefined,
    maxYear: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  };

  get rules(): ValidationRules {
    return rules;
  }
}
</script>
