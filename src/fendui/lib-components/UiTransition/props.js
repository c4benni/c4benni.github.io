import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiTransition");

export default function () {
  return {
    /**
     * string ? look up name and serve as fn or obj.
     * object ? return obj.
     * array ? array[1] overrides array[0] where [0|1] can only be _a matching object path which will be compiled to either a fn or obj._ or _an object_.
     * **/
    config: prop(
      [String, Object, Array, Boolean],
      setProp(props.config, ["string", "object", "array", "boolean"]) || "fade"
    ),
    group: prop(Boolean, setProp(props.group, "boolean")),
    optimise: prop(Boolean, setProp(props.optimise, "boolean")),
    previousTransform: prop(String, setProp(props.previousTransform, "string"))
  };
}
