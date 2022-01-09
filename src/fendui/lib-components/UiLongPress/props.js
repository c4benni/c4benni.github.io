import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiLongPress");

export default function () {
  return {
    activeClass: prop(Boolean, setProp(props.activeClass, "boolean")),
    delay: prop(
      [String, Number, Object],
      setProp(props.delay, ["number", "string", "object"]) || 0
    ),
    allowContenxtMenu: prop(
      Boolean,
      setProp(props.allowContenxtMenu, "boolean")
    )
  };
}
