import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiOverlay");

export default function () {
  return {
    modelValue: prop(
      [Boolean, String, Number],
      setProp(props.modelValue, ["boolean", "string", "number"])
    ),
    disabled: prop(Boolean, setProp(props.disabled, "boolean")),
    to: prop(String, setProp(props.to, "string") || "body"),
    restoreScroll: prop(Boolean, setProp(props.restoreScroll, "boolean")),
    restoreFocus: prop(Boolean, setProp(props.restoreFocus, "boolean")),
    transition: prop(
      [Object, Boolean],
      setProp(props.transition, ["object", "boolean"])
    ),
    focusContent: prop(Boolean, setProp(props.focusContent, "boolean")),
    methods: prop(Object, setProp(props.methods, "object") || {}),
    name: prop(String, setProp(props.name, "string")),
    zIndex: prop([String, Number], setProp(props.zIndex, ["string", "number"])),
    minZIndex: prop(
      [String, Number],
      setProp(props.minZIndex, ["string", "number"])
    ),
    disableTabAction: prop(Boolean, setProp(props.disableTabAction, "boolean")),
    disableEscAction: prop(Boolean, setProp(props.disableEscAction, "boolean")),
    useStyle: prop(Boolean, setProp(props.useStyle, "boolean")),
    htmlActiveClass: prop(String, setProp(props.htmlActiveClass, "string")),
    accessible: prop(Boolean, setProp(props.useStyle, "boolean")),
    accessibleRole: prop(String, setProp(props.accessibleRole, "string")),
    alwaysRender: prop(Boolean, setProp(props.alwaysRender, "boolean"))

    // alwaysShow: prop(Boolean, setProp(props.alwaysShow, "boolean")),
    // tag: prop(String, setProp(props.tag, "string") || "div"),
    // backdropOpacity: prop(
    //   [String, Number],
    //   setProp(props.backdropOpacity, ["string", "number"]) || "0.3"
    // ),
    // backdropColor: prop(String, setProp(props.backdropColor, "string"), "#000"),
    // backdropOpacity: prop(
    //   [String, Number],
    //   setProp(props.backdropOpacity, ["string", "number"])
    // ),
    // isSheet: prop(Boolean, setProp(props.isSheet, "boolean")),
  };
}
