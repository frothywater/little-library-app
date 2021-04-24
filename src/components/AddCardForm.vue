<template>
  <form-dialog title="Add Card" :initial="initialValue" #default="{ draft, update }" :value="value" @input="$emit('input', $event)" @submit="$emit('submit', $event)">
    <v-row>
      <v-col cols="8" class="pb-0">
        <v-text-field :value="draft.name" @input="update($event, 'name')" label="Name" :rules="[rules.required]" maxlength="255" />
      </v-col>
      <v-col cols="4" class="py-0">
        <v-radio-group :value="draft.type" @input="update($event, 'type')" mandatory dense>
          <v-radio label="Student" value="student"></v-radio>
          <v-radio label="Teacher" value="teacher"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-text-field v-model="draft.address" @input="update($event, 'address')" label="Address" :rules="[rules.required]" maxlength="255" />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import { rules, ValidationRules } from "@/utilities/validation";
import { CardInfo, CardType } from "little-library/src/typing";

@Component({ components: { FormDialog } })
export default class AddCardForm extends Vue {
  @Prop(Boolean) value!: boolean;

  readonly initialValue: CardInfo = {
    name: "",
    address: "",
    type: CardType.student,
  };

  get rules(): ValidationRules {
    return rules;
  }
}
</script>
