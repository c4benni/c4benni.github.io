<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  h,
  nextTick,
  resolveComponent,
} from "@vue/runtime-core";
import { nextAnimFrame } from "/src/fendui/utils/core";
import props from "./props";

import { setPosition } from "./utils";

export default defineComponent({
  name: "UiPosition",
  props: props(),
  emits: ["update:modelValue", "active:true", "active:false"],
  setup(p, { emit, slots }) {
    const data = reactive({
      defaultPayload: null,
      transitionState: "",
      manualVmodel: false,

      contentScale: { x: null, y: null },

      contentOrigin: { x: "center", y: "center" },

      rootInfo: {},

      activatorInfo: {
        bound: {},
      },

      contentInfo: {},

      elPositions: {
        left: undefined,
        top: undefined,
      },
    });

    const modal = (d, c) => h(resolveComponent("UiModal"), d, c);

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

    const size = computed(() => {
      const parsedHeight = parseFloat(props.value.height || 0);
      const parsedWidth = parseFloat(props.value.width || 0);
      return {
        cssWidth: `${parsedWidth}px`,
        cssHeight: `${parsedHeight}px`,
        parsedHeight,
        parsedWidth,
      };
    });

    const getOffset = computed(() => {
      const output = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        x: 0,
        y: 0,
      };

      const offset = props.value.offset;

      if (typeof offset == "object") {
        return {
          x: offset.x || output.x,
          y: offset.y || output.y,
          top: offset.top || offset.y || output.top,
          right: offset.right || offset.x || output.right,
          bottom: offset.bottom || offset.y || output.bottom,
          left: offset.left || offset.x || output.left,
        };
      }

      if (/string|number/.test(typeof offset)) {
        for (let key in output) {
          let parsedKey = parseFloat(offset);

          isNaN(parsedKey) && (parsedKey = 0);

          output[key] = parsedKey;
        }
      }

      return output;
    });

    const getInset = () => {
      const output = { x: false, y: false };

      const inset = props.value.inset;

      if (typeof inset == "object") {
        return {
          x: inset.x,
          y: inset.y,
        };
      }
      return inset ? { x: true, y: true } : output;
    };

    const coreMethods = computed(() => {
      const toggle = async (v, fB) => {
        if (data.transitionState && !/(after)E|L/.test(data.transitionState)) {
          return;
        }
        const getV = v || fB;

        let value = getV;
        if (typeof getV != "boolean") {
          value = !vmodel.value;
        }

        if (value) {
          data.contentOrigin = { x: "center", y: "center" };

          await setPosition({
            props: {
              ...props.value,
            },
            event: v,
            data,
            offset: getOffset.value,
            inset: getInset(),
          });

          await nextTick();
        }

        nextAnimFrame(() => {
          emit("update:modelValue", value);
          emit(`active:${value}`);
          data.manualVmodel = value;
        });
      };

      return {
        toggle,
        open: (e) => toggle(e, true),
        close: (e) => toggle(e, false),
      };
    });

    const payload = computed(() => ({
      ...coreMethods.value,
      active: vmodel.value,
    }));

    const getSlot = (slot) => {
      const output = {};

      output[slot] = (pay) => {
        const $slot =
          slots?.[slot]?.({ ...pay, ...payload.value })?.[0] || null;

        return $slot ? h($slot) : null;
      };

      return output;
    };

    return () => {
      return modal(
        {
          transition: {
            ...(props.value?.transition || {}),
            config: props.value.containerTransition
              ? [
                  {
                    duration: "250ms",
                    ease: "ease-in-out",
                  },
                  props.value.transition?.config || {},
                  {
                    enter: {
                      from: {
                        transform: `scale3d(${data.contentScale.x},${data.contentScale.y},1)`,
                        opacity: "0",
                      },
                    },
                    leave: {
                      to: {
                        transform: `scale3d(${data.contentScale.x},${data.contentScale.y},1)`,
                        opacity: "0",
                      },
                    },
                    origin: `${data.contentOrigin.x} ${data.contentOrigin.y}`,
                    willChange: "transform, opacity",
                  },
                ]
              : props.value.transition?.config,
          },
          "onUpdate:modelValue": (e) => {
            emit("update:modelValue", e);
            data.manualVmodel = e;
          },
          modelValue: vmodel.value,
          backdrop: {
            opacity: "0",
          },
        },
        {
          activator: (pay) => {
            const slot =
              slots?.activator?.({ ...pay, ...payload.value })?.[0] || null;

            return slot ? h(slot) : null;
          },
          default: (pay) => {
            const slot =
              slots?.default?.({ ...pay, ...payload.value })?.[0] || null;

            if (slot) {
              data.transitionState = pay.transition.state;
              return h(slot, {
                class: ["ui-position", slot.props.class || []],
                style: {
                  ...(slot.props.style || {}),
                  "--ui-height": size.value.cssHeight,
                  "--ui-width": size.value.cssWidth,
                  "--ui-top": `${data.elPositions.top}px`,
                  "--ui-left": `${data.elPositions.left}px`,
                },
              });
            }
            return slot;
          },
        }
      );
    };
  },
});
</script>

<style>
.ui-position {
  position: absolute;
  top: var(--ui-top);
  left: var(--ui-left);
}
</style>
