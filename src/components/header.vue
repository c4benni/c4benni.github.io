<script>
import { h, resolveComponent, reactive, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { nextAnimFrame } from "../fendui/utils/core";
import { UiIcon } from "./utils/icons";
import states from "./utils/states";

const scoping = { "data-ahr": "" };

const header = (d, c) => h("header", d, c);

const btn = (d, c) => h(resolveComponent("ui-btn"), d, c);

const h1 = (d, c) => h("h1", d, c);

const span = (d, c) => h("span", d, c);

const div = (d, c) => h("div", d, c);

const nav = (d, c) => h("nav", d, c);

export default {
  name: "AppHeader",
  setup() {
    const data = reactive({
      tooltip: false,
      filled: false,
    });
    const route = useRoute();

    watch(
      () => route.path,
      () => {
        states.mobileMenu = false;
      }
    );

    let sleepId;

    return function () {
      const isMobile = /sm|xs|xxs/.test(this.$breakpoints.is);

      sleepId = this._.uid + "header";

      const routeHash = this.$route.hash;

      const links = () =>
        [
          {
            title: "About",
            underlineWidth: "7ch",
            underlineEndPoint: isMobile ? "72" : "42.5",
            class: "about",
            hash: "#about",
            get active() {
              return routeHash === this.hash;
            },
          },
          {
            title: "Projects",
            underlineWidth: "9ch",
            underlineEndPoint: isMobile ? "90" : "60",
            class: "projects",
            hash: "#projects",
            get active() {
              return routeHash === this.hash;
            },
          },
          {
            title: "Reach out",
            underlineWidth: "9ch",
            underlineEndPoint: isMobile ? "110" : "70",
            class: "reach-out",
            hash: "#contact",
            get active() {
              return routeHash === this.hash;
            },
          },
        ].map((item, key) => {
          return btn(
            {
              key: key + "link",
              ...scoping,
              to: `/${item.hash}`,
              class: [
                "link",
                {
                  active: key == states.activeHeaderIndex,
                },
                item.class,
              ],
              text: item.active && isMobile,
              filled: item.active && isMobile,
              fillConfig: {
                opacity: 0.1,
              },
              onClick: () => {
                nextAnimFrame(() => {
                  states.mobileMenu = false;

                  const h2 = document.querySelector(`${item.hash} > h2`);

                  if (h2) {
                    window.scrollTo({
                      top: h2.getBoundingClientRect().top - 56 + scrollY,
                      behavior: "smooth",
                    });
                  }
                });
              },
            },
            {
              default: () => [
                span(
                  {
                    ...scoping,
                    class: [
                      "link-title-wrap",
                      {
                        active: item.active,
                      },
                    ],
                  },
                  [
                    item.title,

                    // item.active
                    //   ? div(
                    //       {
                    //         ...scoping,
                    //         class: [
                    //           "underline fade-scale-appear",
                    //           {
                    //             active: item.active,
                    //           },
                    //         ],
                    //       },
                    //       [
                    //         underline(
                    //           item.underlineWidth,
                    //           item.underlineEndPoint
                    //         ),
                    //       ]
                    //     )
                    //   : null,
                  ]
                ),
              ],
            }
          );
        });

      return header(
        {
          ...scoping,
          class: [
            "root fill-before",
            {
              "menu-active": states.mobileMenu,
              filled: isMobile || data.filled,
            },
          ],
        },
        [
          h(
            resolveComponent("UiIntersection"),
            {},
            {
              default: (p) => {
                data.filled = !p.isIntersecting;
                return h("div", {
                  ...scoping,
                  class: "pseudo fill-obs",
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
              [
                h1(
                  {
                    ...scoping,
                    class: ["logo"],
                    onClick: () => {
                      states.mobileMenu = false;

                      scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    },
                  },
                  [
                    h(
                      resolveComponent("router-link"),
                      { to: "/" },
                      {
                        default: () => "C4Benni",
                      }
                    ),
                  ]
                ),

                /md|lg|xl/.test(this.$breakpoints.is)
                  ? [
                      nav({ ...scoping, class: ["link-wrap"] }, [links({})]),
                      // themeBtn,
                    ]
                  : [
                      div(
                        {
                          class: "socials",
                        },
                        [
                          states.socials.map((item, key) => {
                            return btn(
                              {
                                key: key + "footer",
                                class: ["socials-link"],
                                tag: "a",
                                href: item.href,
                                rel: "noopener noreferrer",
                                target: "_blank",
                                title: item.title,
                              },
                              {
                                default: () =>
                                  UiIcon({
                                    icon: item.icon,
                                    size: 20,
                                  }),
                              }
                            );
                          }),
                        ]
                      ),
                      // themeBtn,

                      // modal(
                      //   {
                      //     transition: {
                      //       config: ["fade", { duration: "500ms" }],
                      //       previousTransform: "translateX(-50%)",
                      //     },
                      //     backdrop: false,
                      //     modelValue: states.mobileMenu,
                      //     "onUpdate:modelValue": (e) => {
                      //       states.mobileMenu = e;
                      //     },
                      //     rootData: {
                      //       class: ["app-menu-root"],
                      //     },
                      //   },
                      //   {
                      //     default: (payload) => {
                      //       return states.mobileMenu
                      //         ? nav(
                      //             {
                      //               ...scoping,
                      //               class: [
                      //                 "app-menu",
                      //                 {
                      //                   entered:
                      //                     /afterE/.test(
                      //                       payload.transition.state
                      //                     ) && states.mobileMenu,
                      //                 },
                      //               ],
                      //             },
                      //             [links(payload)]
                      //           )
                      //         : null;
                      //     },
                      //     activator: (payload) => {
                      //       return btn(
                      //         {
                      //           key: states.mobileMenu + "menu",
                      //           ...scoping,
                      //           class: ["menu-btn fade-scale-appear"],
                      //           onClick: () => {
                      //             states.mobileMenu = !states.mobileMenu;
                      //           },
                      //           icon: true,
                      //           style: {
                      //             zIndex: payload.active
                      //               ? payload.zIndex + 1
                      //               : undefined,
                      //           },
                      //         },
                      //         {
                      //           default: () =>
                      //             UiIcon({
                      //               icon: states.mobileMenu
                      //                 ? "windowClose"
                      //                 : "menu",
                      //               size: "20px",
                      //             }),
                      //         }
                      //       );
                      //     },
                      //   }
                      // ),
                    ],
              ],
            ]
          ),
        ]
      );
    };
  },
};
</script>

<style>
.root[data-ahr] {
  --icon-size: calc(var(--header-height) - 1.5rem);
  width: 100%;
  height: var(--header-height);
  position: relative;
}

.root[data-ahr] {
  position: sticky;
  top: 0;
  z-index: 10;
}

.fill-obs[data-ahr] {
  height: 2px;
  top: -4px;
}

.container[data-ahr] {
  padding: 0 var(--x-gutter);
  width: 100%;
  margin: 0 auto;
  height: 100%;
  max-width: var(--max-width);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-auto-flow: column;
  justify-items: flex-end;

  align-items: center;
  padding-right: 0;
}

.theme-btn[data-ahr] {
  height: 38px;
  width: 38px;
}

.root[data-ahr].filled {
  background-image: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0.85));
  /* backdrop-filter: var(--header-backdrop-filter); */
}

.root[data-ahr]::before {
  border-bottom: 0.5px solid;
  opacity: 0;
  transform: scale3d(0, 0, 1);
  transition: 0.25s transform;
  transform-origin: left;
  z-index: 1;
}

.root[data-ahr].filled::before {
  opacity: 0.15;
  transform: scale3d(1, 1, 1);
}

.sm-down .root[data-ahr].menu-active::before {
  opacity: 0;
}

.sm-down .root[data-ahr]::before {
  opacity: 0.15;
  transform: scale3d(1, 1, 1);
}

.sm-down .root[data-ahr] {
  padding-right: 0.25rem;
}

.logo[data-ahr] {
  font-size: 1.5rem;
  font-family: var(--cursive-font-family);
  pointer-events: auto;
}

.logo[data-ahr] > a {
  color: var(--title-c);
}

.link[data-ahr] {
  opacity: var(--t-caption);
}

.md-up .link[data-ahr] {
  /* padding: 0.25rem 0.5rem; */
  height: 32px;
  font-size: 1rem;
  margin-right: 8px;
  padding: 0 1rem;
}

.sm-down .link[data-ahr] {
  width: 100%;
  display: grid;
  border-radius: 0;
}

.can-hover .link[data-ahr]:hover,
.link[data-ahr]:focus,
.link[data-ahr].active {
  opacity: 1;
}

.link[data-ahr].active::before {
  opacity: 0.2;
}

.link-title-wrap[data-ahr] {
  position: relative;
}

.underline[data-ahr] {
  position: absolute;
  bottom: -18px;
  overflow: hidden;
  z-index: -1;
}

.underline[data-ahr] svg,
.underline[data-ahr] path {
  stroke-linecap: round;
}

.underline[data-ahr] {
  transform-origin: left;
  --scale-x: 0;
  --scale-y: 1;
  --appear-from: 1;
  --appear-ease: ease-in-out;
  --appear-duration: 250ms;
}

.app-menu-root {
  pointer-events: none;
  outline: none;
}

.app-menu[data-ahr] {
  height: calc(100% - 64px);
  width: 100%;
  background: var(--theme-surface);
  bottom: 0;
  position: absolute;
  pointer-events: auto;
  display: grid;
  justify-items: center;
  align-content: flex-start;
  row-gap: 2rem;
  padding-top: 2rem;
  pointer-events: none;
  max-width: 720px;
  left: 50%;
  transform: translateX(-50%);
  max-height: 100%;
  overflow: auto;
  padding-bottom: 2rem;
}

.app-menu[data-ahr] > .ui-btn {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
  height: 58px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.app-menu[data-ahr] > .about {
  transition: 0.3s ease-in-out transform, 0.3s ease-in-out opacity;
}

.app-menu[data-ahr] > .projects {
  transition: 0.5s ease-in-out transform, 0.5s ease-in-out opacity;
}

.app-menu[data-ahr] > .reach-out {
  transition: 0.75s ease-in-out transform, 0.75s ease-in-out opacity;
}

.app-menu[data-ahr].entered {
  pointer-events: auto;
}

.app-menu[data-ahr].entered > .ui-btn {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.socials {
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--half-x-gutter);
  justify-content: flex-end;
  justify-items: flex-end;
  align-items: center;
}

.socials-link {
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
}
</style>
