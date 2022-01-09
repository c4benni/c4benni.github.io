import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiToggle");

export default function () {
  return {
    modelValue: prop(
      [Boolean, String, Number],
      setProp(props.modelValue, ["boolean", "string", "number"])
    ),
    disabled: prop(Boolean, setProp(props.disabled, "boolean"))
  };
}
