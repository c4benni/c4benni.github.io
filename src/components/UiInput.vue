<script>
import {
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  reactive,
  computed,
} from "@vue/runtime-core";

const div = (d, c) => h("div", d, c);
const label = (d, c) => h("label", d, c);

const scoping = { "data-uit": "" };

export default {
  name: "UiInput",
  props: {
    required: Boolean,
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    pattern: {
      type: String,
      default: undefined,
    },
    validate: {
      type: Function,
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    placeholder:{
      type:String,
      default: undefined
    }
  },
  emits: ["update:modelValue"],
  setup(p, { emit, expose }) {
    const props = computed(() => p);

    const data = reactive({
      focused: false,
      inputDirtied: false,
      vMsgKey: 1,
    });

    expose({
      validate: () => {
        data.vMsgKey += 1;
        props.value.validate(props.value.modelValue);
      },
    });

    const i = getCurrentInstance();

    const validation = () => {
      const validationValue = () => {
        const validator = props.value.validate(props.value.modelValue);

        if (typeof validator == "undefined") {
          return {
            valid: undefined,
            message: "",
          };
        }
        if (typeof validator == "string") {
          return {
            valid: false,
            message: validator,
          };
        }

        if (validator === true) {
          return {
            valid: true,
            message: "",
          };
        }
        return {
          valid: undefined,
          message: "",
        };
      };

      const getValidation = validationValue();

      nextTick(() => {
        const input = i.refs.input;
        const message = getValidation.message;

        input?.setCustomValidity?.(message);
      });

      return getValidation;
    };

    const getValidation = validation();

    onMounted(() => {
      nextTick(() => {
        const input = i.refs.input;
        const message = getValidation.message;

        input._reportValidity = () => {
          data.inputDirtied = true;

          const getValidation = validation();

          data.vMsgKey += 1;

          return getValidation.valid;
        };

        input?.setCustomValidity?.(message);
      });
    });

    return function () {
      const id = `uit-${this._.uid}`;

      let getValidation = validation();

      const invalid = getValidation.valid === false && data.inputDirtied;

      const textarea = this.type == "textarea";

      return div(
        {
          ...scoping,
          class: [
            "root",
            {
              invalid,
              textarea,
            },
          ],
        },
        [
          div(
            {
              ...scoping,
              class: [
                "main fill-before-after",
                {
                  focused: data.focused,
                  "has-value": this.modelValue,
                  invalid,
                  textarea,
                },
              ],
            },
            [
              label(
                {
                  ...scoping,
                  for: id,
                  class: ["label"],
                },
                this.label
              ),

              h(textarea ? "textarea" : "input", {
                ref: "input",
                ...scoping,
                id,
                type: this.type,
                placeholder: !this.modelValue ? this.placeholder : undefined,
                class: [
                  "input",
                  {
                    textarea,
                  },
                ],
                value: this.modelValue,
                pattern: this.pattern,
                autocomplete: this.autocomplete,
                required: this.required,
                onFocus: () => {
                  data.focused = true;
                },
                onBlur: () => {
                  data.focused = false;

                  data.inputDirtied = true;

                  validation();
                },
                onInput: (e) => {
                  const value = e.currentTarget.value;

                  if (textarea) {
                    let scrollHeight = this.$refs.input.scrollHeight;

                    scrollHeight != 96 &&
                      this.$nextTick(() => {
                        this.$refs.input.style.height = "";
                        scrollHeight = this.$refs.input.scrollHeight;
                        requestAnimationFrame(() => {
                          this.$refs.input.style.height = `${scrollHeight}px`;
                        });
                      });
                  }

                  emit("update:modelValue", value);

                  e.currentTarget.setCustomValidity(getValidation.message);
                },
              }),
            ]
          ),

          invalid
            ? div(
                {
                  key: data.vMsgKey,
                  ...scoping,
                  class: ["v-msg vibrate"],
                },
                [getValidation.message]
              )
            : undefined,
        ]
      );
    };
  },
};
</script>

<style>
.main[data-uit] {
  height: 56px;
  background-color: rgb(7, 7, 24);
  border-radius: var(--ui-rounded-lg);
  position: relative;
}

.main[data-uit].textarea {
  height: initial;
  min-height: 96px;
}

.main[data-uit]::before {
  transition: 0.1s opacity linear;
  border: 2px solid var(--primary-bg);
  opacity: 0;
}

.main[data-uit]::after {
  background-color: currentColor;
  transition: 0.2s opacity linear;
  opacity: 0;
}

.can-hover .main[data-uit]:hover::after {
  opacity: 0.05;
}

.main[data-uit]:active::after {
  opacity: 0.25;
}

.main[data-uit].invalid:not(:focus-within)::before {
  border: 2px solid var(--error-bg);
  opacity: 0.25;
}

.main[data-uit]:focus-within::before {
  opacity: 0.5;
}

.main[data-uit].has-value:not(:focus-within):before {
  opacity: 0.15;
}

.label[data-uit] {
  position: absolute;
  color: currentColor;
  font-weight: 400;
  font-size: 1.15rem;
  line-height: 1.4;
  letter-spacing: 0.4px;
  padding: 0px;
  display: block;
  transform-origin: left top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  left: 0px;
  top: 0px;
  transform: translate3d(12px, 16px, 0) scale3d(1, 1, 1);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  z-index: 1;
  pointer-events: none;
  color: var(--caption-c);
}

.main[data-uit]:focus-within > .label[data-uit],
.main[data-uit].has-value > .label[data-uit] {
  transform: translate3d(12px, 6px, 0) scale3d(0.75, 0.75, 1);
  opacity: var(--t-body);
}

.input[data-uit]::placeholder{
  opacity: 0;
}

.input[data-uit]:focus::placeholder{
  opacity: 1;
}

.input[data-uit] {
  appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding: 25px 12px 8px;
  color: var(--body-c);
  letter-spacing: 0.4px;
  font-family: var(--default-font-family);
}

.input[data-uit].textarea {
  resize: vertical;
  min-height: 96px;
  margin-top: 4px;
}

.input[data-uit]:-webkit-autofill,
.input[data-uit]:-webkit-autofill:hover,
.input[data-uit]:-webkit-autofill:focus {
  box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-text-fill-color: var(--body-c) !important;
  border-radius: var(--ui-rounded-lg);
}

.input[data-uit]:autofill {
  box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-text-fill-color: var(--body-c) !important;
  border-radius: var(--ui-rounded-lg);
}

.v-msg[data-uit] {
  color: var(--error-bg);
  font-size: 0.9rem;
  text-align: right;
  padding: 0 var(--qtr-x-gutter);
  animation-delay: 0.15s;
  font-weight: 500;
  letter-spacing: 0.4px;
}
</style>
