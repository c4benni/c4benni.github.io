<script>
import { computed, reactive } from "@vue/reactivity";
import { defineComponent, h, resolveComponent } from "@vue/runtime-core";

import props from "./props";
export default defineComponent({
  name: "UiFocus",
  props: props(),
  emits: ["focus:true", "focus:false"],
  setup(p, { emit, slots }) {
    const props = computed(() => p);

    const data = reactive({
      active: false,
      willChange: false,
    });

    const getEvents = (pay) => {
      const events = () => ({
        onFocus: async () => {
          data.willChange = true;

          pay.on?.();
        },
        onBlur: async () => {
          data.willChange = false;

          pay.off?.();
        },
      });

      return { ...events() };
    };

    const payload = computed(() => ({ ...data }));

    return () => {
      return h(
        resolveComponent("UiDelayedToggle"),
        {
          delay: props.value.delay,
          "onToggle:true": (e) => {
            emit("focus:true", e);
          },
          "onToggle:false": (e) => {
            emit("focus:false", e);
          },
        },
        {
          default: (pay) => {
            data.active = pay.active;

            return h(slots?.default?.(payload.value)?.[0] || "slot", {
              ...getEvents(pay),
              class:
                props.value.addWillChangeClass || props.value.activeClass
                  ? [
                      data.active ? props.value.activeClass : "",
                      data.willChange ? "will-change-transform" : "",
                    ]
                  : [],
            });
          },
        }
      );
    };
  },
});
</script>
