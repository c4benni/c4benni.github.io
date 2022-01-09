import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiDelayedToggle");

export default function () {
  return {
    delay: prop(
      [String, Number, Object],
      setProp(props.delay, ["number", "string", "object"]) || 0
    )
  };
}
