import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiIntersection");

export default function () {
  return {
    once: prop(Boolean, setProp(props.once, "boolean")),
    config: prop(Object, setProp(props.config, "object") || {}),
    onNextTick: prop(Boolean, setProp(props.config, "boolean")),
    disabled: prop(Boolean, setProp(props.disabled, "boolean"))
  };
}
