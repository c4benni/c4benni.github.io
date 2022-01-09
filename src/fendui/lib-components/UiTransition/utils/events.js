import { capitalize } from "@vue/shared";
import { convertSeconds } from "/src/fendui/utils/core";
import { kebabCase } from "/src/fendui/utils/core";

export default function (data, emit) {
  const setPhase = (phase) => {
    data.transitionPhase = phase;
  };

  const setState = (state, arg) => {
    setPhase(
      /cancelled/i.test(state)
        ? "cancel"
        : /appear|enter/i.test(state)
        ? "enter"
        : "leave"
    );

    data.transitionState = state;

    emit("state-change", state);

    const kebab = kebabCase(state);

    emit(`uit-${kebab}`, ...arg);

    emit(state, ...arg);

    emit(kebab, ...arg);
  };


  const getTransitionName = (state) =>
    `ui-transition-${
      /appear/i.test(state)
        ? "appear"
        : /enter/i.test(state)
        ? "enter"
        : "leave"
    }`;

  const resetElVariables = (el) => {
    const variables = { ...data.variables };
    for (let key in variables) {
      el.style.setProperty(key, variables[key]);
    }
  };

  const base = ({ before, main, cancel, after }) => {
    const output = {};

    output[`on${capitalize(before)}`] = async (el) => {
      setState(before, [el]);

      let extracted = data.extractTransitions();

      const extractedPhase = extracted[data.transitionPhase];

      extractedPhase.from = extractedPhase.from || {};

      extractedPhase.to = extractedPhase.to || {};

      extracted = 0;

      const convertedDuration = convertSeconds(extractedPhase.duration) || 1;
      data.setVariables({
        willChange: extractedPhase.willChange || "",
        origin: extractedPhase.origin || "",
        transform: {
          from: extractedPhase.from.transform || "scale(0.9999999)",
          to: extractedPhase.to.transform || ""
        },
        opacity: {
          from: extractedPhase.from.opacity + "",
          to: extractedPhase.to.opacity + ""
        },
        delay: extractedPhase.delay || "",
        duration: `${convertedDuration}ms`,
        ease: extractedPhase.ease || ""
      });

      resetElVariables(el);
    };

    output[`on${capitalize(main)}`] = async (el) => {
      setState(main, [el]);
    };

    output[`on${capitalize(cancel)}`] = (el) => {
      setState(cancel, [el]);

      data.resetVariables();

      resetElVariables(el);
    };

    output[`on${capitalize(after)}`] = async (el) => {
      setState(after, [el]);

      data.resetVariables();

      resetElVariables(el);
    };

    return output;
  };

  let events = {};

  const getStates = (state) => {
    const capsState = capitalize(state);
    return [
      `before${capsState}`,
      state,
      `${state}Cancelled`,
      `after${capsState}`
    ];
  };

  ["appear", "enter", "leave"].forEach((x) => {
    const states = getStates(x);

    events = {
      ...events,
      ...base({
        before: states[0],
        main: states[1],
        cancel: states[2],
        after: states[3]
      })
    };
  });

  return events;
}
