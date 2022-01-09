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
  name: "UiLongPress",
  props: props(),
  emits: ["click:long-press", "cancel:long-press"],
  setup(p, { emit, slots }) {
    const props = computed(() => p);

    const data = reactive({
      pressing: false,
      pressed: false,
    });

    const resetLongPress = () => {
      data.pressing = false;
      data.pressed = false;
    };

    const fendui = inject("$fendui");

    const i = getCurrentInstance();

    const uid = i.uid;

    const getUid = uid ? computed(() => `long-press-${uid}`) : { value: null };

    const cancelSleep = () => fendui.cancelSleep(getUid.value);

    onBeforeUnmount(() => {
      getUid.value && cancelSleep();
    });

    const updateLongPress = ({ pressing }) => {
      data.pressing = pressing;
    };

    const getEvents = computed(() => {
      if (fendui.cssUtils.isTouchDevice) {
        const events = {
          onBlur: () => {
            resetLongPress();
          },
          onClick: () => {
            resetLongPress();
          },
          start: async () => {
            resetLongPress();

            updateLongPress({
              pressing: true,
            });

            const delay = await fendui.sleep({
              delay: props.value.delay || 1,
              name: getUid.value,
            });

            if (!delay.cancelled && delay.name == getUid.value) {
              emit("click:long-press", true);

              data.pressed = true;
            } else if (delay.cancelled) {
              cancelSleep();
            }

            updateLongPress({
              pressing: false,
            });
          },
          onTouchmovePassive: () => {
            cancelSleep(true);
          },
          onTouchcancel: () => {
            cancelSleep(true);
          },
          onTouchend: () => {
            cancelSleep(true);
          },
        };

        if (!props.value.allowContenxtMenu) {
          events.onContextmenu = (e) => {
            e.preventDefault();
          };
        }

        events["onTouchstartPassive"] = events.start;

        delete events.start;

        return events;
      }

      return {};
    });

    const payload = computed(() => ({
      active: data.pressed,
      willChange: data.pressing,
      reset: () => resetLongPress(),
    }));

    return () => {
      return h(slots?.default?.(payload.value)?.[0] || "slot", {
        ...(getEvents.value || {}),
        class:
          props.value.addWillChangeClass || props.value.activeClass
            ? [
                data.pressed ? props.value.activeClass : "",
                data.pressing ? "will-change-transform" : "",
              ]
            : [],
      });
    };
  },
});
</script>
