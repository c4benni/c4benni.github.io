import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiContainer");

export default function () {
  return {
    modelValue: prop(Boolean, setProp(props.modelValue, "boolean")),
    root: prop([String, Object], setProp(props.root, ["string", "object"]))
  };
}
