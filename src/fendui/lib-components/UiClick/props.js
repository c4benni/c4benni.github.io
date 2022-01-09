import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiClick");

export default function () {
  return {
    range: prop(
      [Number, String],
      setProp(props.range, ["number", "string"]) || 0
    ),
    addWillChangeClass: prop(
      Boolean,
      setProp(props.addWillChangeClass, "boolean")
    ),
    self: prop(Boolean, setProp(props.self, "boolean")),
    activeClass: prop(String, setProp(props.activeClass, "string"))
  };
}
