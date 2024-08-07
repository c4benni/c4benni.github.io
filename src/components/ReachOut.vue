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

import { postMessage } from "./api";
import { Checked } from "./utils/functional";
import { UiIcon } from "./utils/icons";
import states from "./utils/states";

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

const section = (d: VNodeData, c: VNodeChild) => h("section", d, c);

const div = (d: VNodeData, c: VNodeChild) => h("div", d, c);
const em = (d: VNodeData, c: VNodeChild) => h("em", d, c);

// @ts-ignore
const form = (d: VNodeData, c: VNodeChild) =>
  h(resolveComponent("UiForm"), d, c);

// @ts-ignore
const Intersection = (d: VNodeData, c: VNodeChild) =>
  h(resolveComponent("UiIntersection"), d, c);
// @ts-ignore
const btn = (d: VNodeData, c: VNodeChild) => h(resolveComponent("UiBtn"), d, c);
// @ts-ignore
const input = (d: VNodeData) => h(resolveComponent("UiInput"), d);
// @ts-ignore
const sheet = (d: VNodeData, c: VNodeChild) =>
  h(resolveComponent("UiSheet"), d, c);

const h2 = (d: VNodeData, c: VNodeChild) => h("h2", d, c);
const h3 = (d: VNodeData, c: VNodeChild) => h("h3", d, c);

const br = h("br");

export default defineComponent({
  name: "ReachOut",

  setup() {
    const data = reactive({
      name: "",
      email: "",
      message: "",
      postingMessage: false,
      error: null,
      errorTitle: ["Oops!", "An error occured"][Math.floor(Math.random() * 2)],
    });

    return function () {
      const isMobile = /sm|xs|xxs/.test(this.$breakpoints.is);

      return section(
        {
          id: "contact",
          class: ["root fade-scale-appear"],
        },
        [
          Intersection(
            {},
            {
              default: (payload) => {
                if (payload.isIntersecting) {
                  states.activeHeaderIndex = 2;
                } else if (payload.leaveBottom) {
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
              config: { thresholds: 0.2 },
            },
            {
              default: (payload: IntersectionPayload) => {
                const reveal = payload.isIntersecting;

                return h2(
                  {
                    class: "reveal-wrap",
                  },
                  [
                    div(
                      {
                        class: "reveal gradient-text title app-title",
                        style: {
                          opacity: reveal ? "1" : "0",
                          transform: `translate3d(0,${
                            reveal ? "0" : ".5rem"
                          },0)`,
                        },
                      },
                      ["Hi there!"]
                    ),
                  ]
                );
              },
            }
          ),

          div(
            {
              class: [
                "main",
                {
                  "fill-after": /sm|xs|xxs/.test(this.$breakpoints.is),
                },
              ],
            },
            [
              h3(
                {
                  class: "subtitle",
                },
                [
                  "Feel free to reach out if you want us to work together,",
                  !isMobile ? br : " ",
                  "or if you just wanna say Hi! 👋",
                ]
              ),

              div(
                {
                  class: ["socials-wrap"],
                },
                [
                  [
                    {
                      text: "Send an Email",
                      icon: "email",
                      href: `mailto:c4benni@gmail.com`,
                    },
                  ].map((item, key) => {
                    return btn(
                      {
                        key: key + "social-icon",
                        class: ["dm"],
                        tag: "a",
                        href: item.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: (item.title || item.text).toLowerCase(),
                      },
                      {
                        default: () => {
                          return [
                            div(
                              {
                                class: ["social-icon-wrap", item.icon],
                              },
                              [
                                UiIcon({
                                  icon: item.icon,
                                }),
                              ]
                            ),
                            item.text,
                          ];
                        },
                      }
                    );
                  }),
                ]
              ),

              div(
                {
                  class: "divide-wrap",
                },
                [em({ class: "divide" }, "OR")]
              ),

              form(
                {
                  name: "send-message",
                  action: ".",
                  class: ["form fill-before"],
                  showSubmit: false,
                  "onSubmit-clicked": () => {
                    data.message = (data.message || "").trim();
                    data.name = data.name.trim();
                    data.email = data.email.trim();

                    data.error = false;
                  },
                  "onSubmit-form": async () => {
                    data.postingMessage = true;

                    const request = await postMessage({
                      name: data.name,
                      email: data.email,
                      message: data.message,
                    });

                    data.error = request.error;

                    data.postingMessage = false;

                    request.data && (data.message = undefined);

                    states.showSuccess = true;
                  },
                },
                {
                  default: () => {
                    return [
                      div({ class: "form-image-blur-wrap" }, [
                        div(
                          {
                            class: "form-image-blur",
                          },
                          []
                        ),
                      ]),
                      h2(
                        {
                          class: "form-title",
                        },
                        ["Send a message"]
                      ),
                      [
                        {
                          label: `Name${data.name ? "" : "*"}`,
                          autocomplete: "name",
                          pattern: "^.{2,99}$",
                          placeholder: "Sade Adu",
                          validate: (i: string) => {
                            const e = i.trim();
                            if (!e) {
                              return "Required";
                            }

                            if ((e?.length || 0) < 2) {
                              return "Min length is 2";
                            }

                            if ((e?.length || 0) > 99) {
                              return "Max length is 99";
                            }

                            return true;
                          },
                        },
                        {
                          label: `Email${data.email ? "" : "*"}`,
                          autocomplete: "email",
                          type: "email",
                          placeholder: "example@domain",
                          pattern:
                            "^\\s*?[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\s*?$",
                          validate: (e: string) => {
                            const value = e?.trim();
                            const validEmail =
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                value
                              );

                            if (!value.length) {
                              return "Required";
                            }
                            if (!validEmail) {
                              return "Invalid format";
                            }
                            if ((e?.length || 0) > 320) {
                              return "Max length is 320";
                            }
                            return true;
                          },
                        },
                        {
                          label: `Message${data.message ? "" : "*"}`,
                          path: "message",
                          pattern: ".{10,}",
                          type: "textarea",
                          placeholder: "At least 10 characters",
                          validate: (i: string) => {
                            if (typeof data.message == "string") {
                              const e = i.trim();

                              if (!e) {
                                return "Required";
                              }

                              if ((e?.length || 0) < 10) {
                                return "Min length is 10";
                              }

                              return true;
                            }

                            return true;
                          },
                        },
                      ].map((item, key) => {
                        const path = item.path || item.autocomplete;

                        return input({
                          key: key + "input",
                          label: item.label,
                          modelValue: data[path],
                          "onUpdate:modelValue": (e: string) => {
                            data[path] = e;
                            data.message = data.message || "";
                          },
                          pattern: item.pattern,
                          validate: item.validate,
                          placeholder: item.placeholder,
                          type: item.type,
                        });
                      }),
                    ];
                  },

                  append: ({ submit }) => {
                    return sheet(
                      {
                        modelValue: states.showSuccess,
                        "onUpdate:modelValue": (e: boolean) => {
                          states.showSuccess = e;
                        },
                      },
                      {
                        default: ({ close }) => {
                          return div({}, [
                            [
                              data.error
                                ? UiIcon({
                                    icon: "windowClose",
                                    size: "96px",
                                    data: {
                                      class: "close-icon",
                                    },
                                  })
                                : Checked(),

                              h2(
                                {
                                  class: ["sheet-title"],
                                },
                                [data.error ? data.errorTitle : "Message sent!"]
                              ),
                              h3(
                                {
                                  class: ["sheet-subtitle"],
                                },
                                [
                                  data.error
                                    ? data.error?.message || "An error occured"
                                    : [
                                        "Thanks for reaching out!",
                                        br,
                                        `I'll send a reply to your email within 24 hours.`,
                                      ],
                                ]
                              ),

                              btn(
                                {
                                  class: ["sheet-action primary"],
                                  onClick: close,
                                },
                                {
                                  default: () => {
                                    return "Close";
                                  },
                                }
                              ),
                            ],
                          ]);
                        },
                        activator: () => {
                          return btn(
                            {
                              class: "send",
                              title: "send message",
                              onClick: submit,
                            },
                            {
                              default: () => [
                                UiIcon({
                                  icon: "send",
                                }),
                                "Send message",
                                data.postingMessage
                                  ? div(
                                      {
                                        class: [
                                          "submit-loading-wrap fade-slide-x-appear",
                                        ],
                                      },
                                      [
                                        div(
                                          {
                                            class: ["spinner-border"],
                                          },
                                          []
                                        ),
                                        "Sending message",
                                      ]
                                    )
                                  : null,
                              ],
                            }
                          );
                        },
                      }
                    );
                  },
                }
              ),
            ]
          ),
        ]
      );
    };
  },
});
</script>

<style scoped>
.root:not([data-uit]) {
  padding: var(--qtr-x-gutter) var(--x-gutter);
  --appear-duration: 200ms;
  --title-font-size: max(6vw, 108px);
}

.sm-down .root {
  --title-font-size: 56px;
}

.title {
  font-size: var(--title-font-size);
  font-weight: 800;
  text-align: left;
  background-image: linear-gradient(
    to right,
    var(--theme-surface-invert),
    var(--secondary)
  );
  line-height: 1.3;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  text-align: left;
  line-height: 1.4;
  color: var(--subtitle-c);
}

.sm-down .subtitle {
  font-size: 1.1rem;
  max-width: 80%;
}

.main {
  display: grid;
}

.socials-wrap {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  column-gap: 2rem;
  margin: 3rem 0;
}

.social-icon-wrap {
  padding: 0.75rem;
  border-radius: 1rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.social-icon-wrap.twitter {
  background: linear-gradient(
    to right,
    hsl(203, 89%, 53%),
    hsl(197, 100%, 47%)
  );
}

.social-icon-wrap.email {
  background: linear-gradient(to right, #304ffe, #536dfe);
}

.dm {
  background-color: transparent;
  gap: 0.75rem;
  border-radius: 18px;
  margin: calc(var(--x-gutter) * 1.5) auto;
  height: 96px;
  align-content: center;
  justify-items: center;
  font-size: 1rem;
  color: var(--subtitle-c);
}

.divide-wrap {
  position: relative;
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divide-wrap::before {
  --linear-dir: to right;
}

.divide-wrap::after {
  --linear-dir: to left;
}

.divide {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 1rem;
  align-items: center;
  color: var(--caption-c);
  position: absolute;
  width: 100%;
}

.divide::before,
.divide::after {
  width: 100%;
  height: 1px;
  background-color: var(--title-c);
  content: "";
  opacity: 0.15;
}

.form {
  width: 100%;
  max-width: calc(550px + 3rem);
  margin: calc(var(--x-gutter) * 2) auto 128px;
  display: grid;
  padding: 2rem 1.5rem;
  background-color: rgba(16, 16, 54, 0.6);
  border-radius: var(--ui-rounded-lg);
  position: relative;
}

.form::before {
  border: 0.75px solid currentColor;
  opacity: 0.1;
}

.form-image-blur-wrap,
.form-image-blur {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.form-image-blur-wrap {
  z-index: -1;
  overflow: hidden;
  isolation: isolate;
  opacity: 0;
  transition: 0.5s opacity;
  border-radius: inherit;
}

@media (pointer: fine) and (hover: hover) {
  .form:hover .form-image-blur-wrap {
    opacity: 1;
  }

  .md-up .form-image-blur {
    filter: blur(100px) saturate(2);
    background-image: url("https://res.cloudinary.com/c4benn/image/upload/v1641483094/portfolio/sunset4_yc3q0v.jpg");
  }
}

.form-title {
  margin-bottom: 1rem;
}

.form > .root[data-uit] {
  margin-bottom: var(--half-x-gutter);
}

.send {
  background: var(--primary-bg);
  color: #000;
  column-gap: 0.5rem;
  border-radius: var(--ui-rounded-lg);
  width: min(70%, 300px);
  margin: calc(var(--x-gutter) * 1.5) auto;
}

.submit-loading-wrap {
  background: var(--primary-bg);
  position: absolute;
  top: 0;
  border-radius: inherit;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: grid;
  align-content: center;
  justify-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  grid-auto-flow: column;
}

.content[data-ui-sheet] {
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
  height: 420px;
  background: var(--theme-banner);
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: flex-start;
  padding: 1rem;
  padding-top: 2rem;
  border-radius: var(--ui-rounded-lg);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.close-icon {
  color: var(--error-bg);
  display: inline-block;
  stroke-width: 1.5px;
}

.sheet-title {
  font-size: 38px;
  font-weight: 800;
  color: var(--title-c);
  margin: 1rem auto 0.5rem;
}

.sm-down .sheet-title {
  font-size: 32px;
}

.sheet-subtitle {
  font-size: 1rem;
  color: var(--subtitle-c);
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-align: center;
  margin-top: 0.25rem;
}

.sheet-action {
  position: absolute;
  bottom: calc(32px + 0.75rem);
  width: min(70%, 300px);
  font-size: 1.25rem;
  border-radius: var(--ui-rounded-lg);
}
</style>
