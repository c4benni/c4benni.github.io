export function cancelSleep(name) {
  if (!this.worker || !name) {
    return new Promise((r) => r(false));
  }

  return new Promise((r) => {
    const worker = this.worker;

    const ts = Date.now();

    const evtCallback = (e) => {
      if (e.data.action == "clearTimeout") {
        if (e.data.timeStamp == ts) {
          worker.removeEventListener("message", evtCallback);
          r(e.data.value);
        }
      }
    };

    worker.addEventListener("message", evtCallback);

    worker.postMessage({
      action: "clearTimeout",
      name
    });
  });
}
