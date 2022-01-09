<script>
import {
  defineComponent,
  resolveComponent,
  reactive,
  computed,
  h,
  watch,
  nextTick,
  onMounted,
  resolveDynamicComponent,
  withDirectives,
  getCurrentInstance,
} from "@vue/runtime-core";
import { nextAnimFrame } from "/src/fendui/utils/core";
import props from "./props";
import { vShow } from "@vue/runtime-dom";
import { inheritProps } from "/src/fendui/framework/props/utils";

import UiOverlayProps from "../UiOverlay/props";
import { GetBackdrop } from "/src/fendui/utils/componentsUtils";

export default defineComponent({
  name: "UiModal",
  props: props(),
  emits: ["update:modelValue", "active:true", "active:false"],
  setup(p, { emit, slots }) {
    const data = reactive({
      manualVmodel: false,
      dialogActive: false,
      transitionState: "",
      transitionPhase: "",
    });

    const i = getCurrentInstance();

    const props = reactive({
      value: p,
      get vmodel() {
        return this.value.modelValue;
      },
    });

    const vmodel = computed(() => {
      if (typeof props.vmodel == "boolean") {
        return props.vmodel;
      }
      return data.manualVmodel;
    });

    const renderDialog = computed(() => {
      return vmodel.value || /afterE|beforeL|^le/.test(data.transitionState);
    });

    const payload = computed(() => ({
      active: data.dialogActive,
      ...coreMethods.value,
      transition: {
        state: data.transitionState,
        phase: data.transitionPhase,
      },
    }));

    const div = (d, c) => h("div", d, c);

    const transition = (d, c) => h(resolveComponent("UiTransition"), d, c);

    const coreMethods = computed(() => {
      const toggle = (v) => {
        if (data.transitionState && !/(after)E|L/.test(data.transitionState)) {
          return;
        }
        let value = v;
        if (typeof v != "boolean") {
          value = !vmodel.value;
        }

        emit("update:modelValue", value);
        emit(`active:${value}`);
        data.manualVmodel = value;
      };

      return {
        toggle,
        open: () => toggle(true),
        close: () => toggle(false),
      };
    });

    const getBackdrop = computed(() => GetBackdrop(props.value.backdrop));

    const getTransition = computed(() => {
      if (props.value.transition === false) {
        return null;
      }

      if (typeof props.value.transition == "object") {
        return props.value.transition;
      }

      return {};
    });

    watch(
      () => props.vmodel,
      (n) => {
        data.manualVmodel = n;
      }
    );

    watch(
      () => vmodel.value,
      async (n) => {
        if (n) {
          await nextAnimFrame();

          await nextAnimFrame();

          if (props.value.wrapContent) {
            i.refs.root?.scrollTo(0, i.refs.contentWrapper?.clientHeight || 0);
            await nextAnimFrame();
          }
        }

        data.dialogActive = n;
      }
    );

    watch(
      () => data.dialogActive,
      (n) => {
        !n && coreMethods.value.close();
      }
    );

    onMounted(() => {
      if (props.value.modelValue) {
        data.manualVmodel = true;

        data.transitionState = "beforeEnter";

        const sleepAndOpen = async () => {
          await nextAnimFrame();

          data.dialogActive = true;
        };

        sleepAndOpen();
      }
    });

    return () => {
      const inheritedProps = inheritProps({
        parent: UiOverlayProps(),
        selfProps: { ...props.value },
      });

      return h(
        resolveComponent("UiOverlay"),
        {
          ...inheritedProps,
          transition: false,
          modelValue: renderDialog.value,
          "onUpdate:modelValue": (e) => {
            coreMethods.value.toggle(e);
          },
          alwaysRender: props.value.alwaysRender,
          zIndex: props.value.zIndex || !renderDialog.value ? "" : undefined,
        },
        {
          default: (overlayPay) => {
            const defaultSlot =
              slots.default?.({ ...overlayPay, ...payload.value })?.[0] || null;

            const content = () => {
              if (!defaultSlot) {
                return null;
              }

              const vNode = h(defaultSlot, {
                "data-is-visible": data.dialogActive,
              });

              if (props.value.alwaysRender) {
                return withDirectives(vNode, [[vShow, data.dialogActive]]);
              }

              return data.dialogActive ? vNode : null;
            };

            const modalTransition = () => {
              const transitionSlot =
                slots.transition?.({ ...overlayPay, ...payload.value })?.[0] ||
                null;

              return transitionSlot
                ? h(transitionSlot, {
                    "onState-change": (e) => {
                      data.transitionState = e;
                      data.transitionPhase = /enter|appear/i.test(e)
                        ? "enter"
                        : "leave";
                    },
                  })
                : getTransition.value === null
                ? content()
                : transition(
                    {
                      config: [
                        {
                          from: {
                            opacity: "0",
                            transform: "scale3d(1.05,1.05,1)",
                          },
                          duration: "150ms",
                        },
                      ],
                      ...getTransition.value,
                    },
                    {
                      default: (transPay) => {
                        data.transitionState = transPay.state;
                        data.transitionPhase = transPay.phase;

                        return content();
                      },
                    }
                  );
            };

            return h(
              resolveDynamicComponent(props.value.tag || "div"),
              {
                ref: "root",
                "data-ui-modal": "",
                ...props.value.rootData,
              },
              [
                slots.backdrop?.({ ...overlayPay, ...payload.value })?.[0] ||
                getBackdrop.value
                  ? transition(
                      {
                        config: [
                          `fade(0,${getBackdrop.value.opacity})`,
                          {
                            duration:
                              getTransition.value === null
                                ? "1"
                                : getBackdrop.value.duration,
                          },
                        ],
                      },
                      {
                        default: () => {
                          const vNode = div({
                            "data-ui-modal": "",
                            "data-is-visible": data.dialogActive,
                            ...props.value.backdropData,
                            class: ["backdrop"],
                            style: {
                              "--background": `${getBackdrop.value.background}`,
                              "--opacity": `${getBackdrop.value.opacity.replace(
                                /^'|'$|^"|"$/g,
                                ""
                              )}`,
                            },
                            onClick: overlayPay.close,
                          });

                          if (props.value.alwaysRender) {
                            return withDirectives(vNode, [
                              [vShow, data.dialogActive],
                            ]);
                          }
                          return data.dialogActive ? vNode : null;
                        },
                      }
                    )
                  : null,

                props.value.wrapContent
                  ? div(
                      {
                        ref: "contentWrapper",
                        "data-ui-modal": "",
                        ...props.value.contentData,
                        class: ["content-wrapper"],
                      },
                      [
                        slots.contentPrepend?.({
                          ...overlayPay,
                          ...payload.value,
                        }) || null,
                        modalTransition(),
                        slots.contentAppend?.({
                          ...overlayPay,
                          ...payload.value,
                        }) || null,
                      ]
                    )
                  : modalTransition(),
              ]
            );
          },

          activator: (overlayPay) => {
            return (
              slots.activator?.({ ...overlayPay, ...payload.value })?.[0] ||
              null
            );
          },
        }
      );
    };
  },
});
</script>

<style>
.backdrop[data-ui-modal] {
  position: absolute;
  top: inherit;
  width: inherit;
  height: inherit;
  background: var(--background);
  opacity: var(--opacity);
  z-index: -1;
  transition: 0.15s opacity;
}
</style>
