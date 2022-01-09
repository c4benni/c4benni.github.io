import { isHTML, promiser } from "/src/fendui/utils/core";

export function setPosition({ props, event = {}, data, offset, inset }) {
  const getValues = (input, types, allowed, fallback) => {
    if (
      [types].flat().includes(typeof input) &&
      (typeof allowed == "function"
        ? allowed(input)
        : [allowed].flat().includes(input))
    ) {
      return input;
    }
    return fallback;
  };

  const flexRegExp = /^start$|^center$|^end$/i;
  const xAxisRegExp = /^left$|^right$/i;
  const yAxisRegExp = /^top$|^bottom$/i;

  const align = getValues(
    props.align,
    "string",
    (x) => flexRegExp.test(x.trim()) || yAxisRegExp.test(x.trim()),
    "end"
  );
  const justify = getValues(props.justify, "string", (x) =>
    flexRegExp.test(x.trim(x.trim()) || xAxisRegExp.test(x.trim()), "end")
  );
  const width = getValues(props.width, ["string", "number"], () => true, "0");

  const parsedWidth = parseFloat(width);

  const height = getValues(props.height, ["string", "number"], () => true, "0");

  const parsedHeight = parseFloat(height);

  //  const offset = getValues(props.offset, 'object',);
  const autoAlign = getValues(props.autoAlign, "boolean", () => true);
  const flip = getValues(props.flip, "boolean", () => true);

  const isContextMenu = getValues(props.contextMenu, "boolean", () => true);

  const getBound = (el) => {
    const output = {
      height: el.clientHeight,
      width: el.clientWidth,
      top: el.offsetTop,
      left: el.offsetLeft
    };

    output.y = output.top;
    output.x = output.left;

    output.bottom = output.height + output.top;
    output.right = output.width + output.left;

    return output;
  };

  const getElement = (selector) => {
    return document.querySelector(selector);
  };

  const activator = props.activator
    ? getElement(props.activator)
    : event.currentTarget;

  const root = props.root ? getElement(props.root) : document.documentElement;

  let rootBounds = {};

  const setRootBounds = () => {
    const { top, left, right, bottom, x, y, height, width } = isHTML(root)
      ? getBound(root)
      : {};

    rootBounds = {
      top,
      left,
      right,
      bottom,
      width,
      height,
      x,
      y
    };
  };

  setRootBounds();

  const setActivatorBounds = () => {
    const { top, left, right, bottom, x, y, height, width } =
      activator?.getBoundingClientRect?.() || {};

    data.activatorInfo.bound = {
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

  const activatorBound = data.activatorInfo.bound;

  if (props.containerTransition) {
    data.contentScale.x = activatorBound.width / parsedWidth;
    data.contentScale.y = activatorBound.height / parsedHeight;
  }

  const positions = {
    left: undefined,
    top: undefined
  };

  const setPositions = () => {
    if (isContextMenu && event) {
      const client = { x: null, y: null };

      if (/touch/.test(event.type) && event?.touches?.[0]) {
        client.x = event.touches[0]?.clientX || null;
        client.y = event.touches[0]?.clientY || null;
      } else {
        client.x = event?.clientX || null;
        client.y = event?.clientY || null;
      }

      positions.left = client.x;
      positions.top = client.y;

      data.contentOrigin.x = positions.left / activatorBound.width + "px";
      data.contentOrigin.y = positions.top / activatorBound.height + "px";
    } else {
      const setTop = () => {
        if (/start|top/i.test(align)) {
          if (inset.y) {
            positions.top = activatorBound.top;
          } else {
            positions.top = activatorBound.top - parsedHeight;
          }
        }
        if (/end|bottom/i.test(align)) {
          if (inset.y) {
            positions.top = activatorBound.bottom - parsedHeight;
          } else {
            positions.top = activatorBound.bottom;
          }
        }
        if (/center/i.test(align)) {
          positions.top =
            activatorBound.top + activatorBound.height / 2 - parsedHeight / 2;
        }
      };

      setTop();

      const setLeft = () => {
        if (/start|left/i.test(justify)) {
          if (inset.x) {
            positions.left = activatorBound.left;
          } else {
            positions.left = activatorBound.left - parsedWidth;
          }
        }
        if (/end|right/i.test(justify)) {
          if (inset.x) {
            positions.left = activatorBound.right - parsedWidth;
          } else {
            positions.left = activatorBound.right;
          }
        }
        if (/center/i.test(justify)) {
          positions.left =
            activatorBound.left + activatorBound.width / 2 - parsedWidth / 2;
        }
      };

      setLeft();
    }

    const reposition = () => {
      const totalBottom = () => positions.top + parsedHeight + offset.bottom;
      const totalTop = () => positions.top - offset.top;
      const totalLeft = () => positions.left - offset.left;
      const totalRight = () => positions.left + parsedWidth + offset.right;

      const flipped = {};

      if (flip) {
        const repositionY = () => {
          if (totalBottom() > rootBounds.height) {
            //  if the gap to the top is less than the gap exceeding the bottom
            if (
              totalTop() - rootBounds.top >=
              rootBounds.height - totalBottom()
            ) {
              positions.top =
                activatorBound[inset.y ? "bottom" : "top"] - parsedHeight;

              flipped.bottom = true;
            }
          }

          if (totalTop() <= 0) {
            //  if the gap to the bottom is less than the gap exceeding the top
            if (
              totalBottom() - rootBounds.bottom <=
              rootBounds.height - totalTop()
            ) {
              positions.top = activatorBound[inset.y ? "top" : "bottom"];

              flipped.top = true;
            }
          }

          return;
        };

        repositionY();

        const repositionX = () => {
          if (totalRight() > rootBounds.width) {
            //  if the gap to the left is less than the gap exceeding the right
            if (
              totalLeft() - rootBounds.left >=
              rootBounds.width - totalRight()
            ) {
              positions.left =
                activatorBound[inset.x ? "right" : "left"] - parsedWidth;

              flipped.left = true;
            }
          }

          if (totalLeft() <= 0) {
            //  if the gap to the right is less than the gap exceeding the left
            if (
              totalRight() - rootBounds.right <=
              rootBounds.width - totalLeft()
            ) {
              positions.left = activatorBound[inset.x ? "left" : "right"];

              flipped.right = true;
            }
          }

          return;
        };

        repositionX();
      }

      // if after everything, the bottom is chopped off, adjust it

      if (totalBottom() > rootBounds.height) {
        positions.top = rootBounds.height - offset.bottom - parsedHeight;
      }

      // move element above root bounds on x axis
      if (positions.left + parsedWidth + offset.right > rootBounds.width) {
        const excess =
          positions.left + parsedWidth + offset.right - rootBounds.width;

        positions.left -= excess;
      }

      // if the element is chopped off on the left, resize to 0
      if (positions.left < 0) {
        positions.left = 0;
      }

      // if after everything, the root height, bottom has exceeded, addoffset to rootBound.bottom

      if (
        positions.top + activatorBound.height + offset.bottom >
        rootBounds.bottom
      ) {
        positions.top =
          rootBounds.height - offset.bottom - activatorBound.height;
      }

      // if after everything, the top is still chopped off, bring it down

      if (positions.top - offset.top < 0) {
        positions.top -= positions.top - rootBounds.top - offset.top;
      }

      const setOrigin = () => {
        if (positions.top + parsedHeight - activatorBound.bottom == 0) {
          data.contentOrigin.y = "bottom";
        }

        if (positions.top - activatorBound.top == 0) {
          data.contentOrigin.y = "top";
        }

        // when positioned under
        if (positions.top == activatorBound.bottom) {
          data.contentOrigin.y = "top";

          // diagonal bottom left
          if (positions.left + parsedWidth == activatorBound.left) {
            data.contentOrigin.x = "right";
          }

          // diagonal bottom right
          if (positions.left == activatorBound.right) {
            data.contentOrigin.x = "left";
          }
        }

        // when positioned above
        if (positions.top + parsedHeight == activatorBound.top) {
          data.contentOrigin.y = "bottom";

          // diagonal top right
          if (positions.left + parsedWidth == activatorBound.left) {
            data.contentOrigin.x = "right";
          }

          // diagonal top right
          if (positions.left == activatorBound.right) {
            data.contentOrigin.x = "left";
          }
        }

        if (positions.left + parsedWidth - activatorBound.right == 0) {
          data.contentOrigin.x = "right";
        }

        if (positions.left + parsedWidth == activatorBound.left) {
          data.contentOrigin.x = "right";
        }

        if (positions.left - activatorBound.left == 0) {
          data.contentOrigin.x = "left";
        }

        if (positions.left == activatorBound.right) {
          data.contentOrigin.x = "left";
        }
      };

      !props.contextMenu && setOrigin();
    };

    reposition();

    data.elPositions = positions;
  };

  setPositions();

  return promiser(true);
}
