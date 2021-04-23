<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { rules, ValidationRules } from "@/utilities/validation";

@Component
export default class FormDialogClass<T> extends Vue {
  draft!: T;
  initial: T;

  constructor(initial: T) {
    super();
    this.initial = initial;
    this.reset();
  }

  get rules(): ValidationRules {
    return rules;
  }

  submit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.form as any).validate()) {
      this.$emit("submit", this.draft);
      this.$emit("input", false);
    }
  }

  cancel(): void {
    this.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.form as any).resetValidation();
    this.$emit("input", false);
  }

  handleInput(e: boolean): void {
    if (e === false) this.cancel();
    this.$emit("input", e);
  }

  reset(value: T = this.initial): void {
    if (typeof value === "object") this.draft = Object.assign({}, value);
    else this.draft = value;
  }
}
</script>
