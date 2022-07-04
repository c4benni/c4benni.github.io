import { reactive } from "@vue/reactivity"

export default reactive({
  mobileMenu: false,
  showSuccess: false,
  appMounted: false,
  activeHeaderIndex: null,
  intersections: {
    0: false,
    1: false,
    2: false,
  },
  socials: [
    {
      title: "my github page",
      href: "https://github.com/c4benni",
      icon: "github",
    },
    {
      title: "my twitter page",
      href: "https://twitter.com/c4benn",
      icon: "twitter",
    },
  ],
});