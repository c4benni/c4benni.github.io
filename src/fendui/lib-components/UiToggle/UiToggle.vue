<script>
import { computed, reactive } from "@vue/reactivity";
import { defineComponent, h, inject } from "@vue/runtime-core";
import { capitalize } from "@vue/shared";
import props from "./props";

export default defineComponent({
  name: "UiToggle",
  props: props(),
  emits: ["toggle:true", "toggle:false", "update:modelValue"],
  setup(p, { slots, emit, attrs }) {
    const data = reactive({
      manualVmodel: false,
    });

    const props = computed(() => p);

    const active = computed(() => {
      if (typeof props.value.modelValue == "boolean") {
        return props.value.modelValue;
      }

      return data.manualVmodel;
    });

    const payload = computed(() => ({
      active: active.value,
      toggle,
    }));

    const toggle = (v) => {
      if (props.value.disabled) {
        return;
      }

      let value;

      if (typeof v == "boolean") {
        value = v;
      } else {
        value = !active.value;
      }

      emit("update:modelValue", value);
      emit(`toggle:${value}`);
      data.manualVmodel = value;
    };

    return () => {
      return h(slots.default?.(payload.value)?.[0] || null, {
        ...attrs,
      });
    };
  },
});
</script>

<style></style>
