import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiModal");

import overlayProps from "../UiOverlay/props";

export default function () {
  return {
    ...overlayProps(),

    modelValue: prop(Boolean, setProp(props.modelValue, "boolean")),
    tag: prop(String, setProp(props.tag, "string") || "div"),
    backdrop: prop(
      [Object, Boolean, String, Number],
      setProp(props.backdrop, ["object", "string", "boolean", "number"])
    ),
    alwaysRender: prop(Boolean, setProp(props.alwaysRender, "boolean")),
    zIndex: prop([String, Number], setProp(props.zIndex, ["string", "number"])),
    transition: prop(
      [Boolean, Object],
      setProp(props.transition, ["boolean", "object"])
    ),
    wrapContent: prop(Boolean, setProp(props.wrapContent, "boolean")),
    contentData: prop(Object, setProp(props.contentData, "object")),
    rootData: prop(Object, setProp(props.rootData, "object")),
    backdropData: prop(Object, setProp(props.rootData, "object"))
  };
}
