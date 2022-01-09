export const GetBackdrop = (backdrop) => {
  const fallback = {
    background: "#000",
    opacity: ".5",
    duration: "300ms"
  };

  const isString = (x) => typeof x == "string";

  if (typeof backdrop == "object") {
    return {
      background: isString(backdrop.background)
        ? backdrop.background
        : fallback.background,
      opacity: isString(backdrop.opacity) ? backdrop.opacity : fallback.opacity,
      duration: isString(backdrop.duration)
        ? backdrop.duration
        : fallback.duration
    };
  }
  if (/string|number/.test(typeof backdrop)) {
    const parsed = parseFloat(backdrop);

    const cssDuration = /\d+ms$|\d+s$/i.test(backdrop);

    const opacity =
      (isFinite(parsed) && !cssDuration
        ? Math.min(parsed, 1)
        : fallback.opacity) + "";

    const background =
      isNaN(parsed) && !cssDuration ? backdrop : fallback.background;

    const duration =
      isNaN(parsed) || cssDuration ? backdrop : fallback.duration;

    return {
      duration,
      opacity,
      background
    };
  }

  if (backdrop === false) {
    return false;
  } else return fallback;
};
