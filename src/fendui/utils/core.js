import eventKey from "./eventKey";

export function getType(x) {
  if (Array.isArray(x)) {
    return "array";
  }

  return typeof x;
}

export function getFendUi(app) {
  return app.appContext.app.config.globalProperties.$fendui;
}

export const mediaListener = ({ media, callback }) => {
  try {
    media.addEventListener("change", callback);
  } catch (e) {
    if (/undefined is not a function/i.test(e.message)) {
      media?.addListener?.(callback);
    }
  }
};

export const nextAnimFrame = (callback) => {
  return new Promise((r) => {
    requestAnimationFrame((t) => {
      r();
      callback?.();
    });
  });
};

export const distinctArray = (val, arr, reverse) =>
  reverse
    ? [...new Set([...[val].flat(2), ...arr])]
    : [...new Set([...arr, ...[val].flat(2)])];

export function isIOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod"
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export function convertSeconds(val, fallback) {
  if (isNaN(parseFloat(val)) || val === Infinity) {
    return fallback || 0;
  }
  if (typeof val === "number") {
    return val >= 0 ? val : 0;
  }
  if (typeof val === "string") {
    const seconds = /\d\s*s\s*$/.test(val);
    if (seconds) {
      const parsed = parseFloat(val) * 1000;
      return parsed >= 0 ? parsed : 0;
    }
    const parsed = parseFloat(val);
    return parsed >= 0 ? parsed : 0;
  }
}

export function kebabCase(val) {

  if (typeof val === "string") {

    return kebabCase[val] ||( kebabCase[val] = val
      .replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)
      .replace(/-+/g, "-")
      .replace(/^-*/, ""));
  }
  return val;
}

export const promiser = (val = true) => {
  return new Promise((r) => r(val));
};

export const isHTML = (x) => x instanceof HTMLElement;

export function hackTabKey(e, cb = () => {}, evtKey) {
  const key = evtKey || eventKey(e);

  if (key == "tab") {
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();

      cb(e, key);
    }
  }

  return key;
}

export function vibrate(d = 1) {
  typeof navigator.mozVibrate == "function"
    ? navigator.mozVibrate(d)
    : navigator?.vibrate?.(d);
}
