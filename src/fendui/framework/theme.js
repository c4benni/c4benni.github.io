import config from "../config";


import { ref, reactive } from "@vue/reactivity";

const frameworkTheme = config.theme;

const validTheme = /^light$|^dark$/i;

const currentTheme = ref(frameworkTheme.initial);

const setCurrentTheme = (val) => {
  if (validTheme.test(val)) {
    const oldTheme = `${currentTheme.value}-theme`;

    currentTheme.value = val.toLowerCase();

    document.documentElement.classList.replace(oldTheme, `${val}-theme`);
  }
};

export default reactive({
  get is() {
    return currentTheme.value;
  },
  set is(val) {
    setCurrentTheme(val);
  },
  get dark() {
    return /dark/i.test(currentTheme.value);
  },
  set dark(val) {
    if (val && typeof val == "boolean") {
      setCurrentTheme("dark");
    } else setCurrentTheme("light");
  },
  get light() {
    return /light/i.test(currentTheme.value);
  },
  set light(val) {
    if (val && typeof val == "boolean") {
      setCurrentTheme("light");
    } else setCurrentTheme("dark");
  }
});
