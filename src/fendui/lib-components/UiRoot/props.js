import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiRoot");

export default function () {
  return {
    breakpointClasses: prop(
      Boolean,
      setProp(props.breakpointClasses, "boolean") || true
    ),
    utilityClasses: prop(
      Boolean,
      setProp(props.utilityClasses, "boolean") || true
    ),
    tag: prop(String, setProp(props.tag, "string") || "div")
  };
}
