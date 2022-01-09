import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiSheet");

export default function () {
  return {
    modelValue: prop(Boolean, setProp(props.modelValue, "boolean")),
    backdrop: prop(
      [Object, Boolean, String, Number],
      setProp(props.backdrop, ["object", "string", "boolean", "number"])
    ),
    isSheet: prop(Boolean, setProp(props.isSheet, "boolean")),

    staticBackdrop: prop(Boolean, setProp(props.staticBackdrop, "boolean")),
    fullscreen: prop(Boolean, setProp(props.staticBackdrop, "boolean")),
    useStyle: prop(Boolean, setProp(props.useStyle, "boolean"))
  };
}
