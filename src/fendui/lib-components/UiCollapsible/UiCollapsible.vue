<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  resolveDynamicComponent,
  watch,
} from "@vue/runtime-core";
import { nextAnimFrame } from "/src/fendui/utils/core";
import props from "/src/fendui/lib-components/UiAccordion/props";
import { convertSeconds } from "/src/fendui/utils/core";

export default defineComponent({
  name: "UiCollapsible",
  props: props(),
  emits: ["toggle:true", "toggle:false", "update:modelValue"],
  setup(p, { emit, slots }) {
    const data = reactive({
      manualVmodel: false,
      transitionState: null,
      contentHeight: undefined,
      collapsed: 0,
      willChange: false,
      forceNoTransition: false,
      hideHeight: false,
      exitingHeight: null,
      manualActive: false,
    });

    if (!data.exitingHeight) {
      data.exitingHeight = "0px";
    }

    const fendui = inject("$fendui");

    const props = computed(() => p);

    data.manualActive = props.value.active;

    const active = computed(() => {
      if (data.manualActive) {
        return true;
      }

      if (typeof props.value.modelValue == "boolean") {
        return props.value.modelValue;
      }

      return data.manualVmodel;
    });

    if (!active.value) {
      data.collapsed++;
    }

    const i = getCurrentInstance();

    const div = (d, c) => h("div", d, c);

    const scoping = {
      "data-ui-collapsible": props.value.useStyle ? "" : undefined,
    };

    watch(
      () => fendui.breakpoints.is,
      async (n, o) => {
        if (o) {
          data.forceNoTransition = true;

          data.contentHeight = i.refs.contentWrap?.clientHeight || null;

          await nextAnimFrame();

          data.forceNoTransition = false;
        }
      }
    );

    const toggleVModel = async (value) => {
      emit("update:modelValue", value);

      emit(`toggle:${value}`, value);

      data.manualVmodel = value;

      await nextTick();

      data.manualActive = false;
    };

    const payload = computed(() => ({
      active: active.value,
      contentHeight: data.contentHeight,
      transitionState: data.transitionState,
      toggle: () => toggleVModel(!active.value),
      open: () => toggleVModel(true),
      close: () => toggleVModel(false),
    }));

    const setContentHeight = async (e) => {
      data.collapsed += 2;

      data.contentHeight = i.refs.contentWrap?.clientHeight || null;

      data.exitingHeight = `${data.contentHeight}px`;

      data.willChange = true;

      data.hideHeight = false;

      toggleVModel(e);

      await nextAnimFrame();

      data.exitingHeight = "0px";
    };

    watch(() => props.value.modelValue, setContentHeight);

    const getTransition = computed(() => {
      const value = { duration: "1ms", ease: "ease", delay: "0ms" };

      const transition = props.value.transition;

      if (typeof transition == "object") {
        value.duration = transition.duration || "1ms";
        value.ease = transition.ease || "ease";
        value.delay = transition.delay || "0ms";
      } else {
        value.duration = transition || "1ms";
      }

      if (!convertSeconds(value.duration)) {
        value.duration = "1ms";
      }

      return value;
    });

    return () => {
      const tag = resolveDynamicComponent(props.value.tag);

      const contentAttrs = props.value.contentAttrs || {};

      const validTransition = (e) =>
        e.target == e.currentTarget && e.propertyName == "height";

      return h(
        tag,
        {
          ...scoping,
          class: [
            props.value.useStyle
              ? [
                  "root",
                  {
                    "will-change": data.willChange,
                  },
                ]
              : "__content",
            contentAttrs.class,
          ],
          "aria-hidden": !active.value ? "true" : undefined,
          style: {
            "--transition":
              data.collapsed > 0 && !data.forceNoTransition
                ? `height ${getTransition.value.duration} ${getTransition.value.ease} ${getTransition.value.delay}`
                : undefined,
            "--max-height": props.value.maxHeight,
            "--height": active.value
              ? `${
                  data.hideHeight ? "null" : data.contentHeight || "null"
                }px`.replace(/nullpx/, "") || undefined
              : data.exitingHeight,
            visibility:
              /afterLe/i.test(data.transitionState) ||
              (!active.value && !data.transitionState)
                ? "hidden"
                : undefined,
          },
          onTransitionstart: (e) => {
            if (validTransition(e)) {
              data.transitionState = active.value
                ? "beforeEnter"
                : "beforeLeave";
            }
          },
          onTransitionend: (e) => {
            if (validTransition(e)) {
              data.transitionState = active.value ? "afterEnter" : "afterLeave";
              data.willChange = false;

              if (active.value) {
                data.hideHeight = true;
              }
            }
          },
          onTransitioncancel: (e) => {
            if (validTransition(e)) {
              if (active.value) {
                data.transitionState = "leaveCancelled";
              } else {
                data.transitionState = "enterCancelled";
              }

              data.willChange = false;
            }
          },
          ...contentAttrs,
        },
        [div({ ref: "contentWrap" }, [slots.default?.(payload.value)])]
      );
    };
  },
});
</script>

<style>
.root[data-ui-collapsible],
.__content {
  transition: var(--transition);
  height: var(--height);
  max-height: var(--max-height);
  overflow: hidden;
}

.root[data-ui-collapsible].will-change {
  will-change: height;
}
</style>
