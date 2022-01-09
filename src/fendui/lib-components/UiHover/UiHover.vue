<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  h,
  inject,
  resolveComponent,
} from "@vue/runtime-core";

import props from "./props";
export default defineComponent({
  name: "UiHover",
  props: props(),
  emits: ["hover:true", "hover:false"],
  setup(p, { emit, slots }) {
    const props = computed(() => p);

    const data = reactive({
      active: false,
      willChange: false,
    });

    const fendui = inject("$fendui");

    const getEvents = (pay) => {
      if (!fendui.cssUtils.isStrictTouchDevice) {
        const events = () => ({
          onMouseenter: async () => {
            data.willChange = true;

            pay.on?.();
          },
          onMouseleave: async () => {
            data.willChange = false;

            pay.off?.();
          },
        });

        return { ...events() };
      }

      return {};
    };

    const payload = computed(() => ({ ...data }));

    return () => {
      return h(
        resolveComponent("UiDelayedToggle"),
        {
          delay: props.value.delay,
          "onToggle:true": (e) => {
            emit("hover:true", e);
          },
          "onToggle:false": (e) => {
            emit("hover:false", e);
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
