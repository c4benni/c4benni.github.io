<script>
import { kebabCase } from "/src/fendui/utils/core";
import props from "./props";
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  resolveComponent,
} from "@vue/runtime-core";
import { Transition, TransitionGroup } from "@vue/runtime-dom";
import events from "./utils/events";
import extractTransitionsFn from "./utils/extractTransitions";

const getEmits = () => {
  const camelCases = [
    "beforeAppear",
    "appearCancelled",
    "afterAppear",
    "beforeEnter",
    "enterCancelled",
    "afterEnter",
    "beforeLeave",
    "leaveCancelled",
    "afterLeave",
  ];

  const events = ["state-change", "appear", "enter", "leave"];

  events.push(...events.map((x) => `uit-${x}`));

  camelCases.forEach((x) => {
    events.push(x);
    events.push(kebabCase(x));
    events.push(`uit-${kebabCase(x)}`);
  });

  return events;
};

export default defineComponent({
  name: "UiTransition",
  props: props(),
  emits: getEmits(),

  setup(p, { emit, slots, attrs }) {
    const props = reactive({ ...p });

    const data = reactive({
      transitionState: "",
      transitionPhase: "",
      variables: {},
      resetVariables() {
        this.variables = null;
        this.variables = {
          "--ui-will-change": "",
          "--ui-prev-transform": "",
          "--ui-origin": "",
          "--ui-transform-from": "",
          "--ui-fade-from": "",
          "--ui-transform-to": "",
          "--ui-fade-to": "",
          "--ui-enter-delay": "",
          "--ui-enter-duration": "",
          "--ui-enter-ease": "",
          "--ui-leave-delay": "",
          "--ui-leave-duration": "",
          "--ui-leave-ease": "",
        };
      },
      extractTransitions: () => {
        return extractTransitionsFn(props);
      },
      setVariables({
        willChange,
        origin,
        transform = {},
        opacity = {},
        delay = "0ms",
        duration,
        ease,
      }) {
        const phase = this.transitionPhase;

        const variables = this.variables;

        if (!props.optimise) {
          variables["--ui-will-change"] = "";
        } else {
          variables["--ui-will-change"] = willChange;
        }

        variables["--ui-prev-transform"] = props.previousTransform || "";
        variables["--ui-origin"] = origin;
        variables["--ui-transform-from"] = transform.from || "";
        variables["--ui-transform-to"] = transform.to || "";
        variables["--ui-fade-from"] = opacity.from || "";
        variables["--ui-fade-to"] = opacity.to || "";
        variables[`--ui-${phase}-delay`] = delay;
        variables[`--ui-${phase}-duration`] = duration;
        variables[`--ui-${phase}-ease`] = ease;

        for (let key in { ...variables }) {
          variables[key] = variables[key].replace(/^undefined$/, "");
        }

        // this.variables = { ...this.variables };
      },
    });

    data.resetVariables();

    const isGroup = () => props.group;

    const i = getCurrentInstance();

    const uid = computed(() => `ui-transition-${i.uid}`);

    const payload = computed(() => ({
      state: data.transitionState,
      phase: data.transitionPhase,
    }));

    const defaultSlot = () => ({
      default: () => {
        return (slots?.default?.(payload.value) || []).map((vnode, index) => {
          const key =
            typeof vnode.key == "undefined" || vnode.key === null
              ? `${uid.value}-${index}`
              : vnode.key;

          return h(vnode, {
            key,
          });
        });
      },
    });

    return () => {
      return h(
        isGroup() ? TransitionGroup : Transition,
        {
          onVnodeMounted(n) {
            attrs.onVnodeMounted?.(n);

            if (n.el.nodeName == "#comment") {
              data.transitionPhase = "enter";
            } else {
              data.transitionPhase = "leave";
            }
          },
          css: true,
          name: "ui-transition",
          ...attrs,
          ...(events(data, emit, props.config === false) || {}),
        },
        { ...defaultSlot() }
      );
    };
  },
});
</script>

<style>
.ui-transition-appear-from,
.ui-transition-appear-active,
.ui-transition-appear-to,
.ui-transition-enter-from,
.ui-transition-enter-active,
.ui-transition-enter-to,
.ui-transition-leave-from,
.ui-transition-leave-active,
.ui-transition-leave-to {
  --ui-fade-from: 1;
  --ui-fade-to: 1;
  --ui-prev-transform: translateZ(0px);
  --ui-transform-from: translateY(0.025px);
  --ui-transform-to: translate(0px, 0px);
  --ui-will-change: transform, opacity;
  --ui-appear-delay: 0s;
  --ui-appear-duration: 0s;
  --ui-appear-ease: ease-in-out;
  --ui-enter-delay: 0s;
  --ui-enter-duration: 1ms;
  --ui-enter-ease: ease-in-out;
  --ui-leave-delay: 0;
  --ui-leave-duration: 1ms;
  --ui-leave-ease: ease-in-out;
  --ui-origin: center;
  transform-origin: var(--ui-origin);
}

.ui-transition-appear-from {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-from) !important;
  opacity: var(--ui-fade-from) !important;
}
.ui-transition-appear-active {
  will-change: var(--ui-will-change) !important;
  transition-property: var(--ui-will-change) !important;
  transition-duration: var(--ui-enter-duration) !important;
  transition-delay: var(--ui-enter-delay) !important;
  transition-timing-function: var(--ui-enter-ease) !important;
}
.ui-transition-appear-to {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-to) !important;
  opacity: var(--ui-fade-to) !important;
}
.ui-transition-enter-from {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-from) !important;
  opacity: var(--ui-fade-from) !important;
}
.ui-transition-enter-active {
  will-change: var(--ui-will-change) !important;
  transition-property: var(--ui-will-change) !important;
  transition-duration: var(--ui-enter-duration) !important;
  transition-delay: var(--ui-enter-delay) !important;
  transition-timing-function: var(--ui-enter-ease) !important;
}
.ui-transition-enter-to {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-to) !important;
  opacity: var(--ui-fade-to) !important;
}
.ui-transition-leave-from {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-from) !important;
  opacity: var(--ui-fade-from) !important;
}
.ui-transition-leave-active {
  will-change: var(--ui-will-change) !important;
  transition-property: var(--ui-will-change) !important;
  transition-duration: var(--ui-leave-duration) !important;
  transition-delay: var(--ui-leave-delay) !important;
  transition-timing-function: var(--ui-leave-ease) !important;
}
.ui-transition-leave-to {
  will-change: var(--ui-will-change) !important;
  transform: var(--ui-prev-transform) var(--ui-transform-to) !important;
  opacity: var(--ui-fade-to) !important;
}
</style>
