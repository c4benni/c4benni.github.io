import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiLoadingBar");

export default function () {
  return {
    initial: prop(
      [Number, String],
      setProp(props.initial, ["number", "string"]) || 0
    ),
    transformOffset: prop(
      [Number, String],
      setProp(props.transformOffset, ["number", "string"]) || 3
    ),
    timeOffset: prop(
      [Number, String],
      setProp(props.timeOffset, ["number", "string"]) || 50
    ),
    state: prop(String, setProp(props.state, "string") || "stopped"),
    stoppedDuration: prop(
      [String, Number],
      setProp(props.stoppedDuration, ["string", "number"]) || "300"
    ),
    tag: prop(String, setProp(props.tag, "string") || "div"),
    rootBackground: prop(
      String,
      setProp(props.rootBackground, "string") || "div"
    ),
    background: prop(String, setProp(props.background, "string") || "div"),
    useStyle: prop(Boolean, setProp(props.useStyle, "boolean")),
    showBar: prop(Boolean, setProp(props.showBar, "boolean")),
    showShimmer: prop(
      [Boolean, Function],
      setProp(props.showShimmer, ["boolean", "function"])
    ),
    useAnimationFrame: prop(
      Boolean,
      setProp(props.useAnimationFrame, "boolean")
    )
  };
}
