import { setProp, prop, getConfig } from "/src/fendui/framework/props/utils";

const props = getConfig("UiPosition");

export default function () {
  return {
    modelValue: prop(Boolean, setProp(props.modelValue, "boolean")),
    width: prop([String, Number], setProp(props.width, ["string", "number"])),
    height: prop([String, Number], setProp(props.height, ["string", "number"])),
    align: prop(String, setProp(props.align, "string")),
    justify: prop(String, setProp(props.justify, "string")),
    inset: prop([Boolean, Object], setProp(props.inset, ["boolean", "object"])),
    mainAxis: prop(String, setProp(props.mainAxis, "string")),
    root: prop(String, setProp(props.root, "string")),
    activator: prop(String, setProp(props.activator, "string")),
    offset: prop(
      [Object, Number, String],
      setProp(props.offset, ["number", "string", "object"])
    ),
    autoAlign: prop(Boolean, setProp(props.autoAlign, "boolean")),
    flip: prop(Boolean, setProp(props.flip, "boolean")),
    contextMenu: prop(Boolean, setProp(props.contextMenu, "boolean")),
    containerTransition: prop(
      Boolean,
      setProp(props.containerTransition, "boolean")
    ),
    transition: prop(
      [Boolean, Object],
      setProp(props.transition, ["boolean", "object"])
    )
  };
}
