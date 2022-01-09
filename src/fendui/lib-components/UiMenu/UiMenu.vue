<script>
import { computed, reactive } from "@vue/reactivity";
import props from "./props";
export default {
  name: "UiMenu",
  props: props(),
  emits: [],
  setup(p, { emit, slots }) {
    const data = reactive({});

    const props = computed(() => p);

    const scoping = {
      "data-ui-menu": props.value.useStyle ? "" : undefined,
    };
  },
};
</script>
