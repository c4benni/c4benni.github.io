<script>
import { h, resolveComponent, reactive } from "@vue/runtime-core";
import { UiIcon } from "./utils/icons";

const div = (d, c) => h("div", d, c);

const scoping = { "data-pm": "" };

const img = (d, c) => h(resolveComponent("UiImg"), d, c);
const btn = (d, c) => h(resolveComponent("UiBtn"), d, c);
const Intersection = (d, c) => h(resolveComponent("UiIntersection"), d, c);

const h2 = (d, c) => h("h2", d, c);
const h3 = (d, c) => h("h3", d, c);

export default {
  name: "ProjectsItem",

  props: {
    live: Boolean,
    ariaLabel: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },

  setup() {
    return function () {
      const largeDevice = /md|lg|xl/.test(this.$breakpoints.is);

      const imageHeight = /sm|xs|xxs/.test(this.$breakpoints.is)
        ? this.$breakpoints.is == "sm"
          ? "280px"
          : "220px"
        : "320px";

      const images = this.images.map((image, i) => {
        if (!largeDevice && i != 0) {
          return null;
        }

        return img({
          ...scoping,
          class: [
            "image",
            {
              "hover-image": i == 1,
            },
          ],
          height: imageHeight,
          width: "100%",
          ...image,
        });
      });

      return Intersection(
        { once: true, config: { thresholds: 0.2 } },
        {
          default: (payload) => {
            const reveal = payload.isIntersecting;

            return div(
              {
                ...scoping,
                class: "root-wrap",
              },
              [
                btn(
                  {
                    tag: "a",
                    ...scoping,
                    "aria-label": this.ariaLabel,
                    class: ["root reveal"],
                    href: this.to,
                    title: `open ${this.title} in a new tab`,
                    rel: "noopener noreferrer",
                    target: "_blank",
                    outlined: largeDevice,
                    outlineConfig: {
                      opacity: 0.1,
                    },
                    style: {
                      opacity: reveal ? "1" : "0",
                      transform: `translate3d(0,${reveal ? "0" : "1.5rem"},0)`,
                      transitionDelay: "150ms",
                    },
                  },
                  {
                    default: () => [
                      largeDevice
                        ? div(
                            {
                              ...scoping,
                              class: "image-blur-wrap",
                            },
                            [
                              div({
                                ...scoping,
                                class: "image-blur",
                              }),
                            ]
                          )
                        : null,

                      largeDevice
                        ? div(
                            {
                              ...scoping,
                              class: ["image-wrap"],
                              style: {
                                height: imageHeight,
                              },
                            },
                            [images]
                          )
                        : images,

                      div(
                        {
                          ...scoping,
                          class: ["info fill-before"],
                        },
                        [
                          largeDevice
                            ? div(
                                {
                                  ...scoping,
                                  class: ["date"],
                                },
                                this.date
                              )
                            : null,
                          h2(
                            {
                              ...scoping,
                              class: ["title"],
                            },
                            this.title
                          ),

                          h3(
                            {
                              ...scoping,
                              class: ["subtitle truncate-text"],
                            },
                            this.subtitle
                          ),
                        ]
                      ),
                    ],
                  }
                ),
              ]
            );
          },
        }
      );
    };
  },
};
</script>

<style>
.root[data-pm] {
  overflow: hidden;
  isolation: isolate;
  height: fit-content;
  width: 100%;
  display: grid;
  grid-auto-flow: revert;
  padding: 0;
  justify-items: flex-start;
  grid-template-columns: 1fr;
  background-color: rgba(16, 16, 54, 0.6);
  border-radius: var(--ui-rounded-lg) !important;
  overflow: visible;
}

.root-wrap[data-pm] {
  transition: 0.25s transform;
  transform-origin: bottom;
}

.can-hover .root-wrap[data-pm]:hover {
  transform: translateY(-4px) scale(1.05) translateZ(0);
}

.can-hover .root-wrap[data-pm] > a::after:hover {
  box-shadow: 0 25px 50px -12px #000 !important;
}

.can-hover .root[data-pm]:hover::after {
  opacity: 1;
  background: transparent;
}

.root[data-pm]::before,
.root[data-pm]::after {
  opacity: 0;
  transition: opacity 0.25s;
  border: none !important;
  z-index: -1;
}

.root[data-pm]::after {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.dark-theme .root[data-pm]::before {
  background: rgba(26, 26, 88, 0.6);
}

.dark-theme.can-hover .root[data-pm]:hover::before {
  opacity: 0.5;
}

.dark-theme .root[data-pm]::after {
  box-shadow: 0 25px 50px -12px rgba(17, 17, 119, 0.4);
}

.light-theme .root[data-pm] {
  background-color: var(--theme-banner);
}

.sm-down .root[data-pm] {
  background-color: transparent;
}

.sm-down .root[data-pm]::before {
  visibility: hidden;
}

.image-wrap[data-pm] {
  position: relative;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
  width: 100%;
}

.image[data-pm] {
  object-fit: cover;
  object-position: left;
}

.md-up .image[data-pm] {
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s linear;
  transition-property: opacity, transform;
}

.md-up .image[data-pm].hover-image {
  opacity: 0;
  transform: translate3d(-8px, 0, 0);
}

.md-up.can-hover .root[data-pm]:hover .image[data-pm] {
  opacity: 0.75;
  transform: translate3d(8px, 0, 0);
}

.md-up.can-hover .root[data-pm]:hover .image[data-pm].hover-image {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.image-blur-wrap[data-pm],
.image-blur[data-pm] {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.image-blur-wrap[data-pm] {
  z-index: -1;
  overflow: hidden;
  isolation: isolate;
  opacity: 0;
  transition: 0.5s opacity;
  border-radius: inherit;
}

.can-hover .root[data-pm]:hover .image-blur-wrap[data-pm] {
  opacity: 1;
}

.image-blur[data-pm] {
  filter: blur(100px) saturate(2);
  background-image: url("https://res.cloudinary.com/c4benn/image/upload/v1641483094/portfolio/sunset4_yc3q0v.jpg");
}

/* .light-theme .image-blur[data-pm]{
  filter: blur(100px);
   background-image: url("https://res.cloudinary.com/c4benn/image/upload/v1641483578/portfolio/sunrise2_gwgwb2.jpg");
} */

.sm-down .image[data-pm] {
  border-radius: inherit;
  border: 0.75px solid rgba(255, 255, 255, 0.15);
}

.sm-down.dark-theme .image[data-pm] {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.info[data-pm] {
  padding: 0.75rem 1rem var(--x-gutter);
  width: 100%;
  text-align: left;
  line-height: 1;
  position: relative;
  overflow: hidden;
}

.sm-down .info[data-pm] {
  padding: 0.75rem 4px;
}

.md-up .info[data-pm]::before {
  border-top: 0.5px solid;
  opacity: 0.15;
}

.date[data-pm] {
  font-weight: 400;
  color: var(--caption-c);
  line-height: 1.4;
  letter-spacing: 0.2px;
  font-size: 1rem;
}

.title[data-pm] {
  font-weight: 600;
  font-size: 1.25rem;
}

.md-up .title[data-pm] {
  font-weight: 500;
  font-size: 1.5rem;
}

.subtitle[data-pm] {
  font-weight: 400;
  color: var(--caption-c);
  margin-top: 0.5rem;
  font-size: 1.1rem;
  max-width: 100%;
}

.sm-down .subtitle[data-pm] {
  font-size: 0.95rem;
  color: var(--subtitle-c);
}

.badge[data-pm] {
  color: var(--subtitle-c);
  margin-top: 1rem;
  font-size: 0.95rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--theme-surface);
  display: inline-grid;
  grid-auto-flow: column;
  column-gap: 0.25rem;
  border-radius: var(--ui-rounded);
}

.menu-root[data-pm] {
  outline: none;
  width: 100%;
  height: 100%;
}

.menu-btn[data-pm] {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  background-color: var(--theme-surface);
}

.sm-down .menu-btn[data-pm] {
  right: 0.25rem;
}

.menu[data-pm] {
  background-color: var(--theme-banner);
  border-radius: var(--ui-rounded-sm);
  display: grid;
  width: fit-content;
  overflow: hidden;
  isolation: isolate;
  position: absolute;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
}

.menu-item[data-pm] {
  font-size: 1rem;
  column-gap: 10px;
  width: 100%;
  border-radius: 0;
  padding: 0 16px;
}
</style>
