import { isHTML } from "/src/fendui/utils/core";
import { promiser } from "/src/fendui/utils/core";

export function setScaleAndOrigin({ data, props, event = {} }) {
  const getElement = (selector) => {
    if (typeof selector == "object") {
      return selector;
    }
    return document.querySelector(selector);
  };

  const getBound = (el) => {
    // const output = {
    //   height: el.clientHeight,
    //   width: el.clientWidth,
    //   top: el.offsetTop,
    //   left: el.offsetLeft
    // };

    // output.y = output.top;
    // output.x = output.left;

    // output.bottom = output.height + output.top;
    // output.right = output.width + output.left;

    return el.getBoundingClientRect();
  };

  const activator = props.activator
    ? getElement(props.activator)
    : event.currentTarget;

  const setActivatorBounds = () => {
    const { top, left, right, bottom, x, y, height, width } =
      activator?.getBoundingClientRect?.() || {};

    data.activatorBound = {
      top,
      left,
      right,
      bottom,
      x,
      y,
      height,
      width
    };
  };

  setActivatorBounds();

  const activatorBound = data.activatorBound;

  const root = props.root ? getElement(props.root) : document.documentElement;

  let rootBounds = {};

  const setRootBounds = () => {
    const htmlRoot = isHTML(root);

    let { top, left, height, width } = htmlRoot ? getBound(root) : root || {};

    if (htmlRoot) {
      height = root.clientHeight;
      width = root.clientWidth;
    }

    rootBounds = {
      top,
      left,
      width,
      height
    };
  };

  setRootBounds();

  const max = Math.max;

  data.config.top = `${max(rootBounds.top, 0)}px`;
  data.config.left = `${max(rootBounds.left, 0)}px`;

  const scaleX = activatorBound.width / rootBounds.width;
  const scaleY = activatorBound.height / rootBounds.height;

  const top = activatorBound.top - parseFloat(data.config.top);
  const left = activatorBound.left - parseFloat(data.config.left);

  data.config.transform = `scale3d(${scaleX}, ${scaleY}, 1) translate3d(${left}px, ${top}px, 0)`;

  data.config.origin = `${left}px ${top}px`;

  return promiser(true);
}
