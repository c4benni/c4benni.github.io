import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiImg");

export default function () {
  return {
    tag: prop(String, setProp(props.tag, "string") || "div"),
    height: prop([String, Number], setProp(props.height, ["string", "number"])),
    width: prop([String, Number], setProp(props.width, ["string", "number"])),
    src: prop(String, setProp(props.src, "string") || ""),
    alt: prop(String, setProp(props.alt, "string") || ""),
    notIntersectingText: prop(
      String,
      setProp(props.notIntersectingText, "string")
    ),
    loading: prop(String, setProp(props.loading, "string") || "lazy"),
    backgroundImage: prop(Boolean, setProp(props.backgroundImage, "boolean"))
  };
}
