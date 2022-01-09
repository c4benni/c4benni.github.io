import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiFocus");

export default function () {
  return {
    activeClass: prop(Boolean, setProp(props.activeClass, "boolean")),
    delay: prop(
      [String, Number, Object],
      setProp(props.delay, ["number", "string", "object"]) || 0
    )
  };
}
