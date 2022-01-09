<script>
import {
  computed,
  defineComponent,
  h,
  nextTick,
  reactive,
  resolveComponent,
} from "@vue/runtime-core";
import props from "./props";
import { setScaleAndOrigin } from "./utils";

export default defineComponent({
  name: "UiContainer",
  props: props(),
  emits: ["update:modelValue", "active:true", "active:false"],
  setup(p, { slots, emit }) {
    const data = reactive({
      activatorBound: {},
      transitionState: "",
      manualVmodel: false,

      config: {
        transform: "",
        origin: "",
        top: "",
        left: "",
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

        await setScaleAndOrigin({
          props: {
            ...props.value,
          },
          event: v,
          data,
        });

        await nextTick();

        // nextAnimFrame(() => {
        emit("update:modelValue", value);
        emit(`active:${value}`);
        data.manualVmodel = value;
        // });
      };

      return {
        toggle,
        open: (e) => toggle(e, true),
        close: (e) => toggle(e, false),
      };
    });

    const payload = computed(() => {
      return {
        ...coreMethods.value,
        hasEntered: /afterE/.test(data.transitionState) && vmodel.value,
      };
    });

    return () => {
      return modal(
        {
          transition: {
            config: {
              enter: {
                from: {
                  transform: data.config.transform,
                  opacity: 1,
                },
              },

              leave: {
                to: {
                  transform: data.config.transform,
                  opacity: 1,
                },
              },

              duration: "250ms",
              ease: "ease-in-out",
              origin: data.config.origin,
            },
          },

          modelValue: vmodel.value,
          "onUpdate:modelValue": (e) => {
            emit("update:modelValue", e);

            if (!e) {
              data.transitionState = "beforeLeave";
            }

            data.manualVmodel = e;
          },

          backdrop: 0,
        },
        {
          default: (pay) => {
            const slot =
              slots?.default?.({ ...pay, ...payload.value })?.[0] || null;

            if (slot) {
              data.transitionState = pay.transition.state;

              return h(slot, {
                class: ["ui-container", slot.props.class || []],
                style: {
                  ...(slot.props.class || {}),
                  "--ui-top": data.config.top,
                  "--ui-left": data.config.left,
                },
              });
            }
            return slot;
          },
          activator: (pay) => {
            const slot =
              slots?.activator?.({ ...pay, ...payload.value })?.[0] || null;

            return slot ? h(slot) : null;
          },
        }
      );
    };
  },
});
</script>

<style>
.ui-container {
  position: fixed;
  top: var(--ui-top);
  left: var(--ui-left);
}
</style>
