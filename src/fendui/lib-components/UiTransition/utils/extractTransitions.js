import config from "/src/fendui/config";
import { getType } from "/src/fendui/utils/core";

export default function (props) {
  const extract = () => {
    if (getType(props.config) == "object") {
      return props.config;
    }

    const extractString = (s) => {
      if (typeof s != "string") {
        if (typeof s == "object") {
          return s;
        } else return {};
      }

      const str = s.trim();

      const transitions = config.transitions || {};

      const argsRegExp = /\(.+\)$/g;

      const data = {
        transitionPath: str.replace(argsRegExp, ""),
        isFn: argsRegExp.test(str),
        args: null,
        get path() {
          const path = this.transitionPath;
          return /\(|\)/g.test(path) ? null : path;
        }
      };

      if (!data.path || !transitions?.[data.path]) {
        return {};
      }

      if (!data.isFn) {
        const valueType = typeof transitions?.[data.path];

        return valueType == "object"
          ? transitions[data.path]
          : valueType == "function"
          ? transitions[data.path]()
          : {};
      } else if (typeof transitions[data.path] == "function") {
        data.args = ((str.match(argsRegExp) || [])[0] || "")
          .trim()
          .replace(/^\(/, "[")
          .replace(/\)$/, "]");

        const dynFn = new Function(
          `try{return [${data.args}].flat()}catch(e){if(e){return []}}`
        );

        try {
          data.args = dynFn();
        } catch (e) {
          if (e) {
            data.args = [];
          }
        }

        const transitionValue = transitions[data.path](...data.args) || {};

        return transitionValue;
      }

      return {};
    };

    if (typeof props.config == "string") {
      return extractString(props.config);
    }

    if (getType(props.config) == "array") {
      let output = {};

      for (let index of props.config.flat()) {
        output = { ...output, ...extractString(index) };
      }

      return output;
    }

    return {};
  };

  const value = { ...extract() };

  const format = () => {
    const output = {};

    const requiredPaths = [
      "from",
      "to",
      "duration",
      "ease",
      "origin",
      "willChange"
    ];

    ["enter", "leave"].forEach((dir) => {
      output[dir] = {};

      requiredPaths.forEach((path) => {
        const getPath = () => {
          if (dir == "leave" && /from|to/.test(path)) {
            if (path == "from") {
              return value.to;
            }
            return value.from;
          }

          if (props.optimise && path == "willChange") {
            return "transform, opacity";
          }
          return value[path];
        };

        output[dir][path] = value?.[dir]?.[path] || getPath();
      });
    });

    return output;
  };

  return format();
}
