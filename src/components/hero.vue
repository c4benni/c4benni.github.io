<script>
import {
  h,
  inject,
  onMounted,
  reactive,
  resolveComponent,
  watch,
} from "@vue/runtime-core";
import { UiIcon } from "./utils/icons";
import intersectionStates from "./utils/intersectionStates";

const div = (d, c) => h("div", d, c);
const section = (d, c) => h("section", d, c);

const nav = (d, c) => h("nav", d, c);
const wbr = () => h("wbr");
const br = () => h("br");

const routerLink = (d, c) => h(resolveComponent("UiBtn"), d, c);
const btn = (d, c) => h(resolveComponent("UiBtn"), d, c);
const intersection = (d, c) => h(resolveComponent("UiIntersection"), d, c);

const h2 = (d, c) => h("h2", d, c);
const span = (d, c) => h("span", d, c);

const h3 = (d, c) => h("h3", d, c);

const scoping = { "data-ho": "" };

const links = [
  {
    title: "About",
    to: "/#about",
  },
  {
    title: "Projects",
    to: "/#projects",
  },
  {
    title: "Socials",
    to: "/#socials",
  },
  {
    title: "Say hi",
    to: "/#say-hi",
  },
];

const description = div(
  {
    ...scoping,
    class: ["desc"],
  },
  [
    h3(
      {
        ...scoping,
        class: ["desc-content"],
      },
      [
        "I build beautifully, optimized websites and web apps that scale.",
        div(
          {
            ...scoping,
            class: "reg",
            style: {
              marginTop: "var(--half-x-gutter)",
            },
          },
          [
            "/he|him/i",
            br(),

            "Omo ",
            span(
              {
                ...scoping,
                class: "ng-flag",
              },
              [span()]
            ),
          ]
        ),
      ]
    ),
  ]
);

export default {
  name: "Hero",
  setup() {
    const data = reactive({
      intersectionRatio: 1,
      firstIntersection: false,
      isMounted: false,
    });

    const fendui = inject("$fendui");

    watch(
      () => data.firstIntersection,
      async (n) => {
        if (n === null && typeof data.intersectionRatio != "undefined") {
          data.firstIntersection = undefined;
          await fendui.sleep(400);

          data.firstIntersection = true;
        }
      }
    );

    onMounted(() => {
      fendui.sleep({
        delay: 200,
        callback: () => {
          data.isMounted = true;
        },
      });
    });

    return function () {
      const miniDevice = /sm|xs|xxs/.test(this.$breakpoints.is);
      const largeDevice = /md|lg|xl/.test(this.$breakpoints.is);

      return section(
        {
          ...scoping,
          class: [
            "root fill-after",
            {
              "initial-int-false": !data.firstIntersection,
              "is-mounted": data.isMounted,
            },
          ],
        },
        [
          intersection(
            {
              config: {
                threshold: [
                  0,
                  ...Array.from({ length: 100 }, (_, i) => (i * 1) / 100),
                  1,
                ],
              },
            },
            {
              default: (payload) => {
                requestAnimationFrame(() => {
                  data.intersectionRatio = payload.intersectionRatio || 0;

                  if (data.intersectionRatio <= 0.05) {
                    data.intersectionRatio = 0;
                  } else if (data.intersectionRatio >= 0.995) {
                    data.intersectionRatio = 1;
                  }

                  intersectionStates.hero = data.intersectionRatio;

                  if (data.firstIntersection === false) {
                    data.firstIntersection = null;
                  }
                });

                return div({
                  class: ["pseudo"],
                });
              },
            }
          ),

          largeDevice
            ? div(
                {
                  ...scoping,
                  class: ["share"],
                },
                [
                  btn(
                    {
                      ...scoping,
                      class: ["share-btn primary"],
                      //   fillConfig: {
                      //     opacity: ".1",
                      //     color: "var(--primary)",
                      //   },
                      //   outlined: this.$theme.dark,
                    },

                    {
                      default: () => {
                        return [
                          "To the left",

                          UiIcon({
                            icon: "share",
                          }),
                        ];
                      },
                    }
                  ),
                ]
              )
            : null,

          div(
            {
              ...scoping,
              class: ["main"],
            },
            [
              div(
                {
                  ...scoping,
                  class: ["main-content"],
                },
                [
                  largeDevice ? description : null,

                  h2(
                    {
                      key: this.$theme.is + "title",
                      ...scoping,
                      class: ["title fade-appear"],
                    },
                    [
                      [
                        {
                          title: "Hello.",
                          class: "hello",
                        },
                        {
                          title: "I am",
                          class: "i-am",
                        },
                        {
                          title: "Benedict",
                          class: "name",
                        },
                      ].map((item, key) => {
                        return div(
                          {
                            key: key + "title-item",
                            ...scoping,
                            class: ["title-item", item.class],
                          },
                          [
                            div(
                              {
                                ...scoping,
                                class: ["title-anim"],
                                style: {
                                  transitionDelay: key * 200 + "ms",
                                  "--duration": `${700 + key * 300}ms`,
                                },
                              },
                              [item.title]
                            ),
                          ]
                        );
                      }),
                    ]
                  ),

                  miniDevice ? description : null,
                ]
              ),
            ]
          ),
          largeDevice
            ? nav(
                {
                  ...scoping,
                  class: ["links"],
                },
                [
                  [...links].reverse().map((item, key) => {
                    return routerLink(
                      {
                        ...scoping,
                        class: ["hash-item"],
                        to: item.to,
                        key: key + "hash-link",
                      },
                      {
                        default: () => item.title,
                      }
                    );
                  }),
                ]
              )
            : undefined,

          div(
            {
              ...scoping,
              class: ["mouse-anim-wrap"],
            },
            [
              h(resolveComponent("mouseAnimation"), {
                class: [
                  "mouse-anim",
                  {
                    "anim-paused": data.intersectionRatio <= 0.75,
                  },
                ],
              }),
            ]
          ),
        ]
      );
    };
  },
};
</script>

<style>
.root[data-ho] {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--header-height) 1fr var(--header-height);
  width: 100%;
  height: 100vh;
  column-gap: 2px;
  isolation: isolate;
  position: relative;
}

.ng-flag {
  height: 18px;
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, 8px);
  border-radius: 2px;
  overflow: hidden;
  isolation: isolate;
  position: relative;
  bottom: -2px;
  left: -1px;
  border: 1px solid #00875173;
}

.ng-flag > span {
  width: 100%;
  height: 100%;
  background: #fff;
}

.ng-flag::before,
.ng-flag::after {
  content: "";
  background: #008751;
  display: inline-block;
}

.sm-down .root[data-ho] {
  grid-template-columns: 1fr;
}

.main[data-ho] {
  position: relative;
  isolation: isolate;
}

.background[data-ho] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 600px;
  font-weight: 800;
  color: var(--disabled-c);
  opacity: 0.075;
  pointer-events: none;
  isolation: isolate;
}

.sm-down .background[data-ho] {
  overflow: hidden;
}

.bg-item[data-ho] {
  transition: 0.1s linear transform;
  transform-origin: top;
  letter-spacing: -200px;
}

.md-up .bg-item[data-ho] {
  transform: skew(-15deg) translateX(-75px);
}

.sm-down .bg-item[data-ho] {
  transition: 0.25s transform linear;
  --scale: calc(calc(1 - var(--hero-ratio)) + 1);
  transform: scaleY(1.5) skew(-15deg) scale3d(var(--scale), var(--scale), 1);
}

.initial-int-false .bg-item[data-ho] {
  transition: 0.4s transform;
}

.links[data-ho] {
  display: grid;
  writing-mode: vertical-lr;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  column-gap: 4px;
  padding: var(--x-gutter) 0 var(--header-height);
  transition: 0.25s linear transform;
  transform: rotate(180deg)
    translate3d(calc(-100% + calc(100% * var(--hero-ratio))), 0, 0);
}

.hash-item[data-ho] {
  padding: 40px 20px;
  color: var(--caption-c);
  text-transform: uppercase;
  font-family: monospace;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0 4px 4px 0;
}

.share[data-ho] {
  position: relative;
  display: grid;
  justify-items: center;
  transition: 0.25s linear transform;
  transform: translate3d(calc(-100% + calc(100% * var(--hero-ratio))), 0, 0);
}

.share-btn[data-ho] {
  position: absolute;
  bottom: calc(var(--x-gutter) + var(--header-height));
  transform: rotate(-90deg);
  column-gap: 7.5px;
  font-family: monospace;
  font-size: 1rem;
}

.main-content[data-ho] {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 25% 1fr;
  height: 100%;
  width: 100%;
}

.sm-down .main-content[data-ho] {
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: flex-start;
  padding-top: calc(var(--header-height) + var(--x-gutter));
}

.title[data-ho] {
  display: grid;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-content: center;
  font-size: var(--title-font-size);
  font-weight: 800;
  text-align: left;
  padding-right: 0.5rem;
}

.sm-down .title[data-ho] {
  padding: 0 var(--qtr-x-gutter);
  justify-content: center;
  text-align: center;
}

.title-item[data-ho] {
  overflow: hidden;
}

.title-anim[data-ho] {
  /* background-image: linear-gradient(
    to right,
    var(--theme-surface-invert),
    var(--primary)
  ); */
  transition: var(--duration) transform cubic-bezier(0, 0, 0.2, 1);
  transform: translate3d(0, 100%, 0);
}

.root[data-ho].is-mounted .title-anim[data-ho] {
  transform: translate3d(0, 0, 0);
}

.desc[data-ho] {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sm-down .desc[data-ho] {
  position: static;
  padding: var(--half-x-gutter) var(--x-gutter);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.desc-content[data-ho] {
  transform: rotate(-90deg);
  height: 100%;
  max-height: 300px;
  bottom: var(--header-height);
  position: absolute;
  padding: var(--square-x-gutter) 0;
  font-weight: 500;
  font-family: monospace;
  color: var(--caption-c);
  line-height: 1.5;
  letter-spacing: 0.5px;
  transition: 1.5s opacity 1000ms linear;
  opacity: 0;
}

.sm-down .desc-content[data-ho] {
  position: static;
  line-height: 1.75;
  transform: none;
}

.root[data-ho].is-mounted .desc-content[data-ho],
.root[data-ho].is-mounted .mouse-anim-wrap[data-ho] {
  opacity: 1;
}

.mouse-anim-wrap[data-ho] {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 1.25s opacity cubic-bezier(0, 0, 0.2, 1) 1500ms;
}

.mouse-anim {
  transition: 0.15s opacity linear, 0.01s transform ease;
  opacity: var(--hero-ratio);
  /* --scale: calc(calc(1 - var(--hero-ratio)) + 1);
  transform: scale3d(var(--scale), var(--scale), 1); */
}
</style>
