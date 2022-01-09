<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  resolveComponent,
  resolveDirective,
  Teleport,
  watch,
  withDirectives,
} from "@vue/runtime-core";
import { nextAnimFrame, hackTabKey } from "/src/fendui/utils/core";
import props from "./props";
import { ControlledFocus } from "/src/fendui/utils/controlledFocus";
import eventKey from "/src/fendui/utils/eventKey";
import { vShow } from "@vue/runtime-dom";

export default defineComponent({
  name: "UiOverlay",
  props: props(),
  emits: ["update:modelValue", "active:true", "active:false"],
  setup(p, { emit, slots }) {
    const data = reactive({
      manualVmodel: false,
      overlayActive: false,
      transitionPL: {},
      tabindex: "-1",
      zIndex: undefined,
      previousFocus: false,
      slotsEl: {
        default: null,
        activator: null,
      },

      // stop repeated callbacks
      debounce: {
        beforeUnmount: 0,
        beforeMount: 0,
        mounted: 0,
      },
    });

    const i = getCurrentInstance();

    const fendui = inject("$fendui");

    const props = reactive({
      value: p,
      get vmodel() {
        return this.value.modelValue;
      },
    });

    data.manualVmodel = props.vmodel || false;
    data.overlayActive = props.vmodel || false;

    const isAccessible = props.value.accessible;

    const vmodel = computed(() => {
      if (typeof props.vmodel == "boolean") {
        return props.vmodel;
      }
      return data.manualVmodel;
    });

    watch(
      () => props.vmodel,
      (n, o) => {
        if (n != o) data.manualVmodel = n;
      }
    );

    const beforeMount = (el) => {
      if (!vmodel.value) {
        return;
      }

      data.slotsEl.default = el;

      data.previousFocus = document.activeElement;

      if (data.previousFocus == el) {
        data.previousFocus = null;
      }
    };

    const mounted = (el) => {
      if (!vmodel.value) {
        return;
      }

      data.slotsEl.default = el;

      data.tabindex = "0";

      fendui.overlays.add = {
        uid: uid.value,
        value: {
          ...methods.value,
          minZIndex: props.value.minZIndex,
          zIndex: props.value.zIndex,
          focus,
          slotsEl: data.slotsEl,
        },
        htmlActiveClass: props.value.htmlActiveClass,
      };

      data.zIndex = fendui.overlays.active[uid.value]?.zIndex || "auto";

      nextAnimFrame(() => {
        props.value.focusContent && el.focus?.();
      });
    };

    const beforeUnmount = () => {
      // if (data.debounce.beforeUnmount) {
      //   return;
      // }

      // data.debounce.beforeUnmount = true;

      if (data.previousFocus) {
        if (data.previousFocus != document.body) {
          data.previousFocus?.focus?.({ preventScroll: true });
          data.previousFocus = 0;
        } else {
          findNextOverlay();
        }
      } else {
        findNextOverlay();
      }

      const controlledFocus = new ControlledFocus({
        uid: uid.value,
      });

      controlledFocus.clear();

      fendui.overlays.remove({
        uid: uid.value,
        htmlActiveClass: props.value.htmlActiveClass,
      });

      coreMethods.value.close();

      nextTick(async () => {
        await nextAnimFrame();

        data.debounce.beforeUnmount = true;
      });
    };

    watch(
      () => vmodel.value,
      async (n) => {
        if (n) {
          data.tabindex = "0";
        } else {
          data.tabindex = "-1";
        }

        data.overlayActive = n;

        if (props.value.alwaysRender) {
          if (n) {
            const el = i.refs.root;

            beforeMount(el);
            await nextTick();
            await nextAnimFrame();
            mounted(el);
          } else {
            beforeUnmount();
          }
        }
      }
    );

    const uid = computed(() => {
      return props.value.name || `ui-overlay-${i.uid}`;
    });

    const getZindex = computed(() => {
      return (fendui.overlays.active[uid.value] || {}).zIndex || "auto";
    });

    const coreMethods = computed(() => {
      const toggle = (v) => {
        if (
          data.transitionPL?.phase &&
          !/(after)E|L/.test(data.transitionPL.state)
        ) {
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

    const methods = computed(() => ({
      ...coreMethods.value,
      ...(props.value.methods || {}),
    }));

    watch(
      () => props.value.disabled,
      (n) => {
        n && coreMethods.value.close();
      }
    );

    watch(
      () => props.value.htmlActiveClass,
      async (n, o) => {
        if (fendui.overlays.active[uid.value]) {
          fendui.overlays.update({
            uid: uid.value,
            value: {
              htmlActiveClass: n,
            },
          });
        }

        if (o && o != n) {
          try {
            await nextAnimFrame();

            document.documentElement.classList.remove(...o?.split(" "));
          } catch (e) {
            if (e) {
              console.warn(e);
            }
          }
        }

        if (n) {
          try {
            await nextAnimFrame();

            document.documentElement.classList.add(...n?.split(" "));
          } catch (e) {
            if (e) {
              console.warn(e);
            }
          }
        }
      }
    );

    const payload = computed(() => ({
      transition: data.transitionPL,
      ...(methods.value || {}),
      uid: uid.value,
      zIndex: getZindex.value,
      active: data.overlayActive,
    }));

    const el = {
      teleport: (d, c) => h(Teleport, d, c),
      transition: (d, c) => h(resolveComponent("ui-transition"), d, c),
    };

    const getTransition = computed(() => {
      if (slots?.transition?.(payload.value)) {
        return false;
      }

      if (typeof props.value.transition == "object") {
        return props.value.transition;
      }

      return props.value.transition
        ? {
            config: "fade",
          }
        : false;
    });

    const focus = async () => {
      data.tabindex = "0";

      data.slotsEl.default?.focus?.();

      await nextTick();
    };

    const findNextOverlay = () => {
      fendui.overlays.order.filter((x) => x.uid != uid.value)?.[0]?.focus?.();
    };

    watch(
      () => props.value.zIndex,
      (n) => {
        if (typeof n == "string" && n != data.zIndex) {
          data.zIndex = n;
        }
      }
    );

    return () => {
      const defaultSlot = ((slots.transition || slots.default || (() => {}))?.({
        ...payload.value,
      }) || [])[0];

      const activatorSlot = ((slots.activator || (() => {}))?.({
        ...payload.value,
      }) || [])[0];

      const hDefaultSlot = () => {
        const slotContent = () => {
          const vNode = h(defaultSlot || "slot", {
            ref: "root",

            "data-ui-overlay": props.value.useStyle ? "" : undefined,

            tabindex: props.value.focusContent ? data.tabindex : undefined,

            role:
              defaultSlot.props?.["role"] || isAccessible
                ? props.value.accessibleRole
                : undefined,

            id:
              defaultSlot.props?.["id"] || isAccessible ? uid.value : undefined,

            ...defaultSlot.props,

            style: {
              zIndex: data.zIndex,
              ...(defaultSlot.props || { style: {} }).style,
            },

            class: props.value.useStyle
              ? [
                  "root",
                  [
                    `${fendui.theme.is}-theme`,
                    fendui.cssUtilsClassList,
                    fendui.breakpoints.classList,
                  ],
                ]
              : undefined,

            "onUit-before-enter": (el) => {
              beforeMount(el);
            },

            "onUit-enter": (el) => {
              mounted(el);
            },

            "onUit-before-leave": () => {
              beforeUnmount();
            },

            "onUit-after-leave": (el) => {
              data.zIndex = props.value.zIndex || "auto";
              data.zIndex = props.value.zIndex || "";
            },

            onVnodeBeforeMount(vnode) {
              defaultSlot.props?.onVnodeBeforeMount?.(vnode);

              beforeMount(vnode.el);
            },

            onVnodeMounted: (vnode) => {
              defaultSlot.props?.onVnodeMounted?.(vnode);

              mounted(vnode.el);
            },
            onVnodeBeforeUnmount: (vnode) => {
              defaultSlot.props?.onVnodeBeforeUnmount?.(vnode);
              beforeUnmount();
            },
            onKeydown: (e) => {
              defaultSlot.props?.onKeydown?.(e);

              const key = eventKey(e);

              hackTabKey(e, (_, evtKey) => {
                if (props.value.disableTabAction || evtKey != "tab") {
                  return;
                }

                let controlledFocus = new ControlledFocus({
                  root: e.currentTarget,
                  children: "*",
                  uid: i.uid,
                });

                controlledFocus[e.shiftKey ? "backward" : "forward"]();

                controlledFocus.destroy();

                controlledFocus = 0;

                data.tabindex != "-1" && (data.tabindex = "-1");
              });

              if (key == "esc" && !props.value.disableEscAction) {
                e.preventDefault();
              }
            },
            onKeyup: (e) => {
              // defaultSlot.props?.onKeyup?.(e);

              const key = eventKey(e);

              if (key == "esc" && !props.value.disableEscAction) {
                e.preventDefault();

                coreMethods.value.close();
              }
            },

            onBlur: (e) => {
              defaultSlot.props?.onBlur?.(e);

              if (
                !vmodel.value &&
                (!e.relatedTarget || data.previousFocus == document.body)
              ) {
                findNextOverlay();
              }
            },
          });

          if (props.value.alwaysRender) {
            return withDirectives(vNode, [[vShow, data.overlayActive]]);
          }

          return vNode;
        };

        if (typeof slots.transition == "function") {
          return slotContent();
        }
        return props.value.alwaysRender
          ? slotContent()
          : data.overlayActive
          ? slotContent()
          : null;
      };

      const hActivatorSlots = () => {
        const activator = activatorSlot;

        return h(activator, {
          "aria-haspopup":
            activator.props?.["aria-haspopup"] || isAccessible
              ? /true|false/.test(props.value.accessibleRole)
                ? "dialog"
                : props.value.accessibleRole
              : undefined,
          "aria-expanded":
            activator.props?.["aria-expanded"] || isAccessible
              ? `${data.overlayActive}`
              : undefined,
          "aria-controls":
            activator.props?.["aria-controls"] || isAccessible
              ? uid.value
              : undefined,
          onVnodeMounted: (vnode) => {
            activator.props?.onVnodeBeforeMount?.(vnode);

            data.slotsEl.activator = vnode.el;
          },
        });
      };

      return defaultSlot || activatorSlot
        ? [
            hActivatorSlots() || null,
            el.teleport(
              {
                to: props.value.to || "body",
                disabled: props.value.disabled,
              },
              [
                getTransition.value
                  ? el.transition(
                      {
                        ...(props.value.transition || {
                          config: false,
                        }),

                        "onUit-after-leave": (el) => {
                          data.zIndex = props.value.zIndex || "auto";
                          data.zIndex = props.value.zIndex || "";
                        },
                      },
                      {
                        default: (transitionPL) => {
                          data.transitionPL = transitionPL;

                          return hDefaultSlot();
                        },
                      }
                    )
                  : hDefaultSlot(),
              ]
            ),
            slots.prepend?.({ ...payload.value }),
          ]
        : null;
    };
  },
});
</script>

<style>
.root[data-ui-overlay] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  isolation: isolate;
}
</style>
