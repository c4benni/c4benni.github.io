<script>
import {
  computed,
  h,
  resolveComponent,
  resolveDynamicComponent,
} from "@vue/runtime-core";

const root = (d, c) => h(resolveComponent("UiClick"), d, c);

const outlineDefault = {
  opacity: "0.35",
  color: "currentColor",
  stroke: "1.25px",
};

const fillDefault = {
  opacity: ".1",
  color: "currentColor",
};

export default {
  name: "UiBtn",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    to: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: "md",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    outlineConfig: {
      type: Object,
      default: () => outlineDefault,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    fillConfig: {
      type: Object,
      default: () => fillDefault,
    },
    important: Boolean,
    case: {
      type: String,
      default: undefined,
    },
    block: Boolean,
    icon: Boolean,
    activeScale: {
      type: [String, Number],
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    background: {
      type: String,
      default: undefined,
    },
  },
  setup(p) {
    const props = computed(() => p);

    const setCSSVariable = (str) => {
      if (/^--\w+/i.test(str)) {
        return `var(${str})`;
      }
      return str;
    };

    const getFill = computed(() => {
      if (!props.value.filled && !props.value.text && !props.value.outlined) {
        return {};
      }

      const output = fillDefault;

      const fillConfig = props.value.fillConfig;

      if (typeof fillConfig == "object") {
        output.opacity = fillConfig.opacity || output.opacity;
        output.color = fillConfig.color || output.color;
      }

      output.color = setCSSVariable(output.color);

      return output;
    });

    const getOutline = computed(() => {
      if (!props.value.outlined) {
        return {};
      }

      const output = outlineDefault;

      const outlineConfig = props.value.outlineConfig;

      if (typeof outlineConfig == "object") {
        output.opacity = outlineConfig.opacity || output.opacity;
        output.color = outlineConfig.color || output.color;
        output.stroke = outlineConfig.stroke || output.stroke;
      }

      output.color = setCSSVariable(output.color);

      return output;
    });

    return function () {
      return root(
        {
          range: this.important ? 100 : 0,
          self: true,
        },
        {
          default: (payload) => {
            return h(
              resolveDynamicComponent(this.to ? "router-link" : this.tag),
              {
                to: this.to || undefined,
                class: [
                  "ui-btn",
                  {
                    __important: this.important,
                    __outlined: this.outlined,
                    __readonly: this.readonly,
                    __filled: this.filled,
                    __icon: this.icon,
                    __block: this.block && !this.icon,
                    "__case-caps": /capitalize/i.test(this.case),
                    "__case-upper": /^caps$|^uppercase$|^upper$/i.test(
                      this.case
                    ),
                    "__case-lower": /^low$|^lowercase$|^lower$/i.test(
                      this.case
                    ),
                  },
                ],
                style: {
                  ...(this.text || this.outlined
                    ? {
                        "--fill-opacity": getFill.value.opacity || "",
                        "--fill-background": getFill.value.color || "",
                      }
                    : {}),
                  "--active-scale": setCSSVariable(this.activeScale || ""),
                  "--ui-color": setCSSVariable(this.color || ""),
                  "--ui-background": setCSSVariable(this.background || ""),
                },
              },
              {
                default: () => {
                  return [
                    this.$slots.default?.({
                      ...payload,
                    }),

                    this.outlined &&
                      h("span", {
                        "aria-hidden": "true",
                        class: "outline fill-before",
                        style: {
                          "--outlined-opacity": this.outlined
                            ? getOutline.value.opacity
                            : undefined,
                          "--outlined-stroke": this.outlined
                            ? getOutline.value.stroke
                            : undefined,
                          "--outlined-color": this.outlined
                            ? getOutline.value.color
                            : undefined,
                        },
                      }),
                  ];
                },
              }
            );
          },
        }
      );
    };
  },
};
</script>

<style>
.ui-btn {
  --ui-height: 48px;
  --ui-padding: 0px 20px;
  --ui-font: normal 500 1.25rem var(--default-font-family);
  --ui-radius: var(--ui-rounded);
  --ui-color: initial;
  --ui-background: initial;

  text-transform: var(--ui-case);
  background: var(--ui-background);
  color: var(--ui-color);
  height: var(--ui-height);
  font: var(--ui-font);
  padding: var(--ui-padding);
  border-radius: var(--ui-radius);
  border: none;
  -webkit-appearance: none;
  overflow: hidden;
  position: relative;
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  word-spacing: 0.8px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  outline: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: 0.2s transform linear, 0.1s opacity, 0.1s filter;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  isolation: isolate;
  white-space: nowrap;
}

.ui-btn.__case-upper {
  text-transform: uppercase;
}

.ui-btn.__case-lower {
  text-transform: lowercase;
}

.ui-btn.__case-caps {
  text-transform: capitalize;
}

.ui-btn.sm {
  --ui-height: 42px;
  --ui-padding: 0px 5px;
  --ui-font: normal 500 0.95rem var(--default-font-family);
  --ui-radius: var(--ui-rounded-sm);
}

.ui-btn.lg {
  --ui-height: 56px;
  --ui-padding: 0px 30px;
  --ui-font: normal 600 1.35rem var(--default-font-family);
  --ui-radius: var(--ui-rounded-lg);
}

.ui-btn.__filled {
  background: 0 0 !important;
}

.ui-btn.__filled:not(.Active):before {
  opacity: 0.15;
  opacity: var(--fill-opacity, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  /* .ui-btn.__filled:not(:hover):not(.Active):before {
    opacity: 0.2;
  } */
  .ui-btn.__outlined.__filled:not(.Active):hover:before {
    opacity: 0.5;
  }
}

.ui-btn.__readonly {
  pointer-events: none !important;
}

.ui-btn:after,
.ui-btn:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  color: inherit;
  transition: opacity 0.1s linear;
  z-index: -1;
}

.ui-btn > span.outline {
  position: absolute;
  top: 0;
  height: 100%;
  left: calc(var(--outlined-stroke) / 2);
  width: calc(100% - var(--outlined-stroke));
  border-radius: inherit;
  pointer-events: none;
  border: var(--outlined-stroke) solid var(--outlined-color);
  opacity: var(--outlined-opacity);
  transition: none;
  transform: none !important;
}

.ui-btn:after {
  transform: scale(0.995);
  border: 2px solid;
  opacity: 0;
  transition: 0s;
}

.ui-btn:before {
  background-color: var(--fill-background, currentColor);
  opacity: var(--fill-opacity, 0);
  z-index: -1;
  border: 1px solid currentColor;
}

.ui-btn:focus-visible:after,
.ui-btn[tabindex="-1"]:focus-within:after {
  opacity: var(--t-disabled);
}

.ui-btn:focus-visible::before,
.ui-btn[tabindex="-1"]:focus-within:after {
  transition: 0s !important;
}

.ui-btn.__outlined.focus-visible:after,
.ui-btn.__outlined:focus-visible:after,
.ui-btn[tabindex="-1"].__outlined:focus-within:after {
  opacity: var(--t-caption);
}

@media (hover: hover) and (pointer: fine) {
  .ui-btn:hover:before {
    opacity: 0.15;
  }

  .ui-btn[focus-within]:before {
    opacity: 0.25;
  }

  .ui-btn:focus-within:before {
    opacity: 0.2;
  }

  .ui-btn.Active:before {
    opacity: 0.25;
  }
}

.ui-btn.Active:before {
  opacity: 0.2;
  transition: 0s;
}

.ui-btn.slow-active,
.ui-btn.slow-active:before {
  transition-duration: 0.15s !important;
  transition-timing-function: linear !important;
}

.ui-btn.Active {
  transition: transform 0.2s linear;
  transform: scale3d(0.995, 0.995, 1);
}

.ui-btn.__icon.Active,
.ui-btn.__sm.Active {
  transition: transform 0.2s linear;
  transform: scale3d(0.99, 0.99, 1);
}

.ui-btn.__icon {
  --ui-padding: 0;
  height: var(--ui-height);
  width: var(--ui-height);
  border-radius: 50%;
}

.ui-btn.__important {
  touch-action: none;
}
</style>
