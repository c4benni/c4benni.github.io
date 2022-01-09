<script>
import { computed, defineComponent, reactive, h, nextTick } from "vue";

import props from "./props";
import { distinctArray } from "/src/fendui/utils/core";

export default defineComponent({
  name: "UiGroup",
  props: props(),
  emits: ["update:modelValue", "toggle:add", "toggle:remove"],
  setup(p, { emit, slots }) {
    const data = reactive({
      selected: [],
    });

    const props = computed(() => p);

    const methods = {
      toggle(e) {
        if (methods.isActive(e)) {
          methods.remove(e);
        } else {
          methods.add(e);
        }
      },

      isActive(e) {
        let item = e;
        if (typeof item == "object") {
          item = JSON.stringify(e);
        }

        return data.selected.includes(item);
      },

      removeCB(e) {
        if (props.value.mandatory && data.selected.length <= 1) {
          return;
        }

        let item = e;
        if (typeof item == "object") {
          item = JSON.stringify(e);
        }

        data.selected = [...data.selected].filter((x) => x != item);
      },

      async remove(arr) {
        const array = [arr].flat();

        array.forEach((x) => {
          methods.removeCB(x);
        });

        await nextTick();

        emit("update:modelValue", data.selected);
        emit("toggle:remove", arr);
      },

      addCB(e) {
        let item = e;
        if (typeof item == "object") {
          item = JSON.stringify(e);
        }

        const pseudoSelected = [
          ...(props.value.multiple ? data.selected || [] : []),
        ];

        data.selected = props.value.allowRepeated
          ? [...pseudoSelected, item]
          : distinctArray(item, [...pseudoSelected]);

        if (props.value.reversed) {
          data.selected = [...pseudoSelected].reverse();
        }
      },

      async add(arr) {
        const array = [arr].flat();

        array.forEach((x) => {
          methods.addCB(x);
        });

        await nextTick();

        emit("update:modelValue", data.selected);
        emit("toggle:add", arr);
      },
    };

    if (props.value.modelValue) {
      methods.add(props.value.modelValue);
    }

    if (props.value.initial?.length) {
      methods.add(props.value.initial);
    }

    const payload = computed(() => ({
      add: methods.add,
      remove: methods.remove,
      toggle: methods.toggle,
      isActive: methods.isActive,
      selected: data.selected,
    }));

    return () => {
      return slots.default({ ...payload.value }).map((item, index) => {
        return h(item, {
          key: item.key || index,
        });
      });
    };
  },
});
</script>
