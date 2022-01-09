/**
 * initialized in the root component (FendUi)
 * beforeCreate is called to set up breakpointQueries,
 * then beforeMount is called to init mediaListeners;
 *
 * **/

import { reactive } from "@vue/reactivity";
import { mediaListener, nextAnimFrame } from "/src/fendui/utils/core";
import config from "../config";

const breakpointConfig = config.breakpoints;

const data = reactive({
  breakpointInput: {
    is: "",
    greater: "",
    lesser: "",
    orientation: ""
  },
  breakpointQueries: [],
  beforeMountCalled: false,
  initialized: false
});

// const breakpointOutput = computed(() => {
//   const input = data.breakpointInput;

//   return {
//     orientationAlias: input.orientation.slice(0, 2),
//     ...input,
//   };
// }).value;

const methods = {
  init() {
    if (data.initialized) {
      return;
    }

    data.initialized = true;

    const breakpoints = ["<orientation>(orientation: landscape)"];

    for (let entry of Object.entries(breakpointConfig.values)) {
      const key = entry[0];
      const value = entry[1];

      //  '<xxs>(min-width: 0px) and (max-width: 349px)',
      breakpoints.push(
        `<${key.toLowerCase()}>(min-width: ${value[0]}px)${
          value[1] != Infinity ? ` and (max-width: ${value[1]}px)` : ""
        }`
      );
    }

    data.breakpointQueries.values = [...breakpoints];
  },

  getBreakpointMediaName(val) {
    const regExp = /^<.+>/g;
    return val.match?.(regExp)?.[0]?.replace?.(/<|>/g, "");
  },

  getBreakpointGreaterAndLesser(index) {
    const greater = data.breakpointQueries.values
      .filter((_, id) => id > 0 && id >= index)
      .map((x) => this.getBreakpointMediaName(x));

    const lesser = data.breakpointQueries.values
      .filter((_, id) => id > 0 && id <= index)
      .reverse()
      .map((x) => this.getBreakpointMediaName(x));

    return {
      greater: greater.length > 1 ? greater.join("-") : "",
      lesser: lesser.length > 1 ? lesser.join("-") : ""
    };
  },

  async updateBreakpointMediaListener(e) {
    await nextAnimFrame();
    const name = e.name;
    const index = e.index;
    const isOrientation = /orientation/.test(name);
    const matches = e.matches;
    const eventData = isOrientation
      ? matches
        ? "landscape"
        : "portrait"
      : name;

    const update = () => {
      if (isOrientation) {
        data.breakpointInput.orientation = eventData;
      } else {
        data.breakpointInput.is = eventData;

        const greater = e.greater
          ? e.greater
          : matches
          ? methods.getBreakpointGreaterAndLesser(index).greater
          : null;

        data.breakpointInput.greater = greater;

        const lesser = e.lesser
          ? e.lesser
          : matches
          ? methods.getBreakpointGreaterAndLesser(index).lesser
          : null;

        data.breakpointInput.lesser = lesser;
      }
    };

    if (isOrientation) {
      update();
    } else if (e.matches) {
      update();
    }
  },

  beforeMount() {
    if (data.beforeMountCalled) {
      return;
    }

    data.beforeMountCalled = true;

    if (!data.initialized) {
      methods.init();
    }

    data.breakpointQueries.values.forEach((x, i) => {
      const regExp = /^<.+>/g;
      const mediaQuery = window.matchMedia(x.replace(regExp, ""));
      const matches = mediaQuery.matches;
      const name = methods.getBreakpointMediaName(x);

      const greater = matches
        ? methods.getBreakpointGreaterAndLesser(i).greater
        : null;
      const lesser = matches
        ? methods.getBreakpointGreaterAndLesser(i).lesser
        : null;

      methods.updateBreakpointMediaListener({
        matches,
        name,
        greater,
        lesser
      });

      mediaListener({
        media: mediaQuery,
        event: "change",
        callback: (e) => {
          methods.updateBreakpointMediaListener({
            matches: e.matches,
            index: i,
            name
          });
        }
      });
    });
  }
};

export default reactive({
  get is() {
    return data.breakpointInput.is;
  },
  get lesser() {
    return data.breakpointInput.lesser;
  },
  get greater() {
    return data.breakpointInput.greater;
  },
  get orientation() {
    return data.breakpointInput.orientation;
  },
  get orientationAlias() {
    return this.orientation.slice(0, 2);
  },
  get classList() {
    if (!this.is) {
      return "";
    }

    const classList = [`br-${this.is}`, `or-${this.orientationAlias}`];

    if (/xxs|xs/.test(this.is)) {
      classList.push(...["xs-down"]);
    }

    if (/xs|sm|md|lg|xl/.test(this.is)) {
      classList.push("xs-up");
    }

    if (/sm|xs|xxs/.test(this.is)) {
      classList.push(...["sm-down", "mini-device"]);
    }

    if (/sm|md|lg|xl/.test(this.is)) {
      classList.push("sm-up");
    }

    if (/md|sm|xs|xxs/.test(this.is)) {
      classList.push("md-down");
    }

    if (this.is == "md") {
      classList.push("tablet");
    }

    if (/md|lg|xl/.test(this.is)) {
      classList.push(...["md-up"]);
    }

    if (/lg|md|sm|xs|xxs/.test(this.is)) {
      classList.push(...["lg-down"]);
    }

    if (this.is == "lg") {
      classList.push(...["laptop"]);
    }

    if (/lg|xl/.test(this.is)) {
      classList.push(...["lg-up"]);
    }

    if (this.is == "xl") {
      classList.push("is-4k");
    }

    return [...new Set(classList)].join(" ");
  },
  init: methods.init,
  beforeMount: methods.beforeMount
});
