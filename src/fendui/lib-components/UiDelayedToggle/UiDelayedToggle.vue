<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onBeforeUnmount,
} from "@vue/runtime-core";

import props from "./props";
export default defineComponent({
  name: "UiDelayedToggle",
  props: props(),
  emits: ["toggle:true", "toggle:false"],
  setup(p, { emit, slots }) {
    const props = computed(() => p);

    const data = reactive({
      active: false,
    });

    const fendui = inject("$fendui");

    const i = getCurrentInstance();

    const uid = i.uid;

    const getUid = uid ? computed(() => `toggle-${uid}`) : { value: null };

    const cancelSleep = () => fendui.cancelSleep(getUid.value);

    onBeforeUnmount(() => {
      getUid.value && cancelSleep();
    });

    const getEvents = computed(() => {
      const getDelay = () => {
        const value = { enter: 0, leave: 0 };

        if (typeof props.value.delay == "object") {
          value.enter = props.value.delay.enter || 0;
          value.leave = props.value.delay.leave || 0;
        }

        if (/string|number/.test(typeof props.value.delay)) {
          const parsed = parseFloat(props.value.delay);

          value.enter = parsed;
          value.leave = parsed;
        }

        return value;
      };

      const delay = getDelay();

      const events = () => ({
        on: async () => {
          cancelSleep();

          data.active = false;

          if (delay.enter) {
            const sleep = await fendui.sleep({
              name: getUid.value,
              delay: delay.enter,
            });

            if (!sleep.cancelled) {
              data.active = true;

              emit("toggle:true");
            }
          } else {
            data.active = true;
            emit("toggle:true");
          }
        },
        off: async () => {
          cancelSleep();

          if (data.active) {
            if (delay.leave) {
              const sleep = await fendui.sleep({
                name: getUid.value,
                delay: delay.leave,
              });

              if (!sleep.cancelled) {
                data.active = false;
                emit("toggle:false");
              }
            } else {
              data.active = false;
              emit("toggle:false");
            }
          }
        },
      });

      return { ...events() };
    });

    const payload = computed(() => ({ ...data, ...getEvents.value }));

    return () => {
      return h(slots?.default?.(payload.value)?.[0] || "slot");
    };
  },
});
</script>

<style></style>
