<template>
  <v-dialog :value="value" @input="handleInput" max-width="500">
    <v-card>
      <v-card-title>Add Card</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="sumbit" ref="form">
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
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text type="submit" @click="sumbit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { CardType, CardInfo } from "little-library/src/typing";
import { rules, ValidationRules } from "@/utilities/validation";

const emptyCard: CardInfo = {
  name: "",
  address: "",
  type: CardType.student,
};

@Component
export default class AddCardForm extends Vue {
  @Prop(Boolean) value!: boolean;

  draftCard = Object.assign({}, emptyCard);

  get rules(): ValidationRules {
    return rules;
  }

  sumbit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.form as any).validate()) {
      this.$emit("submit", this.draftCard);
      this.$emit("input", false);
    }
  }

  cancel(): void {
    Object.assign(this.draftCard, emptyCard);
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
