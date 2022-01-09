import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiCollapsible");

export default function () {
  return {
    tag: prop(String, setProp(props.tag, "string") || "div"),
    maxHeight: prop(
      [String, Number],
      setProp(props.maxHeight, ["string", "number"])
    ),
    useStyle: prop(Boolean, setProp(props.useStyle, "boolean")),
    active: prop(Boolean, setProp(props.active, "boolean")),
    activeClass: prop(
      [String, Object, Array],
      setProp(props.headerActiveClass, ["string", "object", "array"])
    ),
    transition: prop(
      [String, Object],
      setProp(props.headerActiveClass, ["string", "object"]) || ""
    ),

    modelValue: prop(
      [Boolean, String, Number],
      setProp(props.modelValue, ["boolean", "string", "number"])
    ),
    disabled: prop(Boolean, setProp(props.disabled, "boolean")),
    readonly: prop(Boolean, setProp(props.readonly, "boolean"))
  };
}
