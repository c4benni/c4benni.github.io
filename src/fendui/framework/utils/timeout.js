import { convertSeconds } from "/src/fendui/utils/core";

export function timeout({
  callback = () => {},
  onCancel = () => {},
  delay = 0,
  cancel = () => false,
  timeStamp,
  data = () => ({}),
  name
}) {
  if (isNaN(delay)) {
    return callback($data);
  }

  const worker = this.worker;

  const $data = data();

  const ts = timeStamp || Date.now();

  const evtCallback = (e) => {
    if (e.data.action == "timeout") {
      if (e.data.timeStamp == ts) {
        if (!cancel($data) && !e.data.cancelled) {
          callback($data);
        } else {
          onCancel($data);
        }

        worker.removeEventListener("message", evtCallback);
      }
    }
  };

  worker.addEventListener("message", evtCallback);

  worker.postMessage({
    action: "timeout",
    timeStamp: ts,
    data: $data,
    delay: convertSeconds(delay),
    name
  });
}
