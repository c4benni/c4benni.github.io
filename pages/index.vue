<script>
import {
  h,
  inject,
  onMounted,
  reactive,
  resolveComponent,
  watch,
} from "@vue/runtime-core";
import states from "../src/components/utils/states";

const article = (d, c) => h("article", d, c);

const div = (d, c) => h("div", d, c);
const img = (d) => h("img", d);

const section = (d, c) => h("section", d, c);

const h2 = (d, c) => h("h2", d, c);
const h3 = (d, c) => h("h3", d, c);
const h4 = (d, c) => h("h4", d, c);
const p = (d, c) => h("p", d, c);
const span = (d, c) => h("span", d, c);
const em = (d, c) => h("em", d, c);

const HelloAnimation = () => h(resolveComponent("HelloAnimation"));

const Intersection = (d, c) => h(resolveComponent("UiIntersection"), d, c);

const scoping = { "data-hpe": "" };

export default {
  name: "HomePage",
  meta: {
    title: "Home page",
  },
  setup() {
    const data = reactive({
      isMounted: false,
      firstSubtitleAppear: false,
      firstTitleAppear: false,
      // themeChanged: false,
    });

    const fendui = inject("$fendui");

    // const theme = inject("$theme");

    // if (!data.themeChanged) {
    //   watch(
    //     () => theme.is,
    //     () => {
    //       data.themeChanged = true;
    //     }
    //   );
    // }

    onMounted(() => {
      fendui.sleep({
        delay: 200,
        callback: () => {
          data.isMounted = true;
        },
      });
    });

    return function () {
      const isMobile = /sm|xs|xxs/.test(this.$breakpoints.is);
      return article(
        {
          class: [
            "root",
            {
              "is-mounted": data.isMounted,
            },
          ],
        },
        [
          section(
            {
              class: ["hello"],
            },
            [
              HelloAnimation(),
              h3(
                {
                  class: "name",
                },
                ["I'm Chidi Benedict,"]
              ),

              h4(
                {
                  class: "h4",
                },
                [
                  div({}, ["Javascript Developer."]),
                  div({}, [
                    span({}, [
                      "Love building web apps, ",
                      span({}, ["and"]),
                      span({}, [" mobile apps using react native."]),
                    ]),
                  ]),
                  div({}, ["Optimum performance and design fanatic."]),
                  div({}, [em({}, ["/he|him/i"])]),
                ]
              ),
            ]
          ),

          h(resolveComponent("AppMarquee")),

          section(
            {
              class: ["about", { "fill-before": isMobile }],
              id: "about",
            },
            [
              Intersection(
                {},
                {
                  default: (payload) => {
                    if (payload.isIntersecting) {
                      states.activeHeaderIndex = 0;
                    } else if (payload.leaveBottom) {
                      states.activeHeaderIndex = null;
                    } else if (payload.leaveTop) {
                      states.activeHeaderIndex = 1;
                    }

                    return div(
                      {
                        class: "pseudo header-tracker",
                      },
                      []
                    );
                  },
                }
              ),
              Intersection(
                {
                  once: true,
                },
                {
                  default: (payload) => {
                    const reveal = payload.isIntersecting;

                    return h2(
                      {
                        class: "reveal-wrap relative",
                      },
                      [
                        div(
                          {
                            class: "reveal gradient-text title",
                            style: {
                              opacity: reveal ? "1" : "0",
                              transform: `translate3d(0,${
                                reveal ? "0" : ".5rem"
                              },0)`,
                            },
                          },
                          ["About."]
                        ),
                      ]
                    );
                  },
                }
              ),

              div(
                {
                  class: "about-content",
                },
                [
                  Intersection(
                    { once: true, config: { thresholds: 0.2 } },
                    {
                      default: (payload) => {
                        const reveal = payload.isIntersecting;

                        return div(
                          {
                            class: [
                              "img-wrap reveal-wrap",
                              {
                                "fill-before": isMobile,
                              },
                            ],
                          },
                          [
                            img({
                              class: ["image reveal"],
                              style: {
                                opacity: reveal ? "1" : "0",
                                transform: isMobile
                                  ? `scale3d(${`${
                                      reveal ? "1" : "0.9"
                                    },`.repeat(2)}1)`
                                  : `translate3d(${
                                      reveal ? "0" : "-1rem"
                                    },0,0)`,
                                transitionDelay: "100ms",
                              },
                              src: "https://res.cloudinary.com/c4benn/image/upload/q_91/v1641988318/portfolio/about.jpg",
                              alt: "about image",
                            }),
                          ]
                        );
                      },
                    }
                  ),

                  Intersection(
                    { once: true, config: { thresholds: 0.2 } },
                    {
                      default: (payload) => {
                        const reveal = payload.isIntersecting;

                        const translate = reveal
                          ? "0"
                          : `${isMobile ? "" : "-"}1.5rem`;

                        return div({}, [
                          div(
                            {
                              ...scoping,
                              class: [
                                "write-up-wrap about-main reveal",
                                {
                                  "fill-after": isMobile,
                                },
                              ],
                              style: {
                                opacity: reveal ? "1" : "0",
                                transform: `translate3d(${
                                  isMobile ? "0" : translate
                                },${isMobile ? translate : "0"},0)`,
                                transitionDelay: "200ms",
                              },
                            },
                            [
                              p(
                                {
                                  class: ["write-up intro"],
                                },
                                [
                                  "Chidi is a web developer and product designer based in Lagos, Nigeria, who provides quality software solutions to companies and individuals through top notch Websites and Web Apps that can be accessed on any device with a browser.",
                                ]
                              ),

                              p(
                                {
                                  class: ["write-up skills"],
                                },
                                [
                                  "His core software skills ranges from, but not limited to CSS, Javascript, PostgreSQL, NodeJS, VueJS, NuxtJS, React, & React Native.",
                                ]
                              ),

                              p(
                                {
                                  class: ["write-up frretime"],
                                },
                                [
                                  "With music always in his ears, you'd catch him out of the office playing video games, watching documentaries, or in a nearby gym.",
                                ]
                              ),
                            ]
                          ),
                        ]);
                      },
                    }
                  ),
                ]
              ),
            ]
          ),

          h(resolveComponent("ProjectPage")),

          h(resolveComponent("ReachOut")),
        ]
      );
    };
  },
};
</script>

<style scoped>
.root > section {
  max-width: 100vw;
  position: relative;
  padding-bottom: 48px;
  margin-top: 96px;
}

.md-up .root > section {
  margin-top: 124px;
}

.root > section::before {
  border-bottom: 0.75px solid;
  opacity: 0.15;
}

.hello {
  display: grid;
  text-align: center;
  padding: 0 1rem;
}

.name {
  margin: 1.5rem 0;
  font-size: 2.5rem;
  color: var(--body-c);
}

.h4 {
  line-height: 1.75;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--body-c);
}

.sm-down .h4 {
  font-size: 1.25rem;
}

.h4 > div:last-child {
  color: var(--caption-c);
  line-height: 2.5;
}

.title {
  --title-font-size: max(8vw, 108px);
}

.sm-down .title {
  --title-font-size: 56px;
  text-align: center;
  margin-bottom: 2rem;
}

.about {
  display: grid;
}

.about-content {
  max-width: 1150px;
  margin: 1rem auto;
  width: 100%;
  display: grid;
  position: relative;
}

.md-up .about-content {
  grid-template-columns: auto 1fr;
  column-gap: 3rem;
}

.title {
  font-size: var(--title-font-size);
  font-family: var(--header-font-family);
  font-weight: 800;
  text-align: left;
  background-image: linear-gradient(
    30deg,
    var(--theme-surface-invert),
    var(--secondary) 60%
  );
}

.about-main {
  margin-top: 2rem;
}

.sm-down .about-main {
  padding: 0 1.5rem;
}

.write-up {
  line-height: 1.85;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
  margin-bottom: var(--x-gutter);
  color: var(--body-c);
}

.img-wrap {
  height: 128px;
  width: 128px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.image {
  height: 100%;
  width: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.sm-down .image {
  border: 1.5px solid var(--secondary);
}

.sm-down .img-wrap {
  justify-self: center;
}

.md-up .img-wrap {
  height: 400px;
  width: 400px;
  border-radius: var(--ui-rounded-lg);
  position: sticky;
  top: calc(var(--header-height) + 2rem);
}
</style>
