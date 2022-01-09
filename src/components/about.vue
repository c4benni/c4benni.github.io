<script>
import { reactive } from "@vue/reactivity";
import { h, resolveComponent } from "@vue/runtime-core";
import intersectionStates from "./utils/intersectionStates";

const section = (d, c) => h("section", d, c);
const div = (d, c) => h("div", d, c);
const p = (d, c) => h("p", d, c);

const scoping = { "data-at": "" };

const intersection = (d, c) => h(resolveComponent("UiIntersection"), d, c);
const img = (d, c) => h(resolveComponent("UiImg"), d, c);

const h2 = (d, c) => h("h2", d, c);
const span = (d, c) => h("span", d, c);

export default {
  name: "About",
  setup() {
    const data = reactive({
      intersectionRatio: false,
      firstIntersection: false,
      isIntersecting: false,
      exceededTop: false,
    });

    return function () {
      return section(
        {
          ...scoping,
          class: [
            "root",
            {
              intersecting: data.isIntersecting,
            },
          ],
          id: "about",
        },
        [
          intersection(
            {
              config: {
                threshold: [
                  0,
                  ...Array.from({ length: 200 }, (_, i) => (i * 1) / 200),
                  1,
                ],
              },
            },
            {
              default: (payload) => {
                requestAnimationFrame(() => {
                  data.intersectionRatio = payload.intersectionRatio || 0;

                  data.isIntersecting = payload.intersectionRatio >= 0.5;

                  if (
                    payload.entry?.boundingClientRect?.top <= 0 &&
                    !data.isIntersecting
                  ) {
                    data.exceededTop = true;
                  }

                  if (
                    !data.isIntersecting &&
                    payload.entry?.boundingClientRect?.top > 0
                  ) {
                    data.exceededTop = false;
                  }

                  if (data.intersectionRatio <= 0.05) {
                    data.intersectionRatio = 0;
                  } else if (data.intersectionRatio >= 0.995) {
                    data.intersectionRatio = 1;
                  }

                  intersectionStates.about = data.intersectionRatio;

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

          div(
            {
              ...scoping,
              class: ["container"],
            },
            [
              h2(
                {
                  ...scoping,
                  class: ["title anim-title"],
                },
                [
                  div(
                    {
                      ...scoping,
                      class: ["title-item anim-title-item"],
                    },
                    [
                      "About.".split("").map((item, key) => {
                        return span(
                          {
                            key: key + "about",
                            class: ["about-letter-wrap anim-letter-wrap"],
                          },
                          [
                            div(
                              {
                                class: [
                                  "about-letter anim-letter",
                                  {
                                    "will-change-transform":
                                      data.intersectionRatio != 1,
                                  },
                                ],
                                style: {
                                  "--offset-perc": `${125 * (key + 1)}%`,
                                },
                              },
                              item
                            ),
                          ]
                        );
                      }),
                    ]
                  ),
                ]
              ),

              div(
                {
                  ...scoping,
                  class: ["main"],
                },
                [
                  /md|lg|xl/.test(this.$breakpoints.is)
                    ? div(
                        {
                          ...scoping,
                          class: ["image"],
                        },
                        [
                          img({
                            src: "asset/img/avatar.jpg",
                            alt: "my avatar",
                            height: "500px",
                            loading: "eager",
                          }),
                        ]
                      )
                    : null,
                  div(
                    {
                      ...scoping,
                      class: [
                        "write-up-wrap",
                        {
                          "fill-after": /sm|xs|xxs/.test(this.$breakpoints.is),
                        },
                      ],
                      style: {
                        "--transform-y": `${data.exceededTop ? "-50%" : "50%"}`,
                      },
                    },
                    [
                      p(
                        {
                          ...scoping,
                          class: ["write-up intro"],
                        },
                        [
                          "I am a web developer and product designer based in Lagos, Nigeria, providing quality software solutions to companies and individuals through top notch Websites and Web Apps that can be accessed on any device with a browser.",
                        ]
                      ),

                      p(
                        {
                          ...scoping,
                          class: ["write-up skills"],
                        },
                        [
                          "My core software skills ranges from, but not limited to CSS, Javascript, HTML, SQL, PostgreSQL, VueJS, Nuxt & React.",
                        ]
                      ),

                      p(
                        {
                          ...scoping,
                          class: ["write-up frretime"],
                        },
                        [
                          "With music always in my ears, you'd catch me out of the office playing video games, watching documentaries, or in a nearby gym.",
                        ]
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),
        ]
      );
    };
  },
};
</script>

<style>
.root[data-at] {
  position: relative;
  padding: var(--header-height) var(--header-height) var(--x-gutter);
  margin-top: 96px;
}

.sm-down .root[data-at] {
  padding: var(--header-height) 0 var(--x-gutter);
}

.about-letter {
  transition: 0.15s transform linear;
  transform: translate3d(
    calc(calc(var(--offset-perc) * var(--hero-ratio))),
    0,
    0
  );
}

.sm-down .about-letter {
  transform: translate3d(
    0,
    calc(calc(var(--offset-perc) * var(--hero-ratio))),
    0
  );
}

.container[data-at] {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  transition: 0.5s opacity linear;
  /* opacity: var(--about-ratio); */
}

.main[data-at] {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 500px 1fr;
  margin-top: calc(0px - calc(var(--title-font-size) * 1.35) * 0.4);
  padding-left: var(--x-gutter);
  height: 100%;
}

.sm-down .main[data-at] {
  padding-left: 0;
  grid-template-columns: 1fr;
}

.image[data-at] {
  height: 500px;
  position: sticky;
  top: 96px;
}

.image[data-at] > * {
  height: 500px;
  display: inline-block;
  object-fit: cover;
  border-radius: var(--ui-rounded);
  transition: 0.25s transform linear;
  transform: translate3d(0, calc(calc(25% * var(--hero-ratio))), 0)
    scale3d(0.9, 0.9, 1);
  transform-origin: left;
}

.write-up-wrap[data-at] {
  padding: var(--x-gutter) var(--square-x-gutter);
  transition: 0.25s opacity linear;
}

.sm-down .write-up-wrap[data-at] {
  padding: calc(var(--square-x-gutter) * 1.75) var(--square-x-gutter) 16px;
  overflow: hidden;
  max-width: 700px;
  margin: 0 auto;
  transition: 0.5s opacity linear, 0.75s transform ease-in-out;
  opacity: 0;
  transform: translate3d(0, var(--transform-y), 0);
}

.sm-down .root[data-at].intersecting .write-up-wrap[data-at] {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.write-up-wrap[data-at]::after {
  /* background: linear-gradient(
    180deg,
    var(--theme-surface) 35%,
    var(--faded-theme-surface)
  ); */
  z-index: 1;
  height: calc(var(--header-height) + 64px);
}

.write-up[data-at] {
  line-height: 1.75;
  letter-spacing: 0.4px;
  font-family: monospace;
  font-size: 1.25rem;
  margin-bottom: var(--x-gutter);
  color: var(--body-c);
}

.sm-down .write-up[data-at] {
  font-size: 1rem;
}
</style>
