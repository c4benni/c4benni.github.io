// Import vue components
import * as components from "./lib-components/index";
import FendUi from "./framework/main";
import "./CSS/utils.css";

// install function executed by Vue.use()
const install = function installFendui(app, config = {}) {
  FendUi.init(config);

  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });

  app.provide("$fendui", FendUi);

  app.config.globalProperties.$fendui = FendUi;

  app.provide("$theme", FendUi.theme);

  app.config.globalProperties.$theme = FendUi.theme;

  app.provide("$breakpoints", FendUi.breakpoints);

  app.config.globalProperties.$breakpoints = FendUi.breakpoints;

};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "./lib-components/index";
