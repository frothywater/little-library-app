import { InputValidationRule } from "vuetify";

export type ValidationRules = { [key: string]: InputValidationRule };

export const rules: ValidationRules = {
  required: (value) => !!value || "Required.",
  nonNegative: (value) => !value || value >= 0 || "Should be no less than 0.",
};
