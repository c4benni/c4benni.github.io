<template></template>

<script lang="ts">
import {
  defineComponent,
  h,
  reactive,
  RendererElement,
  RendererNode,
  resolveComponent,
  VNode,
  VNodeArrayChildren,
  VNodeProps,
} from "vue";

import { getGreeting } from "../state";

type VNodeData = VNodeProps & {
  __v_isVNode?: never;
  [Symbol.iterator]?: never;
} & Record<string, any>;

type VNodeChild =
  | string
  | number
  | boolean
  | VNode<RendererNode, RendererElement, { [key: string]: any }>
  | VNodeArrayChildren
  | (() => any)
  | { [name: string]: unknown; $stable?: boolean };

type IntersectionPayload = {
  isIntersecting: boolean;
};

const greeting = getGreeting();

const Intersection = (d: VNodeData, c: VNodeChild) =>
  // @ts-ignore
  h(resolveComponent("UiIntersection"), d, c);

const h2 = (d: VNodeData, c: VNodeChild) => h("h2", d, c);

const div = (d: VNodeData, c: VNodeChild) => h("div", d, c);

const span = (d: VNodeData, c: VNodeChild) => h("span", d, c);

export default defineComponent({
  name: "HelloAnimation",

  setup() {
    const state = reactive({
      currentGreeting: [] as string[],
      currentGreetingIndex: 0,
      addTickEffect: false,
      isRtL: false,
      mounted: false,
      intersected: false,
    });

    return function () {
      return h2(
        {
          class: ["root"],
          style: {
            direction: state.isRtL ? "rtl" : undefined,
          },
          onVnodeBeforeUnmount: () => {
            state.mounted = false;
          },
        },
        [
          !state.intersected
            ? Intersection(
                {
                  once: true,
                },
                {
                  default: (payload: IntersectionPayload) => {
                    state.intersected = payload.isIntersecting;
                    return div(
                      {
                        class: "pseudo",
                      },
                      []
                    );
                  },
                }
              )
            : null,

          state.intersected
            ? div(
                {
                  class: "wrap truncate-text gradient-text",
                  onVnodeMounted: () => {
                    state.mounted = true;

                    let sleepValue: string;

                    const setGreeting = async (index: number) => {
                      if (!state.mounted) return;

                      state.isRtL =
                        greeting[index] == "مرحبا" || greeting[index] == "שלום";

                      const splitGreeting = greeting[index].split("");

                      state.addTickEffect = false;

                      let fnSleepValue: object;

                      let sleeping = false;

                      for (
                        let i = state.currentGreeting.length;
                        i < splitGreeting.length * 2 - 1;
                        i++
                      ) {
                        if (!state.mounted) return;

                        sleepValue = `${state.currentGreetingIndex}-${i}`;

                        // when the last letter has been reached,
                        // sleep for 2s before deleting
                        if (i == splitGreeting.length && !sleeping) {
                          state.addTickEffect = true;
                          sleeping = true;
                          fnSleepValue = await this.$fendui.sleep({
                            delay: 3500,
                            data: () => ({
                              sleepValue: `${state.currentGreetingIndex}-${i}`,
                            }),
                          });
                          sleeping = false;
                          state.addTickEffect = false;
                        } else if (!sleeping) {
                          sleeping = true;
                          fnSleepValue = await this.$fendui.sleep({
                            delay: 125,
                            data: () => ({
                              sleepValue: `${state.currentGreetingIndex}-${i}`,
                            }),
                          });
                          sleeping = false;
                        }

                        if (fnSleepValue.data.sleepValue == sleepValue) {
                          // push letters if end not reached;
                          if (i > splitGreeting.length - 1) {
                            state.currentGreeting.pop();
                          } else {
                            state.currentGreeting.push(splitGreeting[i]);
                          }
                        }
                      }

                      sleeping = true;
                      await this.$fendui.sleep(125);
                      sleeping = false;

                      state.currentGreeting = [];

                      // shift greeting index
                      if (state.currentGreetingIndex < greeting.length - 1) {
                        state.currentGreetingIndex =
                          state.currentGreetingIndex + 1;
                      } else {
                        state.currentGreetingIndex = 0;
                      }

                      state.addTickEffect = true;
                      sleeping = true;
                      await this.$fendui.sleep(500);

                      // recursive call
                      requestAnimationFrame(() => {
                        setGreeting(state.currentGreetingIndex);
                      });
                    };

                    requestAnimationFrame(() => {
                      setGreeting(state.currentGreetingIndex);
                    });
                  },
                },
                [
                  state.currentGreeting.join(""),
                  span(
                    {
                      class: [
                        "ticker gradient-text",
                        { "fade-appear": state.addTickEffect },
                      ],
                    },
                    ["|"]
                  ),
                ]
              )
            : null,
        ]
      );
    };
  },
});
</script>

<style scoped>
.root {
  --font-size: 64px;
  font-size: var(--font-size);
  font-family: var(--header-font-family);
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
}

/* .sm-down .root{
    margin-top: 4rem;
} */

.br-sm .root {
  --font-size: min(15vw, 80px);
}

.br-md .root {
  --font-size: 96px;
}

.br-lg .root {
  --font-size: 128px;
  min-height: 250px;
}

.br-xl .root {
  --font-size: 200px;
  min-height: 400px;
}

.wrap {
  overflow: hidden;
  max-width: inherit;
  background-image: linear-gradient(
    30deg,
    var(--theme-surface-invert) 40%,
    var(--secondary)
  );
}

.ticker {
  animation-iteration-count: infinite;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-direction: alternate-reverse;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
  margin-left: 2px;
  margin-bottom: 0.5rem;
  font-family: serif;
  --grad-stop: #fff;
  background-image: linear-gradient(to bottom, #fff 60%, var(--grad-stop));
  opacity: 0.8;
  font-size: 1.25em;
}

.ticker.fade-appear {
  --grad-stop: var(--secondary);
}
</style>
