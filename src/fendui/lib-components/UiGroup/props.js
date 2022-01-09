import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiGroup");

export default function () {
  return {
    modelValue: prop(Array, setProp(props.modelValue, "array")),
    mandatory: prop(Boolean, setProp(props.mandatory, "boolean")),
    multiple: prop(Boolean, setProp(props.multiple, "boolean")),
    disabled: prop(Boolean, setProp(props.disabled, "boolean")),
    allowRepeated: prop(Boolean, setProp(props.allowRepeated, "boolean")),
    reversed: prop(Boolean, setProp(props.reversed, "boolean")),
    initial: prop(Array, setProp(props.initial, "array"))
  };
}
