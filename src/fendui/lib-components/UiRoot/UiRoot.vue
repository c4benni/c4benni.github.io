<script>
import props from "./props";
import {
  defineComponent,
  h,
  inject,
  onBeforeMount,
  resolveDynamicComponent,
} from "@vue/runtime-core";

export default defineComponent({
  name: "UiRoot",
  props: props(),

  setup(props, { slots }) {
    const fendui = inject("$fendui");

    onBeforeMount(() => {
      fendui.beforeMount();
    });

    return () => {
      const slot = slots?.default?.() || null;

      return h(
        resolveDynamicComponent(props.tag),
        {
          key: fendui.rootKey,
          class: [
            "ui-root",
            // `${fendui.theme.is}-theme`,
            fendui.cssUtilsClassList,
            fendui.breakpoints.classList,
          ],
        },
        [slot]
      );
    };
  },
});
</script>

<style></style>
