import { isIOS, mediaListener } from "../../utils/core";

export default function cssUtils() {
  const getOutput = () => ({
    supportsBackdrop: isIOS() || CSS.supports("backdrop-filter", "blur(0px)"),
    isTouchDevice:
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0,
    isStrictTouchDevice: false
  });

  const output = getOutput();

  const getClassList = () => ({
    "touch-device": output.isTouchDevice,
    "strict-touch": output.isStrictTouchDevice,
    "can-hover": !output.isStrictTouchDevice,
    "backdrop-false": !output.supportsBackdrop,
    "backdrop-true": output.supportsBackdrop
  });

  const strictTouch = (value) => (output.isStrictTouchDevice = value);

  const media = window.matchMedia("(hover: none) and (pointer: coarse)");

  if (!cssUtils.mediaSet) {
    mediaListener({
      media,
      callback: (e) => {
        strictTouch(e.matches);
        cssUtils.onChange({
          ...output,
          classList: getClassList()
        });
      }
    });

    cssUtils.mediaSet = true;
  }

  strictTouch(media.matches);

  return {
    ...output,
    classList: getClassList()
  };
}
