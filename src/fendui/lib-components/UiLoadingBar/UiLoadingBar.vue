<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  resolveDynamicComponent,
  watch,
} from "@vue/runtime-core";
import { nextAnimFrame } from "/src/fendui/utils/core";
import props from "./props";

export default defineComponent({
  name: "UiLoadingBar",
  props: props(),
  emits: {
    "state:running": null,
    "state:paused": null,
    "state:stopped": null,
    "state:done": null,
  },
  setup(p, { emit, attrs, slots }) {
    const fendui = inject("$fendui");

    const props = computed(() => p);

    const i = getCurrentInstance();

    const uid = computed(() => `UiLoadingBar-${i.uid}`);

    const data = reactive({
      renderBar: false,
      showLoading: false,
      hideLoader: false,
      transform: 0,
      elapsedTime: 0,
      uid: "",
      done: false,
    });

    data.transform = props.value.initial || 0;

    const isPaused = computed(() => /^paused$/i.test(props.value.state));
    const isRunning = computed(() => /^running$/i.test(props.value.state));
    const isStopped = computed(() => !isPaused.value && !isRunning.value);

    // data.renderBar = isRunning.value;

    const cancelSleep = () => fendui.cancelSleep(uid.value);

    watch(
      () => props.value.state,
      () => {
        emit(
          `state:${
            isPaused.value ? "paused" : isRunning.value ? "running" : "stopped"
          }`
        );
      }
    );

    const showShimmer = computed(() => {
      return typeof props.value.showBar == "boolean"
        ? props.value.showBar
        : props.value.showBar?.(data.transform);
    });

    const methods = {
      async startLoading() {
        if (!data.renderBar || isStopped.value || isPaused.value) {
          return;
        }

        data.done = false;

        if (data.transform <= 100) {
          data.transform += props.value.transformOffset;

          data.transform = Math.min(data.transform, 100);

          const delay = await fendui.sleep({
            delay: data.elapsedTime,
            name: uid.value,
          });

          if (!delay.cancelled) {
            data.elapsedTime += props.value.timeOffset;

            (await props.value.useAnimationFrame)
              ? nextAnimFrame()
              : nextTick();

            this.startLoading();
          }
        } else {
          data.done = true;

          emit("state:done");
        }
      },
      async stopLoading() {
        if (!isStopped.value) {
          return;
        }

        data.done = false;

        cancelSleep();

        await fendui.sleep(16);

        data.transform = 100;

        await fendui.sleep(props.value.stoppedDuration);

        if (isStopped.value) {
          data.hideLoader = true;

          data.transform = props.value.initial;
          data.elapsedTime = 0;
          data.renderBar = false;
          emit("state:done");
        }
      },
    };

    watch(
      () => isPaused.value,
      (n) => {
        if (n) {
          cancelSleep();
        }
      }
    );

    watch(
      () => isRunning.value,
      (n) => {
        if (n) {
          data.renderBar = n;
          data.hideLoader = false;
          methods.startLoading();
        }
      }
    );

    watch(
      () => isStopped.value,
      (n) => {
        n && methods.stopLoading();
      }
    );

    onMounted(() => {
      if (isRunning.value) {
        data.renderBar = true;
        methods.startLoading();
      }
    });

    onBeforeUnmount(() => {
      cancelSleep();
    });

    return () => {
      const div = (d, c) => h("div", d, c);
      const scoping = {
        "data-ui-lbr": props.value.useStyle ? "" : undefined,
      };

      return h(
        resolveDynamicComponent(props.value.tag),
        {
          ...attrs,
          ...scoping,
          class: [
            {
              root: props.value.useStyle,
              "opacity-0": !data.renderBar && props.value.useStyle,
            },
          ],
          style: props.value.useStyle
            ? {
                "--root-background": props.value.rootBackground,
              }
            : undefined,
        },
        [
          props.value.showBar
            ? div({
                ...scoping,
                class: [
                  "__bar",
                  {
                    "will-change": data.renderBar,
                    __animate: showShimmer.value,
                  },
                ],
                style: {
                  "--x": `${Math.min(data.transform, 100) - 100}%`,
                  "--background": props.value.background,
                },
              })
            : null,

          slots?.default?.({ transform: data.transform }),
        ]
      );
    };
  },
});
</script>

<style>
.root[data-ui-lbr] {
  position: relative;
  height: 4px;
  width: 100%;
  background: var(--root-background);
  overflow: hidden;
  isolation: isolate;
  pointer-events: none;
  transition: 0.2s linear opacity;
}

.root[data-ui-lbr].opacity-0 {
  opacity: 0;
}

.__bar[data-ui-lbr] {
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--background);
  transform: translate3d(var(--x), 0, 0);
  transition: transform 0.2s linear;
  overflow: hidden;
}

.__bar[data-ui-lbr].will-change {
  will-change: transform, opacity;
}

.root[data-ui-lbr].__hidden {
  visibility: hidden;
  transition: 0s;
}

@keyframes animating-loading-bar {
  0% {
    transform: translate3d(-225%, 0, 0);
  }
  to {
    transform: translate3d(125%, 0, 0);
  }
}

.__bar[data-ui-lbr].__animate:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-225%);
  background-image: linear-gradient(
    90deg,
    hsla(0, 0%, 78.4%, 0),
    hsla(0, 0%, 100%, 0.75),
    hsla(0, 0%, 78.4%, 0)
  );
  animation: animating-loading-bar 2s infinite cubic-bezier(0, 0.55, 0.45, 1);
}
</style>
