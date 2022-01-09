import { getType } from "/src/fendui/utils/core";
import config from "/src/fendui/config";

export const prop = (type, initial, required) => {
  let getType = [type].flat();

  const useFn = !!getType
    .map((x) => x.name)
    .find((x) => /object|array|function/i.test(x));

  getType.length == 1 && (getType = getType[0]);

  return {
    type: getType,
    default: useFn ? () => initial : initial,
    required
  };
};

export const propsConfig = config?.props || {};

export function setProp(prop, types) {
  if ([types].flat(2).includes(getType(prop))) {
    return prop;
  }
}

export const getConfig = (path) => propsConfig?.[path] || {};

export const inheritProps = ({ parent, selfProps }) => {
  const output = {};

  for (let key in parent) {
    output[key] = selfProps[key];
  }

  return output;
};
