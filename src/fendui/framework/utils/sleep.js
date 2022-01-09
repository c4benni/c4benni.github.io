// import { convertSeconds } from "/src/fendui/utils/core";

export function sleep(arg) {
  const getArgs =
    typeof arg == "object"
      ? {
          delay: arg.delay || 0,
          callback: arg.callback || (() => {}),
          data:
            (arg.data && typeof arg.data == "function" && arg.data) ||
            (() => ({})),
          cancel: arg.cancel || (() => false),
          name: arg.name,
          onCancel: arg.onCancel || (() => {})
        }
      : typeof arg == "number"
      ? {
          delay: arg
        }
      : {
          delay: 0
        };

  if (!this.worker || !getArgs.delay) {
    return new Promise((r) => r({}));
  }

  const D = getArgs.delay;
  // const data = getArgs.data();

  return new Promise((r) => {
    const extractArgs = { ...getArgs };
    delete extractArgs.callback;
    delete extractArgs.cancel;
    delete extractArgs.onCancel;
    extractArgs.data = extractArgs?.data?.();

    this.timeout({
      ...getArgs,

      callback: (data) => {
        r({ data, ...extractArgs });

        return getArgs.callback?.(data) || true;
      },

      onCancel: (data) => {
        r({ data, cancelled: true, ...extractArgs });
        arg.onCancel?.();
      },
      delay: D
    });
  });
}
