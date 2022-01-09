import { reactive, computed } from "@vue/reactivity";
// import { mediaListener } from "../utils/core";
import breakpoints from "./breakpoints";
// import theme from "./theme";
import { cancelSleep } from "./utils/cancelSleep";
import cssUtils from "./utils/cssUtils";
import pageVisibility from "./utils/pageVisibility";
import { sleep } from "./utils/sleep";
import { timeout } from "./utils/timeout";

import workerString from "./worker";

const data = reactive({
  rootKey: 0,
  pageVisible: false
});

pageVisibility(data.pageVisible, cssUtils);

const cssUtillities = reactive({
  allUtils: {}
});

const overlays = reactive({
  active: {
    /**
     * uid:{
     *   ...methods
     * }
     **/
  },
  remove({ uid, htmlActiveClass }) {
    delete this.active[uid];

    if (htmlActiveClass) {
      const existingHTMLClass = Object.values(this.active).find(
        (x) => x.htmlActiveClass == htmlActiveClass
      );

      !existingHTMLClass &&
        document.documentElement.classList.remove(
          ...htmlActiveClass.split(" ")
        );
    }
  },
  set add(arg = {}) {
    if (typeof arg.value != "undefined") {
      this.active[arg.uid] = {
        ...arg.value,
        zIndex:
          typeof arg.value.zIndex != "undefined"
            ? arg.value.zIndex
            : this.length + parseFloat(arg.value.minZIndex || 0),
        timeStamp: Date.now(),
        htmlActiveClass: arg.htmlActiveClass
      };

      if (arg.htmlActiveClass) {
        document.documentElement.classList.add(
          ...arg.htmlActiveClass.split(" ")
        );
      }
    } else {
      console.error(
        `UiOverlay name prop must unique. ${arg.uid} already exists`
      );

      this.close(arg.uid);
      this.set = arg;
    }
  },
  update(arg = {}) {
    if (this.active[(arg || {})?.uid]) {
      this.active[(arg || {})?.uid] = {
        ...this.active[(arg || {})?.uid],
        ...arg.value
      };

      if (typeof (arg?.value || {})?.htmlActiveClass == "string") {
        this.active[(arg || {})?.uid].htmlActiveClass =
          arg.value.htmlActiveClass;
      }
    }
  },
  close(uid) {
    if (typeof this.active[uid]?.close == "function") {
      this.active[uid].close();
      this.remove(uid);
    }
  },
  closeAll() {
    for (let key in this.active) {
      this.close(key);
    }
  },
  get length() {
    return Object.keys(this.active).length;
  },

  get order() {
    return Object.values(this.active).sort((a, b) => {
      const $a = a.timeStamp;
      const $b = b.timeStamp;

      return $a > $b ? -1 : $a < $b ? 1 : 0;
    });
  },

  get first() {
    return Object.values(this.active)[0];
  },

  get last() {
    return Object.values(this.active).slice(-1);
  }
});

export default reactive({
  worker: null,

  sleep: null,

  options: {
    config: null
  },

  get overlays() {
    return overlays;
  },

  cancelSleep: null,

  timeout: null,

  theme: null,

  breakpoints: computed(() => breakpoints).value,

  get rootKey() {
    return `${data.rootKey}`;
  },

  get pageVisibile() {
    return data.pageVisible;
  },

  updateRootKey() {
    data.rootKey += 0.01;
  },

  get cssUtils() {
    return computed(() => cssUtillities.allUtils);
  },

  get cssUtilsClassList() {
    return computed(() => this.cssUtils.classList);
  },

  async init(config) {
    this.config = config || null;
    this.breakpoints.init();

//     this.theme = theme;
// document.documentElement.classList.add(`${this.theme.is}-theme`)
  },

  beforeMount() {
    this.breakpoints.beforeMount();
//  const setTheme = (val) => {
//       this.theme.is = val
//     }

    // const currentTheme = window.matchMedia('(prefers-color-scheme: light)')

    // if (currentTheme?.matches) {
    //   setTheme('light')
    // } else setTheme('dark')

    // mediaListener({
    //   media: currentTheme,
    //   callback: (e) => {
    //     if (e.matches) {
    //       setTheme('light')
    //     } else setTheme('dark')
    //   },
    // })

  //  document.getElementById('initial-theme-styles')?.remove()

    cssUtils.onChange = (e) => {
      cssUtillities.allUtils = e;
    };

    cssUtillities.allUtils = cssUtils();

    const workerBlob = new Blob([workerString]);

    const workerUrl = URL.createObjectURL(workerBlob);

    this.worker = new Worker(workerUrl, { name: "FendUiWorker" });

    this.timeout = timeout.bind(this);

    this.sleep = sleep.bind(this);

    this.cancelSleep = cancelSleep.bind(this);
  }
});
