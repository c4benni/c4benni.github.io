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

const nav = (d: VNodeData, c: VNodeChild) => h("nav", d, c);
const ul = (d: VNodeData, c: VNodeChild) => h("ul", d, c);
const li = (d: VNodeData, c: VNodeChild) => h("li", d, c);
const div = (d: VNodeData, c: VNodeChild) => h("div", d, c);
const span = (d: VNodeData, c: VNodeChild) => h("span", d, c);

// @ts-ignore
const btn = (d: VNodeData, c: VNodeChild) => h(resolveComponent("UiBtn"), d, c);
// @ts-ignore
const Img = (d: VNodeData) => h(resolveComponent("UiImg"), d);

import states from "./utils/states";

export default defineComponent({
  name: "BottomNav",
  setup() {
    return function () {
      const state = reactive({
        icons: [
          {
            title: "Home",
            icon: "home",
            hash: "",
          },
          {
            title: "About",
            icon: "about",
            hash: "#about",
          },
          {
            title: "Projects",
            icon: "project",
            hash: "#projects",
          },
          {
            title: "Reach out",
            icon: "contact",
            hash: "#contact",
          },
        ],
      });

      return nav(
        {
          class: "root fill-before",
        },
        [
          ul(
            {
              class: "ul",
            },
            [
              state.icons.map((item, key) => {
                return li(
                  {
                    key,
                    class: [
                      "li",
                      {
                        "fill-before": key < state.icons.length - 1,
                      },
                    ],
                  },
                  [
                    btn(
                      {
                        // tag: 'router-link',
                        to: item.hash ? `/${item.hash}` : "/",
                        class: [
                          {
                            active:
                              states.activeHeaderIndex === null
                                ? key == 0
                                : key == states.activeHeaderIndex + 1,
                          },
                        ],
                        onClick: () => {
                          requestAnimationFrame(() => {
                            if (!item.hash) {
                              scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            } else {
                              const h2 = document.querySelector(
                                `${item.hash} > h2`
                              );

                              if (h2) {
                                window.scrollTo({
                                  top:
                                    h2.getBoundingClientRect().top -
                                    56 +
                                    scrollY,
                                  behavior: "smooth",
                                });
                              }
                            }
                          });
                        },
                      },
                      {
                        default: () => {
                          return [
                            span(
                              {
                                class: "icon",
                              },
                              [
                                Img({
                                  src: `https://res.cloudinary.com/c4benn/image/upload/c_scale,h_128/v1641718581/portfolio/navIcons/${item.icon}.png`,
                                  alt: `${item.title} icon`,
                                  height: "24px",
                                  width: "24px",
                                  class: "icon",
                                }),
                              ]
                            ),

                            div(
                              {
                                class: "dot-wrap",
                              },
                              [
                                span(
                                  {
                                    class: "dot",
                                  },
                                  []
                                ),
                              ]
                            ),
                          ];
                        },
                      }
                    ),
                  ]
                );
              }),
            ]
          ),
        ]
      );
    };
  },
});
</script>

<style scoped>
.root {
  --ui-rounded: 1rem;
  height: 64px;
  min-width: 280px;
  width: calc(100% - 4rem);
  max-width: 450px;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--ui-rounded);
  z-index: 99;
  background-color: rgba(26, 26, 26, 0.9875);
  --dot-size: 4px;
}

.root:before {
  border: 0.5px solid;
  opacity: 0.1;
}

.br-sm.or-la .root {
  height: 56px;
}

.ul {
  display: flex;
  align-items: center;
  height: 100%;
}

.li {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
}

.li::before {
  border-right: 0.75px solid;
  opacity: 0.1;
  height: 60%;
  top: auto;
}

.ui-btn {
  height: 100%;
  width: 100%;
  border-radius: 0;
  opacity: 0.7;
  grid-auto-flow: row;
  justify-items: center;
  align-items: flex-end;
}

.icon {
  opacity: 0.7;
  transform: translate3d(0, var(--dot-size), 0);
  transition: opacity linear, transform linear;
  transition-delay: 0.15s;
  transition-duration: 0.25s;
}

.dot-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.dot {
  border-radius: calc(var(--dot-size) / 2);
  width: var(--dot-size);
  height: var(--dot-size);
  background: currentColor;
  display: block;
  opacity: 0;
  transform: translate3d(0, var(--dot-size), 0);
  transition: opacity linear, transform linear;
  transition-delay: 0.15s;
  transition-duration: 0.25s;
}

.ui-btn.active .icon {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.ui-btn.active .dot {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.ui-btn.active {
  opacity: 1;
}

.li:first-of-type .ui-btn {
  border-top-left-radius: var(--ui-rounded);
  border-bottom-left-radius: var(--ui-rounded);
}

.li:last-of-type .ui-btn {
  border-top-right-radius: var(--ui-rounded);
  border-bottom-right-radius: var(--ui-rounded);
}
</style>
