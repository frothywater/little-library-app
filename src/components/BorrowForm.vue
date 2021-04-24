<template>
  <form-dialog title="Borrow Book" :width="300" :initial="initialValue" #default="{ draft, update }" :value="value" @input="$emit('input', $event)" @submit="$emit('submit', $event)">
    <v-text-field :value="draft" @input="update($event)" label="Book ID" type="number" min="1" :rules="[rules.required, rules.nonNegative]" />
  </form-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import { rules, ValidationRules } from "@/utilities/validation";

@Component({ components: { FormDialog } })
export default class BorrowForm extends Vue {
  @Prop(Boolean) value!: boolean;

  readonly initialValue = 1;

  get rules(): ValidationRules {
    return rules;
  }
}
</script>
