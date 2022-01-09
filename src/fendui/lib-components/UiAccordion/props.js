import toggleProps from "../UiToggle/props";
import collapsibleProps from "../UiCollapsible/props";

import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiAccordion");

export default function () {
  return {
    ...toggleProps(),

    ...collapsibleProps(),

    hideArrow: prop(Boolean, setProp(props.hideArrow, "boolean")),
    headerAttrs: prop(Object, setProp(props.headerClass, "object")),
    title: prop(String, setProp(props.title, "string") || "Detail"),
    headerActiveClass: prop(
      [String, Object, Array],
      setProp(props.headerActiveClass, ["string", "object", "array"])
    ),

    contentAttrs: prop(
      Object,
      setProp(props.headerActiveClass, "object") || undefined
    )
  };
}
