<script>
import {
  h,
  resolveComponent,
  onMounted,
  inject,
  reactive,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  watch,
} from "@vue/runtime-core";
import appHeader from "./components/header.vue";
import states from "./components/utils/states";
import { UiIcon } from "../src/components/utils/icons";
import { useRoute } from "vue-router";

const root = (d, c) => h(resolveComponent("UiRoot"), d, c);

const div = (d, c) => h("div", d, c);

const footer = (d, c) => h("footer", d, c);

const btn = (d, c) => h(resolveComponent("UiBtn"), d, c);

let head = {
  title: undefined,
  description: undefined,
};

export default {
  name: "AppRoot",
  components: { appHeader },

  setup() {
    const fendui = inject("$fendui");

    const data = reactive({ mounted: false });

    const route = useRoute();

    onBeforeMount(() => {
      const Head = document.getElementById("ui-head");

      head.title = Head.querySelector("#ui-meta-title");

      head.description = Head.querySelector("#ui-meta-description");
    });

    onBeforeUnmount(() => {
      head = {};
    });

    watch(
      () => route.path,
      () => {
        data.mounted &&
          requestAnimationFrame(() => {
            const meta = (
              ((route.matched[0] || {}).components || {}).default || {}
            ).meta;

            if (meta) {
              head.title.innerText = `${meta.title} - C4Benn's portfolio`;
            } else {
              head.title.innerText = `C4Benn's portfolio`;
            }
          });
      }
    );

    onMounted(async () => {
      let loadingPage = document.getElementById("app-loading");

      if (!loadingPage) {
        return;
      }

      loadingPage.addEventListener(
        "animationend",
        (e) => {
          e.currentTarget.remove();
        },
        { once: true }
      );

      data.mounted = true;
      await fendui.sleep(200);


      loadingPage.classList.remove("fade-appear");
      loadingPage.classList.add("fade-disappear");

      loadingPage = 0;

      states.appMounted = true
    });
    return function () {

      const isMobile = /sm|xxs|xs/.test(
        this.$breakpoints.is
      );

      const hideFooter = isMobile;

      return  root(
        {
          id: "fendui",
          class: [
            "hide-scrollbar",
            {
              "app-menu-active": states.mobileMenu,
              "hide-footer": hideFooter,
              hidden: !states.appMounted,
              'fade-appear':states.appMounted
            },
          ],
          onTouchstartPassive: () => {},
        },
        {
          default: () => {
            return [
              // div({
              //   class: [
              //     "header-gradient fill-before",
              //     {
              //       "app-menu-active": states.mobileMenu,
              //     },
              //   ],
              // }),
              div({
                style:{
                  width: '100vw',
                  height:'100vh',
                  position:'fixed',
                  top:'0',
                  left:'0',
                  filter:'blur(75px) brightness(0.45)'
                }
              },[
                h(resolveComponent('UiImg'),{
                  src:`img/dark.png`,
                  width:'100%',
                  height:'100%'
                })
              ]),
              h(resolveComponent("appHeader")),
              h(resolveComponent("router-view"), {}),
              div({
                class: [
                  "footer-gradient",
                  {
                    __hidden: hideFooter,
                  },
                ],
              }),

              isMobile ? h(resolveComponent('BottomNav')) : null,

              footer(
                {
                  class: [
                    "app-footer",
                    {
                      __hidden: hideFooter,
                    },
                  ],
                },
                states.socials.map((item, key) => {
                  return btn(
                    {
                      key: key + "footer",
                      class: ["footer-link"],
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
                          size: 20
                        }),
                    }
                  );
                })
              ),
            ];
          },
        }
      );
    };
  },
};
</script>

<style>
#fendui.sm-down {
  --header-height: 64px;
  --x-gutter: 1.5rem;
  padding-top: 0;
}

#fendui.br-xxs {
  --header-height: 56px;
  --x-gutter: 1rem;
  padding-top: 0;
}

#fendui.sm-up {
  --header-height: 56px;
  --x-gutter: 2rem;
}

#app {
  display: grid;
}

#fendui {
  --max-width: 1200px;
  --half-x-gutter: calc(var(--x-gutter) / 2);
  --qtr-x-gutter: calc(var(--x-gutter) / 4);
  --square-x-gutter: calc(var(--x-gutter) * 2);
  margin: 0 auto;
  padding-top: 96px;
  width: 100%;
  /* overflow-x: hidden; */
}

#fendui > article {
  transition: 450ms transform ease-in-out, 450ms opacity ease-in-out;
  transform: translate3d(0, 0, 0);
  opacity: 1;
  max-width: min(100vw, var(--max-width));
  margin: 0 auto;
}

#fendui.app-menu-active > article {
  transform: translate3d(0, 1rem, 0) scale3d(0.975, 0.975, 1);
  opacity: 0;
  transform-origin: bottom;
}

.header-gradient {
  position: fixed;
  top: 0;
  background: linear-gradient(
    180deg,
    var(--theme-surface) 35%,
    var(--faded-theme-surface)
  );
  height: var(--header-height);
  width: 100%;
  left: 0;
  z-index: 2;
}

.footer-gradient {
  position: fixed;
  bottom: 0;
  background: linear-gradient(
    to top,
    var(--theme-surface) 35%,
    var(--faded-theme-surface)
  );
  height: calc(var(--header-height) * 0.5);
  width: 100%;
  left: 0;
  z-index: 99;
  transition: 0.25s ease-in-out transform;
}

.footer-gradient.__hidden,
.app-footer.__hidden {
  transform: translate3d(0, 100%, 0);
}

.header-gradient::before {
  opacity: 0;
  transition: 0.25s linear opacity;
  background: var(--theme-surface);
}

.header-gradient.app-menu-active::before {
  opacity: 1;
}

.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--header-height) * 0.75);
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--half-x-gutter);
  justify-content: center;
  align-items: center;
  z-index: 99;
  transition: 0.25s ease-in-out transform;
}

.footer-link {
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
}
</style>
