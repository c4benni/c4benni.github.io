<script>
import { computed, reactive } from "@vue/reactivity";
import props from "./props";
import { defineComponent, h, resolveComponent } from "@vue/runtime-core";
import { GetBackdrop } from "/src/fendui/utils/componentsUtils";

import { watch } from "@vue/runtime-core";

export default defineComponent({
  name: "UiSheet",
  props: props(),
  emits: ["update:modelValue", "intersection-point", "scrolled-out"],
  setup(p, { emit, slots, attrs }) {
    const data = reactive({
      addWillChange: false,
      backdropOpacity: undefined,
      ratio: null,
    });

    const props = computed(() => {
      return {
        ...p,
        ...attrs,
      };
    });

    const scoping = {
      "data-ui-sheet":
        props.value.useStyle && props.value.isSheet ? "" : undefined,
    };

    const getBackdrop = computed(() => GetBackdrop(props.value.backdrop));

    watch(
      () => getBackdrop.value.opacity,
      (n) => {
        data.backdropOpacity = n;
      }
    );

    if (data.backdropOpacity === null) {
      data.backdropOpacity = getBackdrop.value.opacity;
    }

    const div = (d, c) => h("div", d, c);

    const intersection = (d, c) => h(resolveComponent("ui-intersection"), d, c);

    const modal = (d, c) => h(resolveComponent("UiModal"), d, c);

    const thresholdLength = 200;

    return () => {
      return modal(
        {
          wrapContent: props.value.isSheet,
          rootData: {
            ...scoping,
            style:
              data.ratio != 1 && !/^s/.test(data.backdropOpacity)
                ? {
                    "--ratio": /^s/.test(data.backdropOpacity)
                      ? "0"
                      : `${data.backdropOpacity}`,
                  }
                : undefined,
            class: [
              "hide-scrollbar",
              {
                "will-change": data.addWillChange,
              },
            ],
          },
          contentData: {
            ...scoping,
          },
          backdropData: { ...scoping },
          // ...attrs,
          "onUpdate:modelValue": (e) => {
            if (e) {
              data.backdropOpacity = getBackdrop.value.opacity;
            }

            emit("update:modelValue", e);
          },
          modelValue: props.value.modelValue,
          htmlActiveClass:
            props.value.htmlActiveClass ||
            attrs.htmlActiveClass ||
            "ui-sheet-active hide-scrollbar",
          transition: {
            config: {
              from: {
                transform: "translate3d(0,100%,0)",
              },
              duration:
                data.backdropOpacity == "scrolled-out" ? "1ms" : "300ms",
              ease: "ease",
            },
          },
          backdrop: /string|number/.test(typeof data.backdropOpacity)
            ? {
                ...getBackdrop.value,
                opacity: /^s/.test(data.backdropOpacity)
                  ? "0"
                  : `'var(--ratio, ${getBackdrop.value.opacity})'`,
              }
            : /^s/.test(data.backdropOpacity)
            ? "0"
            : props.value.backdrop,
        },
        {
          ...slots,
          default: (pay) => {
            const slot = slots.default?.({ ...pay, ratio: data.ratio })?.[0];
            if (!slot) {
              return null;
            }
            return h(
              slot,
              {
                ...slot.props,
                "data-ui-sheet": "",
                class: [slot.props?.class || [], "content"],
              },
              [
                props.value.isSheet
                  ? [0].map(() => {
                      return /afterE/i.test(pay.transition.state)
                        ? intersection(
                            {
                              config: {
                                threshold: [
                                  ...Array.from(
                                    {
                                      length: thresholdLength,
                                    },
                                    (_, i) => i * (1 / thresholdLength)
                                  ),
                                  1,
                                ],
                              },
                            },
                            {
                              default: (intPay) => {
                                emit("intersection-point", intPay);

                                if (!intPay.inactive) {
                                  data.ratio = intPay.intersectionRatio;

                                  if (!intPay.isIntersecting) {
                                    data.backdropOpacity = "scrolled-out";

                                    pay.close();

                                    return null;
                                  }

                                  if (pay.active) {
                                    data.backdropOpacity =
                                      +getBackdrop.value.opacity *
                                      intPay.intersectionRatio;
                                  }
                                }

                                return div({
                                  ...scoping,
                                  "aria-hidden": "true",
                                  class: ["observer"],
                                });
                              },
                            }
                          )
                        : null;
                    })
                  : null,
                slot.children,
              ]
            );
          },
        }
      );
    };
  },
});
</script>

<style>
.ui-sheet-active {
  height: -webkit-fill-available;
  height: -moz-available;
  height: stretch;
  max-height: -webkit-fill-available;
  max-height: -moz-available;
  max-height: stretch;
  overflow: hidden;
}

.root[data-ui-modal][data-ui-sheet] {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  isolation: isolate;
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden auto;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
  outline: none;
}

.root[data-ui-modal][data-ui-sheet]::before {
  content: "";
  height: 100%;
  width: 100%;
  display: block;
  scroll-snap-align: end;
}

.backdrop[data-ui-modal][data-ui-sheet] {
  position: fixed;
  top: inherit;
  width: inherit;
  height: inherit;
  background: var(--background);
  opacity: var(--opacity);
  z-index: -1;
  transition: 0.35s opacity linear;
}

.content-wrapper[data-ui-modal][data-ui-sheet] {
  display: grid;
  align-items: flex-end;
  scroll-snap-align: start;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
  -ms-scroll-chaining: none;
  overscroll-behavior: contain;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

.content[data-ui-sheet] {
  position: relative;
  pointer-events: initial;
}

.observer[data-ui-sheet] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: transparent;
  border-radius: inherit;
}
</style>
