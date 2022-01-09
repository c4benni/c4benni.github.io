<script>
import { h } from "@vue/runtime-core";
import intersectionStates from "./utils/intersectionStates";

const scoping = { "data-bg": "" };
const div = (d, c) => h("div", d, c);

export default {
  name: "Background",
  setup() {
    return function () {
      return div(
        {
          ...scoping,
          "aria-hidden": "true",
          class: ["root"],
          style: {
            "--opacity": `${
              intersectionStates.hero
                ? "var(--hero-ratio)"
                : "var(--projects-ratio)"
            }`,
          },
        },
        Array.from({ length: 6 }, (_, i) => i).map((item, key, arr) => {
          return div({
            key: key + "item",
            ...scoping,
            class: [
              "item",
              {
                "inner-item": key != 0 && key != arr.length - 1,
              },
            ],
          });
        })
      );
    };
  },
};
</script>

<style>
.root[data-bg] {
  pointer-events: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--header-height) repeat(4, 1fr) var(
      --header-height
    );
  column-gap: 2px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  pointer-events: none;
  isolation: isolate;
  overflow: hidden;
  transition: 0.15s opacity linear;
  opacity: var(--opacity);
}

.item[data-bg] {
  background: var(--theme-card);
  z-index: 1;
}

.inner-item[data-bg] {
  z-index: 0;
}

.sm-down .inner-item[data-bg] {
  min-height: 150px;
}

.sm-down .root[data-bg] {
  column-gap: 0px;
  row-gap: 2px;
  grid-auto-flow: row;
  grid-template-columns: initial;
  grid-template-rows: var(--header-height) repeat(4, auto) var(--header-height);
}
</style>
