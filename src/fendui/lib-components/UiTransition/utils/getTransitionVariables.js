export default function (data, props, ext) {
  const extracted = ext[data.transitionPhase] || { from: {}, to: {} };

  const generic = {
    "--ui-will-change": extracted.willChange,
    "--ui-prev-transform": props.previousTransform || undefined,
    "--origin": extracted.origin
  };

  const extFrom = extracted.from;

  const extTo = extracted.to;

  const from = {
    "--ui-transform-from": extFrom.transform,
    "--ui-fade-from": extFrom.opacity
  };

  const to = {
    "--ui-transform-to": extTo.transform,
    "--ui-fade-to": extTo.opacity
  };

  const phase = {
    appear: {
      "--ui-enter-delay": extracted.delay,
      "--ui-enter-duration": extracted.duration,
      "--ui-enter-ease": extracted.ease
    },

    enter: {
      "--ui-enter-delay": extracted.delay,
      "--ui-enter-duration": extracted.duration,
      "--ui-enter-ease": extracted.ease
    },

    leave: {
      "--ui-leave-delay": extracted.delay,
      "--ui-leave-duration": extracted.duration || "1000ms",
      "--ui-leave-ease": extracted.ease
    }
  };

  const value = {
    ...generic,
    ...from,
    ...to,
    ...phase[data.transitionPhase]
  };

  return value;
}
